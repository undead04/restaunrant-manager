import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations11742189409247 implements MigrationInterface {
    name = 'Migrations11742189409247'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`category_dist\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, UNIQUE INDEX \`IDX_2835b7f9d5e4cd039db7457b73\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`dist\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`url_image\` varchar(255) NOT NULL, \`price\` float NOT NULL, \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`categoryDistId\` int NULL, INDEX \`dist-index\` (\`categoryDistId\`), FULLTEXT INDEX \`dist-fulltext\` (\`name\`, \`description\`), UNIQUE INDEX \`IDX_3c4e5bf14df4ae7780e95f0527\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`dist\` ADD CONSTRAINT \`FK_594039df38b662c5e807f470238\` FOREIGN KEY (\`categoryDistId\`) REFERENCES \`category_dist\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`dist\` DROP FOREIGN KEY \`FK_594039df38b662c5e807f470238\``);
        await queryRunner.query(`DROP INDEX \`IDX_3c4e5bf14df4ae7780e95f0527\` ON \`dist\``);
        await queryRunner.query(`DROP INDEX \`dist-fulltext\` ON \`dist\``);
        await queryRunner.query(`DROP INDEX \`dist-index\` ON \`dist\``);
        await queryRunner.query(`DROP TABLE \`dist\``);
        await queryRunner.query(`DROP INDEX \`IDX_2835b7f9d5e4cd039db7457b73\` ON \`category_dist\``);
        await queryRunner.query(`DROP TABLE \`category_dist\``);
    }

}
