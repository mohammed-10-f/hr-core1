export const REQUIRED = {
  schema_migrations: [
    ['version','INTEGER NOT NULL DEFAULT 0'], ['name','TEXT NOT NULL'], ['applied_at','TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP']
  ],
  companies: [
    ['id','INTEGER PRIMARY KEY AUTOINCREMENT'], ['name_ar','TEXT NOT NULL'], ['name_en','TEXT'], ['code','TEXT'], ['commercial_registration','TEXT'], ['tax_number','TEXT'], ['phone','TEXT'], ['email','TEXT'], ['address','TEXT'], ['city','TEXT'], ['country','TEXT NOT NULL DEFAULT \'Saudi Arabia\''], ['active','INTEGER NOT NULL DEFAULT 1'], ['created_at','TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP'], ['updated_at','TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP']
  ],
  departments: [
    ['id','INTEGER PRIMARY KEY AUTOINCREMENT'], ['company_id','INTEGER'], ['parent_id','INTEGER'], ['code','TEXT NOT NULL'], ['name_ar','TEXT NOT NULL'], ['name_en','TEXT'], ['manager_employee_id','INTEGER'], ['active','INTEGER NOT NULL DEFAULT 1'], ['created_at','TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP'], ['updated_at','TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP']
  ],
  positions: [
    ['id','INTEGER PRIMARY KEY AUTOINCREMENT'], ['department_id','INTEGER NOT NULL'], ['code','TEXT NOT NULL'], ['title_ar','TEXT NOT NULL'], ['title_en','TEXT'], ['grade','TEXT'], ['approved_headcount','INTEGER NOT NULL DEFAULT 1'], ['active','INTEGER NOT NULL DEFAULT 1'], ['created_at','TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP'], ['updated_at','TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP']
  ],
  vacancies: [
    ['id','INTEGER PRIMARY KEY AUTOINCREMENT'], ['position_id','INTEGER NOT NULL'], ['slot_no','INTEGER NOT NULL'], ['status','TEXT NOT NULL DEFAULT \'open\''], ['employee_id','INTEGER'], ['opened_at','TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP'], ['occupied_at','TEXT'], ['closed_at','TEXT']
  ],
  employees: [
    ['id','INTEGER PRIMARY KEY AUTOINCREMENT'], ['company_id','INTEGER'], ['employee_no','TEXT NOT NULL'], ['national_id','TEXT'], ['name_ar','TEXT NOT NULL'], ['name_en','TEXT'], ['email','TEXT'], ['phone','TEXT'], ['job_title','TEXT'], ['department_id','INTEGER'], ['position_id','INTEGER'], ['manager_id','INTEGER'], ['hire_date','TEXT'], ['employment_status','TEXT NOT NULL DEFAULT \'active\''], ['basic_salary','REAL NOT NULL DEFAULT 0'], ['housing_allowance','REAL NOT NULL DEFAULT 0'], ['transport_allowance','REAL NOT NULL DEFAULT 0'], ['other_allowances','REAL NOT NULL DEFAULT 0'], ['gosi_enabled','INTEGER NOT NULL DEFAULT 1'], ['gosi_rate','REAL NOT NULL DEFAULT 9.0'], ['active','INTEGER NOT NULL DEFAULT 1'], ['created_at','TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP'], ['updated_at','TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP']
  ],
  employee_assignments: [
    ['id','INTEGER PRIMARY KEY AUTOINCREMENT'], ['employee_id','INTEGER NOT NULL'], ['department_id','INTEGER'], ['position_id','INTEGER'], ['vacancy_id','INTEGER'], ['start_date','TEXT NOT NULL'], ['end_date','TEXT'], ['is_current','INTEGER NOT NULL DEFAULT 1'], ['reason','TEXT'], ['created_at','TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP']
  ],
  roles: [
    ['id','INTEGER PRIMARY KEY AUTOINCREMENT'], ['code','TEXT NOT NULL UNIQUE'], ['name_ar','TEXT NOT NULL'], ['name_en','TEXT'], ['description','TEXT'], ['is_system','INTEGER NOT NULL DEFAULT 0'], ['active','INTEGER NOT NULL DEFAULT 1'], ['created_at','TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP'], ['updated_at','TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP']
  ],
  permissions: [
    ['id','INTEGER PRIMARY KEY AUTOINCREMENT'], ['code','TEXT NOT NULL UNIQUE'], ['name_ar','TEXT NOT NULL'], ['module','TEXT'], ['scope_type','TEXT NOT NULL DEFAULT \'all\''], ['active','INTEGER NOT NULL DEFAULT 1']
  ],
  role_permissions: [
    ['id','INTEGER PRIMARY KEY AUTOINCREMENT'], ['role_id','INTEGER NOT NULL'], ['permission_id','INTEGER NOT NULL'], ['created_at','TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP']
  ],
  users: [
    ['id','INTEGER PRIMARY KEY AUTOINCREMENT'], ['username','TEXT NOT NULL UNIQUE'], ['password_hash','TEXT NOT NULL'], ['display_name','TEXT NOT NULL'], ['email','TEXT'], ['employee_id','INTEGER'], ['role_id','INTEGER NOT NULL'], ['company_id','INTEGER'], ['active','INTEGER NOT NULL DEFAULT 1'], ['must_change_password','INTEGER NOT NULL DEFAULT 1'], ['last_login_at','TEXT'], ['created_at','TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP'], ['updated_at','TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP']
  ],
  sessions: [
    ['id','INTEGER PRIMARY KEY AUTOINCREMENT'], ['session_token','TEXT NOT NULL UNIQUE'], ['user_id','INTEGER NOT NULL'], ['created_at','TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP'], ['expires_at','TEXT NOT NULL'], ['revoked_at','TEXT']
  ],
  transaction_definitions: [
    ['id','INTEGER PRIMARY KEY AUTOINCREMENT'], ['code','TEXT NOT NULL UNIQUE'], ['name_ar','TEXT NOT NULL'], ['name_en','TEXT'], ['description','TEXT'], ['category','TEXT'], ['active','INTEGER NOT NULL DEFAULT 1'], ['version','INTEGER NOT NULL DEFAULT 1'], ['created_by','INTEGER'], ['created_at','TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP'], ['updated_at','TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP']
  ],
  transaction_fields: [
    ['id','INTEGER PRIMARY KEY AUTOINCREMENT'], ['definition_id','INTEGER NOT NULL'], ['field_key','TEXT NOT NULL'], ['label_ar','TEXT NOT NULL'], ['field_type','TEXT NOT NULL DEFAULT \'text\''], ['required','INTEGER NOT NULL DEFAULT 0'], ['options_json','TEXT'], ['sort_order','INTEGER NOT NULL DEFAULT 0'], ['active','INTEGER NOT NULL DEFAULT 1']
  ],
  workflow_definitions: [
    ['id','INTEGER PRIMARY KEY AUTOINCREMENT'], ['definition_id','INTEGER NOT NULL'], ['name_ar','TEXT NOT NULL'], ['active','INTEGER NOT NULL DEFAULT 1'], ['created_at','TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP']
  ],
  workflow_steps: [
    ['id','INTEGER PRIMARY KEY AUTOINCREMENT'], ['workflow_id','INTEGER NOT NULL'], ['step_order','INTEGER NOT NULL'], ['name_ar','TEXT NOT NULL'], ['role_id','INTEGER'], ['required_permission','TEXT'], ['is_final','INTEGER NOT NULL DEFAULT 0'], ['active','INTEGER NOT NULL DEFAULT 1']
  ],
  transactions: [
    ['id','INTEGER PRIMARY KEY AUTOINCREMENT'], ['transaction_no','TEXT NOT NULL UNIQUE'], ['definition_id','INTEGER NOT NULL'], ['employee_id','INTEGER'], ['created_by','INTEGER NOT NULL'], ['current_step_id','INTEGER'], ['status','TEXT NOT NULL DEFAULT \'draft\''], ['subject','TEXT'], ['notes','TEXT'], ['submitted_at','TEXT'], ['completed_at','TEXT'], ['created_at','TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP'], ['updated_at','TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP']
  ],
  transaction_values: [
    ['id','INTEGER PRIMARY KEY AUTOINCREMENT'], ['transaction_id','INTEGER NOT NULL'], ['field_id','INTEGER NOT NULL'], ['value_text','TEXT'], ['value_number','REAL'], ['value_date','TEXT'], ['value_json','TEXT']
  ],
  transaction_history: [
    ['id','INTEGER PRIMARY KEY AUTOINCREMENT'], ['transaction_id','INTEGER NOT NULL'], ['from_status','TEXT'], ['to_status','TEXT'], ['action','TEXT NOT NULL'], ['comment','TEXT'], ['actor_user_id','INTEGER'], ['created_at','TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP']
  ],
  payroll_components: [
    ['id','INTEGER PRIMARY KEY AUTOINCREMENT'], ['code','TEXT NOT NULL UNIQUE'], ['name_ar','TEXT NOT NULL'], ['type','TEXT NOT NULL'], ['taxable','INTEGER NOT NULL DEFAULT 0'], ['active','INTEGER NOT NULL DEFAULT 1']
  ],
  employee_compensation: [
    ['id','INTEGER PRIMARY KEY AUTOINCREMENT'], ['employee_id','INTEGER NOT NULL'], ['effective_from','TEXT NOT NULL'], ['basic_salary','REAL NOT NULL DEFAULT 0'], ['housing_allowance','REAL NOT NULL DEFAULT 0'], ['transport_allowance','REAL NOT NULL DEFAULT 0'], ['other_allowances','REAL NOT NULL DEFAULT 0'], ['gosi_enabled','INTEGER NOT NULL DEFAULT 1'], ['gosi_rate','REAL NOT NULL DEFAULT 9.0'], ['created_at','TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP']
  ],
  payroll_periods: [
    ['id','INTEGER PRIMARY KEY AUTOINCREMENT'], ['name_ar','TEXT NOT NULL'], ['period_start','TEXT NOT NULL'], ['period_end','TEXT NOT NULL'], ['status','TEXT NOT NULL DEFAULT \'open\''], ['created_at','TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP']
  ],
  payroll_items: [
    ['id','INTEGER PRIMARY KEY AUTOINCREMENT'], ['period_id','INTEGER NOT NULL'], ['employee_id','INTEGER NOT NULL'], ['basic_salary','REAL NOT NULL DEFAULT 0'], ['housing_allowance','REAL NOT NULL DEFAULT 0'], ['transport_allowance','REAL NOT NULL DEFAULT 0'], ['other_allowances','REAL NOT NULL DEFAULT 0'], ['gosi_base','REAL NOT NULL DEFAULT 0'], ['gosi_amount','REAL NOT NULL DEFAULT 0'], ['gross_salary','REAL NOT NULL DEFAULT 0'], ['net_salary','REAL NOT NULL DEFAULT 0'], ['status','TEXT NOT NULL DEFAULT \'calculated\'']
  ],
  audit_logs: [
    ['id','INTEGER PRIMARY KEY AUTOINCREMENT'], ['user_id','INTEGER'], ['action','TEXT NOT NULL'], ['entity_type','TEXT'], ['entity_id','INTEGER'], ['details_json','TEXT'], ['ip','TEXT'], ['created_at','TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP']
  ],
  notifications: [
    ['id','INTEGER PRIMARY KEY AUTOINCREMENT'], ['user_id','INTEGER NOT NULL'], ['title','TEXT NOT NULL'], ['body','TEXT'], ['type','TEXT'], ['read_at','TEXT'], ['created_at','TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP']
  ],
  system_settings: [
    ['id','INTEGER PRIMARY KEY AUTOINCREMENT'], ['setting_key','TEXT NOT NULL UNIQUE'], ['setting_value','TEXT'], ['updated_at','TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP']
  ]
};

