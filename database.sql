-- Adminer 4.6.1 PostgreSQL dump

DROP TABLE IF EXISTS "products";
DROP SEQUENCE products_id_seq;
CREATE SEQUENCE products_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 9223372036854775807 START 1 CACHE 1;

CREATE TABLE "public"."products" (
    "code" text NOT NULL,
    "name" text NOT NULL,
    "price" real NOT NULL,
    "gst" real NOT NULL,
    "id" integer DEFAULT nextval('products_id_seq') NOT NULL
) WITH (oids = false);

INSERT INTO "products" ("code", "name", "price", "gst", "id") VALUES
('1',	'A',	125,	10,	3),
('2',	'B',	200,	10,	5);

-- 2018-03-14 07:56:22.731163+0
