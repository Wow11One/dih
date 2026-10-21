import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_assessments_other_industries" AS ENUM('1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', 'other', 'none');
  CREATE TYPE "public"."enum_assessments_q1_invested" AS ENUM('1', '2', '3', '4', '5', '6', '7', '8', '9', '10');
  CREATE TYPE "public"."enum_assessments_q1_planned" AS ENUM('1', '2', '3', '4', '5', '6', '7', '8', '9', '10');
  CREATE TYPE "public"."enum_assessments_q2" AS ENUM('1', '2', '3', '4', '5', '6', '7', '8', '9', '10');
  CREATE TYPE "public"."enum_assessments_q3" AS ENUM('1', '2', '3', '4', '5', '6', '7', '8', '9', '10');
  CREATE TYPE "public"."enum_assessments_q5" AS ENUM('1', '2', '3', '4', '5', '6', '7');
  CREATE TYPE "public"."enum_assessments_q6" AS ENUM('1', '2', '3', '4', '5', '6', '7', '8');
  CREATE TYPE "public"."enum_assessments_q7" AS ENUM('1', '2', '3', '4', '5', '6', '7', '8');
  CREATE TYPE "public"."enum_assessments_q8" AS ENUM('1', '2', '3', '4', '5', '6');
  CREATE TYPE "public"."enum_assessments_q10" AS ENUM('1', '2', '3', '4', '5', '6', '7', '8', '9', '10');
  CREATE TYPE "public"."enum_assessments_staff_size" AS ENUM('1', '2', '3', '4');
  CREATE TYPE "public"."enum_assessments_main_industry" AS ENUM('1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22');
  CREATE TYPE "public"."enum_assessments_q11_r1" AS ENUM('no', 'partial', 'yes');
  CREATE TYPE "public"."enum_assessments_q11_r2" AS ENUM('no', 'partial', 'yes');
  CREATE TYPE "public"."enum_assessments_q11_r3" AS ENUM('no', 'partial', 'yes');
  CREATE TYPE "public"."enum_assessments_q11_r4" AS ENUM('no', 'partial', 'yes');
  CREATE TYPE "public"."enum_assessments_q11_r5" AS ENUM('no', 'partial', 'yes');
  CREATE TYPE "public"."enum_exports_format" AS ENUM('csv', 'json');
  CREATE TYPE "public"."enum_exports_sort_order" AS ENUM('asc', 'desc');
  CREATE TYPE "public"."enum_exports_locale" AS ENUM('all', 'uk', 'en');
  CREATE TYPE "public"."enum_exports_drafts" AS ENUM('yes', 'no');
  CREATE TYPE "public"."enum_imports_import_mode" AS ENUM('create', 'update', 'upsert');
  CREATE TYPE "public"."enum_imports_status" AS ENUM('pending', 'completed', 'partial', 'failed');
  ALTER TYPE "public"."enum_payload_jobs_log_task_slug" ADD VALUE 'createCollectionExport' BEFORE 'schedulePublish';
  ALTER TYPE "public"."enum_payload_jobs_log_task_slug" ADD VALUE 'createCollectionImport' BEFORE 'schedulePublish';
  ALTER TYPE "public"."enum_payload_jobs_task_slug" ADD VALUE 'createCollectionExport' BEFORE 'schedulePublish';
  ALTER TYPE "public"."enum_payload_jobs_task_slug" ADD VALUE 'createCollectionImport' BEFORE 'schedulePublish';
  CREATE TABLE "assessments_other_industries" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_assessments_other_industries",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "assessments_q1_invested" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_assessments_q1_invested",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "assessments_q1_planned" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_assessments_q1_planned",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "assessments_q2" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_assessments_q2",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "assessments_q3" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_assessments_q3",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "assessments_q5" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_assessments_q5",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "assessments_q6" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_assessments_q6",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "assessments_q7" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_assessments_q7",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "assessments_q8" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_assessments_q8",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "assessments_q10" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_assessments_q10",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "assessments" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"participant_id" varchar,
  	"note" varchar,
  	"company_name" varchar NOT NULL,
  	"tax_id" varchar,
  	"contact_person" varchar,
  	"position" varchar,
  	"email" varchar NOT NULL,
  	"phone" varchar,
  	"website" varchar,
  	"staff_size" "enum_assessments_staff_size" NOT NULL,
  	"founded_year" numeric NOT NULL,
  	"country" varchar DEFAULT 'Україна' NOT NULL,
  	"region" varchar,
  	"postal_code" varchar,
  	"address" varchar,
  	"main_industry" "enum_assessments_main_industry" NOT NULL,
  	"other_industry_text" varchar,
  	"q4_r1" numeric NOT NULL,
  	"q4_r2" numeric NOT NULL,
  	"q4_r3" numeric NOT NULL,
  	"q4_r4" numeric NOT NULL,
  	"q4_r5" numeric NOT NULL,
  	"q4_r6" numeric NOT NULL,
  	"q4_r7" numeric NOT NULL,
  	"q9_r1" numeric NOT NULL,
  	"q9_r2" numeric NOT NULL,
  	"q9_r3" numeric NOT NULL,
  	"q9_r4" numeric NOT NULL,
  	"q9_r5" numeric NOT NULL,
  	"q11_r1" "enum_assessments_q11_r1" NOT NULL,
  	"q11_r2" "enum_assessments_q11_r2" NOT NULL,
  	"q11_r3" "enum_assessments_q11_r3" NOT NULL,
  	"q11_r4" "enum_assessments_q11_r4" NOT NULL,
  	"q11_r5" "enum_assessments_q11_r5" NOT NULL,
  	"consent" boolean DEFAULT false NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "exports" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"format" "enum_exports_format" DEFAULT 'csv' NOT NULL,
  	"limit" numeric,
  	"page" numeric DEFAULT 1,
  	"sort" varchar,
  	"sort_order" "enum_exports_sort_order",
  	"locale" "enum_exports_locale" DEFAULT 'all',
  	"drafts" "enum_exports_drafts" DEFAULT 'yes',
  	"collection_slug" varchar DEFAULT 'assessments' NOT NULL,
  	"where" jsonb DEFAULT '{}'::jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "exports_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "imports" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"collection_slug" varchar NOT NULL,
  	"import_mode" "enum_imports_import_mode",
  	"match_field" varchar DEFAULT 'id',
  	"status" "enum_imports_status" DEFAULT 'pending',
  	"summary_imported" numeric,
  	"summary_updated" numeric,
  	"summary_total" numeric,
  	"summary_issues" numeric,
  	"summary_issue_details" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "assessments_id" integer;
  ALTER TABLE "assessments_other_industries" ADD CONSTRAINT "assessments_other_industries_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."assessments"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "assessments_q1_invested" ADD CONSTRAINT "assessments_q1_invested_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."assessments"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "assessments_q1_planned" ADD CONSTRAINT "assessments_q1_planned_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."assessments"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "assessments_q2" ADD CONSTRAINT "assessments_q2_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."assessments"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "assessments_q3" ADD CONSTRAINT "assessments_q3_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."assessments"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "assessments_q5" ADD CONSTRAINT "assessments_q5_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."assessments"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "assessments_q6" ADD CONSTRAINT "assessments_q6_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."assessments"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "assessments_q7" ADD CONSTRAINT "assessments_q7_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."assessments"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "assessments_q8" ADD CONSTRAINT "assessments_q8_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."assessments"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "assessments_q10" ADD CONSTRAINT "assessments_q10_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."assessments"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "exports_texts" ADD CONSTRAINT "exports_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."exports"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "assessments_other_industries_order_idx" ON "assessments_other_industries" USING btree ("order");
  CREATE INDEX "assessments_other_industries_parent_idx" ON "assessments_other_industries" USING btree ("parent_id");
  CREATE INDEX "assessments_q1_invested_order_idx" ON "assessments_q1_invested" USING btree ("order");
  CREATE INDEX "assessments_q1_invested_parent_idx" ON "assessments_q1_invested" USING btree ("parent_id");
  CREATE INDEX "assessments_q1_planned_order_idx" ON "assessments_q1_planned" USING btree ("order");
  CREATE INDEX "assessments_q1_planned_parent_idx" ON "assessments_q1_planned" USING btree ("parent_id");
  CREATE INDEX "assessments_q2_order_idx" ON "assessments_q2" USING btree ("order");
  CREATE INDEX "assessments_q2_parent_idx" ON "assessments_q2" USING btree ("parent_id");
  CREATE INDEX "assessments_q3_order_idx" ON "assessments_q3" USING btree ("order");
  CREATE INDEX "assessments_q3_parent_idx" ON "assessments_q3" USING btree ("parent_id");
  CREATE INDEX "assessments_q5_order_idx" ON "assessments_q5" USING btree ("order");
  CREATE INDEX "assessments_q5_parent_idx" ON "assessments_q5" USING btree ("parent_id");
  CREATE INDEX "assessments_q6_order_idx" ON "assessments_q6" USING btree ("order");
  CREATE INDEX "assessments_q6_parent_idx" ON "assessments_q6" USING btree ("parent_id");
  CREATE INDEX "assessments_q7_order_idx" ON "assessments_q7" USING btree ("order");
  CREATE INDEX "assessments_q7_parent_idx" ON "assessments_q7" USING btree ("parent_id");
  CREATE INDEX "assessments_q8_order_idx" ON "assessments_q8" USING btree ("order");
  CREATE INDEX "assessments_q8_parent_idx" ON "assessments_q8" USING btree ("parent_id");
  CREATE INDEX "assessments_q10_order_idx" ON "assessments_q10" USING btree ("order");
  CREATE INDEX "assessments_q10_parent_idx" ON "assessments_q10" USING btree ("parent_id");
  CREATE INDEX "assessments_company_name_idx" ON "assessments" USING btree ("company_name");
  CREATE INDEX "assessments_email_idx" ON "assessments" USING btree ("email");
  CREATE INDEX "assessments_updated_at_idx" ON "assessments" USING btree ("updated_at");
  CREATE INDEX "assessments_created_at_idx" ON "assessments" USING btree ("created_at");
  CREATE INDEX "exports_updated_at_idx" ON "exports" USING btree ("updated_at");
  CREATE INDEX "exports_created_at_idx" ON "exports" USING btree ("created_at");
  CREATE UNIQUE INDEX "exports_filename_idx" ON "exports" USING btree ("filename");
  CREATE INDEX "exports_texts_order_parent" ON "exports_texts" USING btree ("order","parent_id");
  CREATE INDEX "imports_updated_at_idx" ON "imports" USING btree ("updated_at");
  CREATE INDEX "imports_created_at_idx" ON "imports" USING btree ("created_at");
  CREATE UNIQUE INDEX "imports_filename_idx" ON "imports" USING btree ("filename");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_assessments_fk" FOREIGN KEY ("assessments_id") REFERENCES "public"."assessments"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_assessments_id_idx" ON "payload_locked_documents_rels" USING btree ("assessments_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "assessments_other_industries" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "assessments_q1_invested" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "assessments_q1_planned" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "assessments_q2" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "assessments_q3" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "assessments_q5" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "assessments_q6" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "assessments_q7" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "assessments_q8" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "assessments_q10" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "assessments" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "exports" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "exports_texts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "imports" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "assessments_other_industries" CASCADE;
  DROP TABLE "assessments_q1_invested" CASCADE;
  DROP TABLE "assessments_q1_planned" CASCADE;
  DROP TABLE "assessments_q2" CASCADE;
  DROP TABLE "assessments_q3" CASCADE;
  DROP TABLE "assessments_q5" CASCADE;
  DROP TABLE "assessments_q6" CASCADE;
  DROP TABLE "assessments_q7" CASCADE;
  DROP TABLE "assessments_q8" CASCADE;
  DROP TABLE "assessments_q10" CASCADE;
  DROP TABLE "assessments" CASCADE;
  DROP TABLE "exports" CASCADE;
  DROP TABLE "exports_texts" CASCADE;
  DROP TABLE "imports" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_assessments_fk";
  
  ALTER TABLE "payload_jobs_log" ALTER COLUMN "task_slug" SET DATA TYPE text;
  DROP TYPE "public"."enum_payload_jobs_log_task_slug";
  CREATE TYPE "public"."enum_payload_jobs_log_task_slug" AS ENUM('inline', 'schedulePublish');
  ALTER TABLE "payload_jobs_log" ALTER COLUMN "task_slug" SET DATA TYPE "public"."enum_payload_jobs_log_task_slug" USING "task_slug"::"public"."enum_payload_jobs_log_task_slug";
  ALTER TABLE "payload_jobs" ALTER COLUMN "task_slug" SET DATA TYPE text;
  DROP TYPE "public"."enum_payload_jobs_task_slug";
  CREATE TYPE "public"."enum_payload_jobs_task_slug" AS ENUM('inline', 'schedulePublish');
  ALTER TABLE "payload_jobs" ALTER COLUMN "task_slug" SET DATA TYPE "public"."enum_payload_jobs_task_slug" USING "task_slug"::"public"."enum_payload_jobs_task_slug";
  DROP INDEX "payload_locked_documents_rels_assessments_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "assessments_id";
  DROP TYPE "public"."enum_assessments_other_industries";
  DROP TYPE "public"."enum_assessments_q1_invested";
  DROP TYPE "public"."enum_assessments_q1_planned";
  DROP TYPE "public"."enum_assessments_q2";
  DROP TYPE "public"."enum_assessments_q3";
  DROP TYPE "public"."enum_assessments_q5";
  DROP TYPE "public"."enum_assessments_q6";
  DROP TYPE "public"."enum_assessments_q7";
  DROP TYPE "public"."enum_assessments_q8";
  DROP TYPE "public"."enum_assessments_q10";
  DROP TYPE "public"."enum_assessments_staff_size";
  DROP TYPE "public"."enum_assessments_main_industry";
  DROP TYPE "public"."enum_assessments_q11_r1";
  DROP TYPE "public"."enum_assessments_q11_r2";
  DROP TYPE "public"."enum_assessments_q11_r3";
  DROP TYPE "public"."enum_assessments_q11_r4";
  DROP TYPE "public"."enum_assessments_q11_r5";
  DROP TYPE "public"."enum_exports_format";
  DROP TYPE "public"."enum_exports_sort_order";
  DROP TYPE "public"."enum_exports_locale";
  DROP TYPE "public"."enum_exports_drafts";
  DROP TYPE "public"."enum_imports_import_mode";
  DROP TYPE "public"."enum_imports_status";`)
}
