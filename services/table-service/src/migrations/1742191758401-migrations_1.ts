import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations11742191758401 implements MigrationInterface {
    name = 'Migrations11742191758401'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`table_dist\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nameTable\` int NOT NULL, \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, UNIQUE INDEX \`IDX_d1dc07bb69b12fc5cc809c441a\` (\`nameTable\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_d1dc07bb69b12fc5cc809c441a\` ON \`table_dist\``);
        await queryRunner.query(`DROP TABLE \`table_dist\``);
    }

}
