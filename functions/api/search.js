export async function onRequestGet({ request, env }) {
  const u = new URL(request.url);
  const term = u.searchParams.get("term");
  const lat = u.searchParams.get("lat");
  const lng = u.searchParams.get("lng");
  const headers = { "content-type": "application/json; charset=utf-8" };

  if (!term || !lat || !lng) {
    return new Response(JSON.stringify({ error: "term, lat, lng لازم است" }), { status: 400, headers });
  }
  if (!env.NESHAN_KEY) {
    return new Response(JSON.stringify({ error: "NESHAN_KEY تنظیم نشده" }), { status: 500, headers });
  }

  const api = "https://api.neshan.org/v1/search?term=" + encodeURIComponent(term) +
    "&lat=" + encodeURIComponent(lat) + "&lng=" + encodeURIComponent(lng);
  const r = await fetch(api, { headers: { "Api-Key": env.NESHAN_KEY } });
  return new Response(await r.text(), { status: r.status, headers });
}
