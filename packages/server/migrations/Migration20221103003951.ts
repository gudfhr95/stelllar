import { Migration } from '@mikro-orm/migrations';

export class Migration20221103003951 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "folder_post" drop constraint "folder_post_post_id_foreign";');

    this.addSql('alter table "folder_post" add column "folder_id" bigint not null, add column "added_by_user_id" bigint not null;');
    this.addSql('alter table "folder_post" drop constraint "folder_post_pkey";');
    this.addSql('alter table "folder_post" add constraint "folder_post_folder_id_foreign" foreign key ("folder_id") references "folder" ("id") on update cascade;');
    this.addSql('alter table "folder_post" add constraint "folder_post_added_by_user_id_foreign" foreign key ("added_by_user_id") references "user" ("id") on update cascade;');
    this.addSql('alter table "folder_post" add constraint "folder_post_post_id_foreign" foreign key ("post_id") references "post" ("id") on update cascade;');
    this.addSql('alter table "folder_post" add constraint "folder_post_pkey" primary key ("post_id", "folder_id", "added_by_user_id");');
  }

  async down(): Promise<void> {
    this.addSql('alter table "folder_post" drop constraint "folder_post_folder_id_foreign";');
    this.addSql('alter table "folder_post" drop constraint "folder_post_added_by_user_id_foreign";');
    this.addSql('alter table "folder_post" drop constraint "folder_post_post_id_foreign";');

    this.addSql('alter table "folder_post" drop constraint "folder_post_pkey";');
    this.addSql('alter table "folder_post" drop column "folder_id";');
    this.addSql('alter table "folder_post" drop column "added_by_user_id";');
    this.addSql('alter table "folder_post" add constraint "folder_post_post_id_foreign" foreign key ("post_id") references "post" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "folder_post" add constraint "folder_post_pkey" primary key ("post_id");');
  }

}
