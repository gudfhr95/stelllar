import { Migration } from '@mikro-orm/migrations';

export class Migration20221102121301 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "group" ("id" bigserial primary key, "created_at" timestamptz(0) not null);');

    this.addSql('create table "group_users" ("group_id" bigint not null, "user_id" bigint not null, constraint "group_users_pkey" primary key ("group_id", "user_id"));');

    this.addSql('alter table "group_users" add constraint "group_users_group_id_foreign" foreign key ("group_id") references "group" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "group_users" add constraint "group_users_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "user" drop constraint if exists "user_color_check";');

    this.addSql('alter table "user" alter column "color" type text using ("color"::text);');
    this.addSql('alter table "user" add constraint "user_color_check" check ("color" in (\'Red\', \'Yellow\', \'Green\', \'Blue\', \'Indigo\', \'Purple\', \'Pink\'));');
    this.addSql('alter table "user" alter column "color" set default \'Purple\';');
  }

  async down(): Promise<void> {
    this.addSql('alter table "group_users" drop constraint "group_users_group_id_foreign";');

    this.addSql('drop table if exists "group" cascade;');

    this.addSql('drop table if exists "group_users" cascade;');

    this.addSql('alter table "user" drop constraint if exists "user_color_check";');

    this.addSql('alter table "user" alter column "color" drop default;');
    this.addSql('alter table "user" alter column "color" type text using ("color"::text);');
    this.addSql('alter table "user" add constraint "user_color_check" check ("color" in (\'Red\', \'Yellow\', \'Green\', \'Blue\', \'Indigo\', \'Purple\', \'Pink\'));');
  }

}
