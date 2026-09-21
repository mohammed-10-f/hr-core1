-- 0003: transaction administration hardening
ALTER TABLE transaction_definitions ADD COLUMN department_id INTEGER;
CREATE INDEX IF NOT EXISTS ix_transaction_definitions_company_department ON transaction_definitions(company_id,department_id,active);
CREATE INDEX IF NOT EXISTS ix_transaction_fields_definition_order ON transaction_fields(definition_id,sort_order);
CREATE INDEX IF NOT EXISTS ix_transactions_employee ON transactions(company_id,employee_id,created_at);
CREATE INDEX IF NOT EXISTS ix_transactions_definition_status ON transactions(company_id,definition_id,status,created_at);
CREATE INDEX IF NOT EXISTS ix_workflow_steps_workflow_order ON workflow_steps(workflow_id,step_order);
