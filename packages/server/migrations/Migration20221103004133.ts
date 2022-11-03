import { Migration } from '@mikro-orm/migrations';

export class Migration20221103004133 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "user_folder" drop constraint "user_folder_user_id_foreign";');

    this.addSql('alter table "user_folder" add column "folder_id" bigint not null;');
    this.addSql('alter table "user_folder" drop constraint "user_folder_pkey";');
    this.addSql('alter table "user_folder" add constraint "user_folder_folder_id_foreign" foreign key ("folder_id") references "folder" ("id") on update cascade;');
    this.addSql('alter table "user_folder" add constraint "user_folder_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;');
    this.addSql('alter table "user_folder" add constraint "user_folder_pkey" primary key ("user_id", "folder_id");');
  }

  async down(): Promise<void> {
    this.addSql('alter table "user_folder" drop constraint "user_folder_folder_id_foreign";');
    this.addSql('alter table "user_folder" drop constraint "user_folder_user_id_foreign";');

    this.addSql('alter table "user_folder" drop constraint "user_folder_pkey";');
    this.addSql('alter table "user_folder" drop column "folder_id";');
    this.addSql('alter table "user_folder" add constraint "user_folder_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "user_folder" add constraint "user_folder_pkey" primary key ("user_id");');
  }

}
