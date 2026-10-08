/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 * @typedef {import('typeorm').QueryRunner} QueryRunner
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
module.exports = class Db1775783180754 {
    name = 'Db1775783180754'

    /**
     * @param {QueryRunner} queryRunner
     */
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(60) NOT NULL, \`email\` varchar(100) NOT NULL, \`password\` varchar(20) NOT NULL, \`typeUser\` enum ('admin', 'comum') NOT NULL, \`createAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`deletedAt\` datetime NULL, UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`premiacao\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nome_premiacao\` varchar(60) NOT NULL, \`valor_premiacao\` decimal NULL, \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`deletedAt\` datetime NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`genero\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nome_genero\` varchar(60) NOT NULL, \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`deletedAt\` datetime NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`diretor\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nome_diretor\` varchar(60) NOT NULL, \`sexo\` enum ('Feminino', 'Masculino') NOT NULL, \`data_nasc\` datetime NULL, \`nacionalidade\` varchar(50) NOT NULL, \`foto_diretor\` varchar(80) NULL, \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`deletedAt\` datetime NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`ator\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nome_ator\` varchar(60) NOT NULL, \`sexo\` enum ('Feminino', 'Masculino') NOT NULL, \`data_nasc\` datetime NOT NULL, \`nacionalidade\` varchar(50) NOT NULL, \`foto_ator\` varchar(80) NULL, \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`deletedAt\` datetime NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    /**
     * @param {QueryRunner} queryRunner
     */
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE \`ator\``);
        await queryRunner.query(`DROP TABLE \`diretor\``);
        await queryRunner.query(`DROP TABLE \`genero\``);
        await queryRunner.query(`DROP TABLE \`premiacao\``);
        await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
    }
}
