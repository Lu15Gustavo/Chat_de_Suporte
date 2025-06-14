import {MigrationInterface, QueryRunner} from "typeorm";
import {Table} from "typeorm";
import {TableForeignKey} from "typeorm";

export class CreateConnections1749826722389 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'connections',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                    },
                    {
                        name: 'admin_id',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'socket_id',
                        type: 'varchar',
                    },
                    {
                        name: 'user_id',
                        type: 'uuid',
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                ],
            })
        )

        await queryRunner.createForeignKey(
            'connections',
            new TableForeignKey({
                name: 'FKConnectionUser',
                columnNames: ['user_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'users',
                onDelete: 'SET NULL',
                onUpdate: 'SET NULL',
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('connections');
    }

}