export const INDEXES = [
  'CREATE UNIQUE INDEX IF NOT EXISTS ux_employees_employee_no ON employees(employee_no)',
  'CREATE INDEX IF NOT EXISTS ix_employees_department ON employees(department_id)',
  'CREATE INDEX IF NOT EXISTS ix_vacancies_position_status ON vacancies(position_id,status)',
  'CREATE UNIQUE INDEX IF NOT EXISTS ux_role_permission ON role_permissions(role_id,permission_id)',
  'CREATE INDEX IF NOT EXISTS ix_users_role ON users(role_id)',
  'CREATE INDEX IF NOT EXISTS ix_sessions_user ON sessions(user_id)',
  'CREATE INDEX IF NOT EXISTS ix_transactions_definition ON transactions(definition_id)',
  'CREATE INDEX IF NOT EXISTS ix_transactions_employee ON transactions(employee_id)',
  'CREATE INDEX IF NOT EXISTS ix_payroll_items_period ON payroll_items(period_id)'
];

const PERMISSIONS = [
  ['dashboard.view','لوحة التحكم','dashboard'],['employees.view','عرض الموظفين','employees'],['employees.create','إضافة موظف','employees'],['employees.edit','تعديل موظف','employees'],['employees.delete','حذف موظف','employees'],['employees.create_user','إنشاء مستخدم للموظف','employees'],
  ['organization.view','عرض الهيكل التنظيمي','organization'],['organization.manage','إدارة الهيكل والشواغر','organization'],
  ['transactions.view','عرض المعاملات','transactions'],['transactions.create','إنشاء معاملة','transactions'],['transactions.edit','تعديل معاملة','transactions'],['transactions.approve','اعتماد معاملة','transactions'],['transactions.return','إرجاع معاملة','transactions'],['transactions.reject','رفض معاملة','transactions'],['transactions.complete','إكمال معاملة','transactions'],['transactions.builder','منشئ المعاملات','transactions'],
  ['payroll.view','عرض الرواتب','payroll'],['payroll.calculate','احتساب الرواتب','payroll'],['payroll.manage','إدارة مسيرات الرواتب','payroll'],
  ['reports.view','عرض التقارير','reports'],['reports.export','تصدير التقارير','reports'],
  ['roles.view','عرض الأدوار','admin'],['roles.manage','إدارة الأدوار والصلاحيات','admin'],['users.view','عرض المستخدمين','admin'],['users.manage','إدارة المستخدمين','admin'],['settings.manage','إدارة الإعدادات','admin'],['audit.view','سجل العمليات','admin'],['database.health','صحة قاعدة البيانات','admin']
];

