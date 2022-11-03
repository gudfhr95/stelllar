import { Migration } from '@mikro-orm/migrations';

export class Migration20221103004045 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "server_folder" drop constraint "server_folder_server_id_foreign";');

    this.addSql('alter table "server_folder" add column "folder_id" bigint not null;');
    this.addSql('alter table "server_folder" drop constraint "server_folder_pkey";');
    this.addSql('alter table "server_folder" add constraint "server_folder_folder_id_foreign" foreign key ("folder_id") references "folder" ("id") on update cascade;');
    this.addSql('alter table "server_folder" add constraint "server_folder_server_id_foreign" foreign key ("server_id") references "server" ("id") on update cascade;');
    this.addSql('alter table "server_folder" add constraint "server_folder_folder_id_unique" unique ("folder_id");');
    this.addSql('alter table "server_folder" add constraint "server_folder_pkey" primary key ("server_id", "folder_id");');
  }

  async down(): Promise<void> {
    this.addSql('alter table "server_folder" drop constraint "server_folder_folder_id_foreign";');
    this.addSql('alter table "server_folder" drop constraint "server_folder_server_id_foreign";');

    this.addSql('alter table "server_folder" drop constraint "server_folder_folder_id_unique";');
    this.addSql('alter table "server_folder" drop constraint "server_folder_pkey";');
    this.addSql('alter table "server_folder" drop column "folder_id";');
    this.addSql('alter table "server_folder" add constraint "server_folder_server_id_foreign" foreign key ("server_id") references "server" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "server_folder" add constraint "server_folder_pkey" primary key ("server_id");');
  }

}
