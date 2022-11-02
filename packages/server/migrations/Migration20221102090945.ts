import { Migration } from '@mikro-orm/migrations';

export class Migration20221102090945 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "user" ("id" bigserial primary key, "created_at" timestamptz(0) not null, "username" text not null, "email" text null, "last_login_at" timestamptz(0) null, "avatar_url" text null, "is_admin" boolean not null default false, "password_hash" text not null, "is_deleted" boolean not null default false, "is_banned" boolean not null default false, "ban_reason" text null);');
  }

}
