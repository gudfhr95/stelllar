import { Migration } from '@mikro-orm/migrations';

export class Migration20221104011447 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "user" add column "current_hashed_refresh_token" varchar(255) null;');

    this.addSql('alter table "role" alter column "permissions" type text[] using ("permissions"::text[]);');
  }

  async down(): Promise<void> {
    this.addSql('alter table "role" alter column "permissions" type text[] using ("permissions"::text[]);');

    this.addSql('alter table "user" drop column "current_hashed_refresh_token";');
  }

}
