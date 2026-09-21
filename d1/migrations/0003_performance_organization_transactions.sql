-- 003 performance + organization metadata
ALTER TABLE departments ADD COLUMN unit_type TEXT NOT NULL DEFAULT 'department';
CREATE INDEX IF NOT EXISTS ix_departments_company_parent ON departments(company_id,parent_id,active);
CREATE INDEX IF NOT EXISTS ix_transactions_company_created ON transactions(company_id,created_at DESC);
CREATE INDEX IF NOT EXISTS ix_transactions_definition_employee ON transactions(definition_id,employee_id);
CREATE INDEX IF NOT EXISTS ix_transaction_values_transaction ON transaction_values(transaction_id);
CREATE INDEX IF NOT EXISTS ix_workflow_steps_definition_order ON workflow_steps(workflow_id,step_order,active);
