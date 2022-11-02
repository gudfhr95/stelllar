import { Migration } from '@mikro-orm/migrations';

export class Migration20221102110318 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "user" ("id" bigserial primary key, "created_at" timestamptz(0) not null, "username" text not null, "email" text null, "last_login_at" timestamptz(0) null, "avatar_url" text null, "online_status" text check ("online_status" in (\'Online\', \'Away\', \'DoNotDisturb\', \'Offline\')) not null default \'Online\', "is_admin" boolean not null default false, "password_hash" text not null, "is_deleted" boolean not null default false, "is_banned" boolean not null default false, "ban_reason" text null, "is_og" boolean not null default false, "is_staff" boolean not null default false);');

    this.addSql('create table "relationship" ("owner_id" bigint not null, "user_id" bigint not null, "created_at" timestamptz(0) not null, "show_chat" boolean not null default false, "last_view_at" timestamptz(0) not null, "last_message_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "unread_count" int not null default 0, constraint "relationship_pkey" primary key ("owner_id", "user_id"));');

    this.addSql('alter table "relationship" add constraint "relationship_owner_id_foreign" foreign key ("owner_id") references "user" ("id") on update cascade;');
    this.addSql('alter table "relationship" add constraint "relationship_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;');
  }

}
