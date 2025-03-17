import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations11742192359752 implements MigrationInterface {
    name = 'Migrations11742192359752'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`table_dist\` CHANGE \`isUse\` \`isUse\` tinyint NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE \`table_dist\` CHANGE \`created_at\` \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`table_dist\` CHANGE \`created_at\` \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`table_dist\` CHANGE \`isUse\` \`isUse\` tinyint NOT NULL`);
    }

}
