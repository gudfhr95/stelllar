import { Migration } from '@mikro-orm/migrations';

export class Migration20221102120403 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "server_user" ("user_id" bigint not null, "position" text not null default \'U\', constraint "server_user_pkey" primary key ("user_id"));');

    this.addSql('alter table "server_user" add constraint "server_user_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade on delete cascade;');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "server_user" cascade;');
  }

}
