import { Migration } from '@mikro-orm/migrations';

export class Migration20221102143251 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "role" alter column "permissions" type text[] using ("permissions"::text[]);');

    this.addSql('alter table "server_user" add column "created_at" timestamptz(0) not null, add column "status" text check ("status" in (\'None\', \'Joined\', \'Banned\')) not null default \'Joined\';');
  }

  async down(): Promise<void> {
    this.addSql('alter table "role" alter column "permissions" type text[] using ("permissions"::text[]);');

    this.addSql('alter table "server_user" drop column "created_at";');
    this.addSql('alter table "server_user" drop column "status";');
  }

}
