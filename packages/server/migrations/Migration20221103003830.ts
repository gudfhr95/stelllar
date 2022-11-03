import { Migration } from '@mikro-orm/migrations';

export class Migration20221103003830 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "role" alter column "permissions" type text[] using ("permissions"::text[]);');

    this.addSql('alter table "folder" add column "server_id" bigint null;');
    this.addSql('alter table "folder" add constraint "folder_server_id_foreign" foreign key ("server_id") references "server" ("id") on update cascade on delete set null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "folder" drop constraint "folder_server_id_foreign";');

    this.addSql('alter table "folder" drop column "server_id";');

    this.addSql('alter table "role" alter column "permissions" type text[] using ("permissions"::text[]);');
  }

}
