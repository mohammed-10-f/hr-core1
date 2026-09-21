# Cloudflare deployment

## Dashboard route
Workers & Pages → Create application → Worker.

## D1
D1 → Create database → `hr-core` → copy Database ID.

ضعه في `wrangler.toml`:

```toml
[[d1_databases]]
binding = "DB"
database_name = "hr-core"
database_id = "YOUR_NEW_DATABASE_ID"
```

## Deploy
من بيئة تحتوي Wrangler:

```bash
npm run build
npx wrangler deploy
```

إذا كنت تستخدم GitHub integration، اجعل build command:
`npm run build`
والـ output directory:
`dist`

## Verification
افتح:
`/api/health`

المفترض:
```json
{"ok":true,"database":"D1","name":"hr-core"}
```
ثم افتح الصفحة وسجل:
`admin / 1234`
