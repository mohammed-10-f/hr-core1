# HR Core Enterprise

نظام موارد بشرية مؤسسي عربي RTL مبني على Cloudflare Workers + D1.

## المبدأ المعماري
- قاعدة بيانات Canonical واحدة، جميع المفاتيح الأساسية INTEGER.
- لا توجد طبقة توافق مع Schema قديم لأن المشروع يبدأ بقاعدة D1 جديدة.
- Schema Manager غير هدّام: ينشئ الجداول ويضيف الأعمدة/الفهارس المطلوبة فقط.
- لا يحذف النظام جداول أو أعمدة أو بيانات أعمال تلقائياً.
- Migrations مرقمة وقابلة للتتبع.
- تسجيل الدخول لا يشغل فحصاً كاملاً للقاعدة في كل طلب؛ Schema gate يعمل مرة لكل Worker isolate ويستخدم نسخة Schema.
- جميع واجهات النظام عربية وRTL والقائمة الجانبية في اليمين.

## بيانات الدخول الأولية
- المستخدم: `admin`
- كلمة المرور: `1234`
- يجب تغيير كلمة المرور بعد أول دخول.

## النشر
1. أنشئ D1 جديدة باسم `hr-core`.
2. خذ `database_id` وضعه في `wrangler.toml`.
3. نفّذ `npx wrangler deploy`.
4. افتح الرابط وسجل الدخول.

لا تشغّل Schema قديم من المشاريع السابقة على قاعدة البيانات الجديدة.


## HR Core Enterprise — Enterprise hardening
This build adds company-scoped authentication, server-side authorization, employee master data, organization/position/vacancy flows, dynamic transaction definitions and workflows, payroll generation/approval/lock/export, reports, users/roles, notifications and audit APIs. The schema manager is additive and does not drop existing tables or data. Default bootstrap: company `GLOBAL`, user `admin`, password `1234`; change the password/disable bootstrap before production.


## Enterprise rebuild — Performance / Organization / Transactions v3

This release is designed for the existing Cloudflare D1 database `hr-core`.

### Important
- The Worker no longer runs schema/seed checks on every request. Schema initialization is cached per Worker isolate.
- A new `departments.unit_type` field is supported for sector/department/section/unit/branch classification.
- Organization UI now renders a hierarchical tree with parent/child connectors and creates units using a parent selector instead of raw IDs.
- Transaction list uses server-side search, status filtering and limited result sets.
- Transaction details show workflow, values and history.
- Transaction builder supports company, dynamic fields and role-based workflow steps.
- Roles/permissions are shown as an enterprise matrix.
- User creation hashes passwords with PBKDF2 instead of storing a fallback password.
- Existing D1 data is preserved. Do not drop tables or reset the database.

### Deployment
Push the repository contents to the connected GitHub repository. Cloudflare should build/deploy the Worker from that commit. After deployment, open `/api/health` and confirm `ok: true` and schema version `3` (the first request may perform the one-time schema upgrade).
