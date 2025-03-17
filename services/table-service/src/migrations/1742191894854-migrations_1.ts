import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations11742191894854 implements MigrationInterface {
    name = 'Migrations11742191894854'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`table_dist\` ADD \`isUse\` tinyint NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`table_dist\` CHANGE \`created_at\` \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`table_dist\` CHANGE \`created_at\` \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`table_dist\` DROP COLUMN \`isUse\``);
    }

}
