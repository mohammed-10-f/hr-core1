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


## 2026-09 Performance / Transaction UX hardening
- Worker schema bootstrap is cached per Worker isolate instead of running PRAGMA/index/seed work on every request.
- Transaction definitions support company + department grouping, dynamic fields, role-based workflow steps and optional conditions.
- Transaction list is paginated/limited and searchable server-side.
- Transaction detail includes values, workflow and history.
- Organization view renders a hierarchical visual tree from department parent relationships.
- Frontend GET requests use short-lived cache/in-flight de-duplication; navigation no longer refetches identical data repeatedly.
- Added migration 0003 for transaction administration indexes/department linkage.
