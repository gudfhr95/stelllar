import { Migration } from '@mikro-orm/migrations';

export class Migration20221102120731 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "group_user" ("user_id" bigint not null, constraint "group_user_pkey" primary key ("user_id"));');

    this.addSql('alter table "group_user" add constraint "group_user_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade on delete cascade;');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "group_user" cascade;');
  }

}
