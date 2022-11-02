import { Migration } from '@mikro-orm/migrations';

export class Migration20221102054245 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "user" ("id" bigserial primary key, "created_at" timestamptz(0) not null, "username" text not null, "email" text null, "password_hash" text not null);');
  }

}
