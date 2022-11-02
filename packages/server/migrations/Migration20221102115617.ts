import { Migration } from '@mikro-orm/migrations';

export class Migration20221102115617 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "user_folder" ("user_id" bigint not null, "position" text not null default \'U\', constraint "user_folder_pkey" primary key ("user_id"));');

    this.addSql('alter table "user_folder" add constraint "user_folder_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade on delete cascade;');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "user_folder" cascade;');
  }

}