function qi(name){ return '"' + String(name).replaceAll('"','""') + '"'; }

async function tableExists(db, table){ const r=await db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name=?").bind(table).first(); return !!r; }
async function columns(db, table){ const r=await db.prepare(`PRAGMA table_info(${qi(table)})`).all(); return new Set((r.results||[]).map(x=>x.name)); }

async function ensureTables(db){
  for(const [table, cols] of Object.entries(REQUIRED)){
    if(!(await tableExists(db,table))){
      const defs=cols.map(([n,d])=>`${qi(n)} ${d}`).join(',');
      await db.prepare(`CREATE TABLE IF NOT EXISTS ${qi(table)} (${defs})`).run();
    } else {
      const have=await columns(db,table);
      for(const [n,d] of cols){
        if(!have.has(n)){
          // All additive columns in the canonical manifest are nullable or have a safe default.
          await db.prepare(`ALTER TABLE ${qi(table)} ADD COLUMN ${qi(n)} ${d}`).run();
        }
      }
    }
  }
  for(const sql of INDEXES) await db.prepare(sql).run();
}

async function seed(db){
  await db.prepare(`INSERT OR IGNORE INTO companies(id,name_ar,name_en,code,city,country,active) VALUES(1,?,?,?,?,?,1)`).bind('شركة النخبة للتجارة','Elite Trading Company','ELITE','الرياض','Saudi Arabia').run();
  const roles=[['super_admin','مدير النظام','System Administrator',1],['hr','مدير موارد','HR Manager',0],['manager','مدير مباشر','Direct Manager',0],['employee','موظف','Employee',0]];
  for(const r of roles) await db.prepare(`INSERT OR IGNORE INTO roles(code,name_ar,name_en,is_system,active) VALUES(?,?,?,?,1)`).bind(...r).run();
  for(const p of PERMISSIONS) await db.prepare(`INSERT OR IGNORE INTO permissions(code,name_ar,module,scope_type,active) VALUES(?,?,?,?,1)`).bind(p[0],p[1],p[2],'all').run();
  const admin=await db.prepare(`SELECT id FROM roles WHERE code='super_admin'`).first();
  const perms=await db.prepare(`SELECT id FROM permissions WHERE active=1`).all();
  for(const p of (perms.results||[])) await db.prepare(`INSERT OR IGNORE INTO role_permissions(role_id,permission_id) VALUES(?,?)`).bind(admin.id,p.id).run();
  const defaultPass='pbkdf2$100000$YWRtaW4tc2FsdC0yMDI2$38FPEssFOEsudeS7rQL4gfovCum_Qzrhf7H6WKLwCe0';
  // Bootstrap is deterministic: on a clean database create admin; if the seed account exists
  // but its bootstrap hash differs, repair only this dedicated bootstrap account.
  const existingAdmin=await db.prepare(`SELECT id,password_hash,role_id FROM users WHERE username='admin'`).first();
  if(!existingAdmin){
    await db.prepare(`INSERT INTO users(id,username,password_hash,display_name,role_id,company_id,active,must_change_password) VALUES(1,'admin',?,'مدير النظام',?,1,1,1)`).bind(defaultPass,admin.id).run();
  }else if(existingAdmin.password_hash!==defaultPass || existingAdmin.role_id!==admin.id){
    await db.prepare(`UPDATE users SET password_hash=?,role_id=?,active=1,must_change_password=1,updated_at=CURRENT_TIMESTAMP WHERE id=? AND username='admin'`).bind(defaultPass,admin.id,existingAdmin.id).run();
  }
  const components=[['basic','الراتب الأساسي','earning'],['housing','بدل السكن','earning'],['transport','بدل النقل','earning'],['other','بدلات أخرى','earning'],['gosi','التأمينات الاجتماعية','deduction']];
  for(const c of components) await db.prepare(`INSERT OR IGNORE INTO payroll_components(code,name_ar,type) VALUES(?,?,?)`).bind(...c).run();
  await db.prepare(`INSERT OR IGNORE INTO system_settings(setting_key,setting_value) VALUES('schema_version','2')`).run();
  await db.prepare(`INSERT OR IGNORE INTO schema_migrations(version,name) VALUES(2,'bootstrap-admin-repair')`).run();
}

let bootPromise;
export async function ensureSchema(env){
  if(!bootPromise){ bootPromise=(async()=>{ await ensureTables(env.DB); await seed(env.DB); })().catch(e=>{bootPromise=null; throw e;}); }
  return bootPromise;
}

export async function schemaHealth(db){
  const v=await db.prepare(`SELECT MAX(version) version FROM schema_migrations`).first();
  const tables=await db.prepare(`SELECT COUNT(*) count FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'`).first();
  return {version:v?.version||0, tableCount:tables?.count||0, status:'healthy'};
}
