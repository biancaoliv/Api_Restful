import { MigrationInterface, QueryRunner } from "typeorm";

export class createUsersAndTables1668131209417 implements MigrationInterface {
    name = 'createUsersAndTables1668131209417'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tables" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying NOT NULL, "finished" boolean NOT NULL, "tablePayerId" uuid, CONSTRAINT "PK_7cf2aca7af9550742f855d4eb69" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tables_users_users" ("tablesId" uuid NOT NULL, "usersId" uuid NOT NULL, CONSTRAINT "PK_2a784b5e337308e305ed251de2c" PRIMARY KEY ("tablesId", "usersId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_cdd4637495becdacc29ce28681" ON "tables_users_users" ("tablesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_41ff23fe7292ebabf023b9516e" ON "tables_users_users" ("usersId") `);
        await queryRunner.query(`ALTER TABLE "tables" ADD CONSTRAINT "FK_b00e47e804246b4382753496c55" FOREIGN KEY ("tablePayerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tables_users_users" ADD CONSTRAINT "FK_cdd4637495becdacc29ce28681e" FOREIGN KEY ("tablesId") REFERENCES "tables"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "tables_users_users" ADD CONSTRAINT "FK_41ff23fe7292ebabf023b9516e6" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tables_users_users" DROP CONSTRAINT "FK_41ff23fe7292ebabf023b9516e6"`);
        await queryRunner.query(`ALTER TABLE "tables_users_users" DROP CONSTRAINT "FK_cdd4637495becdacc29ce28681e"`);
        await queryRunner.query(`ALTER TABLE "tables" DROP CONSTRAINT "FK_b00e47e804246b4382753496c55"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_41ff23fe7292ebabf023b9516e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_cdd4637495becdacc29ce28681"`);
        await queryRunner.query(`DROP TABLE "tables_users_users"`);
        await queryRunner.query(`DROP TABLE "tables"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
