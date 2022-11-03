import { Migration } from '@mikro-orm/migrations';

export class Migration20221103003046 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "group" add column "owner_id" bigint not null, add column "name" text not null, add column "avatar_url" text null, add column "last_message_at" timestamptz(0) not null;');
    this.addSql('alter table "group" add constraint "group_owner_id_foreign" foreign key ("owner_id") references "user" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "group" drop constraint "group_owner_id_foreign";');

    this.addSql('alter table "group" drop column "owner_id";');
    this.addSql('alter table "group" drop column "name";');
    this.addSql('alter table "group" drop column "avatar_url";');
    this.addSql('alter table "group" drop column "last_message_at";');
  }

}
