const APP_ID = `e8aaca77`;
const APP_KEY = `fb4949cd7361530c1aa1b7e0517e32ef`;

const CORS = {
[`Access-Control-Allow-Origin`]: `*`,
[`Access-Control-Allow-Methods`]: `GET, POST, OPTIONS`,
[`Access-Control-Allow-Headers`]: `Content-Type, Authorization`,
};

Deno.serve(async (req) => {
if (req.method === `OPTIONS`) {
return new Response(null, { headers: CORS });
}

try {
const body = await req.json();
const what = encodeURIComponent(body.what);
const where = encodeURIComponent(body.where);
const days = body.days;

```
const url = `https://api.adzuna.com/v1/api/jobs/us/search/1?app_id=${APP_ID}&app_key=${APP_KEY}&results_per_page=10&what=${what}&where=${where}&max_days_old=${days}&sort_by=date`;

const res = await fetch(url);
const data = await res.json();

return new Response(JSON.stringify(data), {
  headers: { ...CORS, [`Content-Type`]: `application/json` },
});
```

} catch (err) {
return new Response(JSON.stringify({ error: err.message }), {
status: 500,
headers: { …CORS, [`Content-Type`]: `application/json` },
});
}
});
