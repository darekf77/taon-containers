import Stripe from 'stripe';

export default {
	async fetch(request: Request, env: any): Promise<Response> {
		const url = new URL(request.url);

		if (url.pathname === '/') {
			return new Response('Hello world!');
		}

		// ---------- STRIPE WEBHOOK ----------
		if (url.pathname === '/stripe-webhook') {
			if (request.method !== 'POST') {
				return new Response('Method Not Allowed', { status: 405 });
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
					env.STRIPE_WEBHOOK_SECRET
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
					{ limit: 1 }
				);

				const productId = lineItems.data[0]?.price?.product as string;

				if (!productId) {
					return new Response('Missing productId', { status: 400 });
				}

				const purchaseKey = `purchase:${clientEmail}:${productId}`;
				const saleKey = `sale:${stripeSessionId}`;

				// prevent duplicate purchase
				const alreadyPurchased = await env.NICE_KV.get(purchaseKey);

				if (alreadyPurchased) {
					return new Response('Product already purchased');
				}

				const data = {
					productId,
					clientEmail,
					stripeSessionId,
					createdAt: new Date().toISOString(),
				};

				await env.NICE_KV.put(saleKey, JSON.stringify(data));
				await env.NICE_KV.put(purchaseKey, stripeSessionId);

				return new Response('OK');
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

			const purchase = await env.NICE_KV.get(key);

			return new Response(
				JSON.stringify({
					hasAccess: !!purchase,
				}),
				{
					headers: { 'Content-Type': 'application/json' },
				}
			);
		}

		return new Response('Not Found', { status: 404 });
	},
};
