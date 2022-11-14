import { Migration } from '@mikro-orm/migrations';

export class Migration20221113123154 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "server_user" drop constraint "server_user_role_id_foreign";');

    this.addSql('alter table "server_user" alter column "role_id" type varchar(255) using ("role_id"::varchar(255));');
    this.addSql('alter table "server_user" alter column "role_id" drop not null;');
    this.addSql('alter table "server_user" add constraint "server_user_role_id_foreign" foreign key ("role_id") references "role" ("id") on update cascade on delete set null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "server_user" drop constraint "server_user_role_id_foreign";');

    this.addSql('alter table "server_user" alter column "role_id" type varchar(255) using ("role_id"::varchar(255));');
    this.addSql('alter table "server_user" alter column "role_id" set not null;');
    this.addSql('alter table "server_user" add constraint "server_user_role_id_foreign" foreign key ("role_id") references "role" ("id") on update cascade;');
  }

}
