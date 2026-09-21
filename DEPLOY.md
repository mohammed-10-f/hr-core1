# نشر HR Core Enterprise من الصفر

## 1) GitHub
ارفع محتويات هذا المجلد إلى مستودع جديد.

## 2) D1
Cloudflare Dashboard → Workers & Pages → D1 → Create database → الاسم `hr-core`.
انسخ Database ID.

## 3) Wrangler
في `wrangler.toml` استبدل:
`REPLACE_WITH_NEW_D1_DATABASE_ID`
بـ ID القاعدة الجديدة.

## 4) Cloudflare Worker
اربط المستودع أو استخدم Wrangler. المشروع يستخدم Worker واحداً وD1 Binding اسمه `DB`.

## 5) لا تستخدم Schema القديم
هذه النسخة لها Schema موحد جديد. لا تشغل ملفات `schema.sql` من المشاريع السابقة معها.

## 6) أول تشغيل
عند أول طلب API، يقوم Schema Manager بإنشاء البنية وزرع البيانات المرجعية اللازمة تلقائياً.
