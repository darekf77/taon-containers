export default {
  async fetch(request: Request, env: any) {
    console.log('before');

    try {
      const result = await env.TAON_D1
        .prepare('SELECT 1 AS x')
        .all();

      console.log('after', result);

      return Response.json(result);
    } catch (e: any) {
      console.error('D1 ERROR', {
        message: e?.message,
        stack: e?.stack,
        cause: e?.cause,
      });

      return new Response('D1 failed', { status: 500 });
    }
  },
};
