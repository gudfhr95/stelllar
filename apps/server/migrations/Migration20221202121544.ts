import { Migration } from '@mikro-orm/migrations';

export class Migration20221202121544 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "channel" ("id" bigserial primary key, "created_at" timestamptz(0) not null, "name" text not null, "description" text null, "server_id" bigint not null, "position" text not null default \'U\', "is_deleted" boolean not null default false);');

    this.addSql('alter table "channel" add constraint "channel_server_id_foreign" foreign key ("server_id") references "server" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "channel" cascade;');
  }

}
