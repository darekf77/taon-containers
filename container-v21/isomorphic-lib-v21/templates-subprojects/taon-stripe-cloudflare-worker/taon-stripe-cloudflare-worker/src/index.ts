export default {
	async fetch(request: Request, env: any) {

		const url = new URL(request.url);

		// ---------- STRIPE WEBHOOK ----------
		if (url.pathname === "/stripe-webhook") {

			if (request.method !== "POST") {
				return new Response("Method Not Allowed", { status: 405 });
			}

			let body: any;

			try {
				body = await request.json();
			} catch {
				return new Response("Invalid JSON", { status: 400 });
			}

			const { productId, clientEmail, stripeSessionId } = body;

			if (!productId || !clientEmail || !stripeSessionId) {
				return new Response("Missing fields", { status: 400 });
			}

			const purchaseKey = `purchase:${clientEmail}:${productId}`;

			// Prevent duplicate purchase
			const alreadyPurchased = await env.KV_DATABASE_ONLINE_NAME.get(purchaseKey);

			if (alreadyPurchased) {
				return new Response("Product already purchased", { status: 200 });
			}

			const saleKey = `sale:${stripeSessionId}`;

			const data = {
				productId,
				clientEmail,
				createdAt: new Date().toISOString(),
			};

			await env.KV_DATABASE_ONLINE_NAME.put(saleKey, JSON.stringify(data));
			await env.KV_DATABASE_ONLINE_NAME.put(purchaseKey, stripeSessionId);

			return new Response("OK");
		}

		// ---------- CHECK ACCESS ----------
		if (url.pathname === "/check-access") {

			const clientEmail = url.searchParams.get("clientEmail");
			const productId = url.searchParams.get("productId");

			if (!clientEmail || !productId) {
				return new Response("Missing params", { status: 400 });
			}

			const key = `purchase:${clientEmail}:${productId}`;

			const purchase = await env.KV_DATABASE_ONLINE_NAME.get(key);

			return new Response(JSON.stringify({
				hasAccess: !!purchase
			}), {
				headers: { "Content-Type": "application/json" }
			});
		}

		return new Response("Not Found", { status: 404 });
	}
};
