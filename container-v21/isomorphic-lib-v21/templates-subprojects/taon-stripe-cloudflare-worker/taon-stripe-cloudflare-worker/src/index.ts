import Stripe from 'stripe';

const saveToDb = async (
  env: any,
  productId: string,
  clientEmail: string,
  stripeSessionId: string,
) => {
  clientEmail = (clientEmail || '').toLowerCase().trim();
  const purchaseKey = `purchase:${clientEmail}:${productId}`;
  const saleKey = `sale:${stripeSessionId}`;

  // prevent duplicate purchase

  const existingSale = await env.KV_DATABASE_ONLINE_NAME.get(saleKey);

  if (existingSale) {
    return new Response('Event already processed');
  }

  const data = {
    productId,
    clientEmail,
    stripeSessionId,
    createdAt: new Date().toISOString(),
  };

  await env.KV_DATABASE_ONLINE_NAME.put(saleKey, JSON.stringify(data));
  await env.KV_DATABASE_ONLINE_NAME.put(purchaseKey, stripeSessionId);

  return new Response('OK');
};

export default {
  async fetch(request: Request, env: any): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === '/') {
      return new Response('Hello world!');
    }

    /**
     * By default worker is developemnt mode (WORKER_STRIP_MODE === undefined)
     * In production mode WORKER_STRIP_MODE === 'production'.
     *
     * To chagne worker mode in taon cli: taon subproject mode # follow instructions
     * production means === NO TESTING FROM TAON CLI
     */
    const isProdMode = env.WORKER_STRIPE_MODE === 'production';

    // ---------- STRIPE WEBHOOK ----------
    if (url.pathname === '/stripe-webhook') {
      if (request.method !== 'POST') {
        return new Response('Method Not Allowed', { status: 405 });
      }

      if (!isProdMode) {
        let jsonBody: any;
        try {
          jsonBody = await request.json();
        } catch {}

        // for easy adding products in development mode without stripe cli
        const { productId, clientEmail, stripeSessionId } = jsonBody || {};
        if (productId && clientEmail && stripeSessionId) {
          return await saveToDb(env, productId, clientEmail, stripeSessionId);
        }
      }

      const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
        apiVersion: '2026-02-25.clover',
        httpClient: Stripe.createFetchHttpClient(),
      });

      const signature = request.headers.get('stripe-signature');
      const body = await request.text();

      let event: Stripe.Event;

      try {
        event = await stripe.webhooks.constructEventAsync(
          body,
          signature!,
          env.STRIPE_WEBHOOK_SECRET,
        );
      } catch (err) {
        return new Response(`Webhook Error: ${(err as Error).message}`, {
          status: 400,
        });
      }

      // ---------- HANDLE CHECKOUT ----------
      if (event.type === 'checkout.session.completed') {
        const session = event.data.object as Stripe.Checkout.Session;

        const stripeSessionId = session.id;
        const clientEmail = session.customer_details?.email;

        if (!clientEmail) {
          return new Response('Missing email', { status: 400 });
        }

        // fetch purchased product
        const lineItems = await stripe.checkout.sessions.listLineItems(
          stripeSessionId,
          { limit: 1 },
        );

        const productId = lineItems.data[0]?.price?.product as string;

        if (!productId) {
          return new Response('Missing productId', { status: 400 });
        }

        return await saveToDb(env, productId, clientEmail, stripeSessionId);
      }

      return new Response('Event ignored');
    }

    // ---------- CHECK ACCESS ----------
    if (url.pathname === '/check-access') {
      const clientEmail = url.searchParams.get('clientEmail');
      const productId = url.searchParams.get('productId');

      if (!clientEmail || !productId) {
        return new Response('Missing params', { status: 400 });
      }

      const key = `purchase:${clientEmail}:${productId}`;

      const purchase = await env.KV_DATABASE_ONLINE_NAME.get(key);

      return new Response(
        JSON.stringify({
          hasAccess: !!purchase,
        }),
        {
          headers: { 'Content-Type': 'application/json' },
        },
      );
    }

    return new Response('Not Found', { status: 404 });
  },
};
