import { Migration } from '@mikro-orm/migrations';

export class Migration20221102123203 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "group" ("id" bigserial primary key, "created_at" timestamptz(0) not null);');

    this.addSql('create table "server" ("id" bigserial primary key, "created_at" timestamptz(0) not null);');

    this.addSql('create table "role" ("id" bigserial primary key, "created_at" timestamptz(0) not null, "name" text not null, "server_id" bigint not null, "is_default" boolean not null default false, "color" varchar(255) null, "permissions" text[] not null default \'{SendMessages}\');');

    this.addSql('create table "user" ("id" bigserial primary key, "created_at" timestamptz(0) not null, "username" text not null, "email" text null, "last_login_at" timestamptz(0) null, "avatar_url" text null, "online_status" text check ("online_status" in (\'Online\', \'Away\', \'DoNotDisturb\', \'Offline\')) not null default \'Online\', "is_admin" boolean not null default false, "color" text check ("color" in (\'Red\', \'Yellow\', \'Green\', \'Blue\', \'Indigo\', \'Purple\', \'Pink\')) not null, "password_hash" text not null, "is_deleted" boolean not null default false, "is_banned" boolean not null default false, "ban_reason" text null, "is_og" boolean not null default false, "is_staff" boolean not null default false);');

    this.addSql('create table "server_user" ("user_id" bigint not null, "position" text not null default \'U\', "role_id" bigint not null, constraint "server_user_pkey" primary key ("user_id"));');

    this.addSql('create table "relationship" ("owner_id" bigint not null, "user_id" bigint not null, "created_at" timestamptz(0) not null, "show_chat" boolean not null default false, "status" text check ("status" in (\'None\', \'FriendRequestOutgoing\', \'FriendRequestIncoming\', \'Friends\', \'Blocking\', \'Blocked\')) not null default \'None\', "last_view_at" timestamptz(0) not null, "last_message_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "unread_count" int not null default 0, constraint "relationship_pkey" primary key ("owner_id", "user_id"));');

    this.addSql('create table "group_user" ("user_id" bigint not null, "last_message_at" timestamptz(0) not null, constraint "group_user_pkey" primary key ("user_id"));');

    this.addSql('create table "group_users" ("group_id" bigint not null, "user_id" bigint not null, constraint "group_users_pkey" primary key ("group_id", "user_id"));');

    this.addSql('create table "folder" ("id" bigserial primary key, "created_at" timestamptz(0) not null, "name" text not null, "description" text null, "avatar_url" text null, "owner_id" bigint null, "is_deleted" boolean not null default false, "post_count" int not null default 0, "follower_count" int not null default 0, "is_collaborative" boolean not null default false, "visibility" text check ("visibility" in (\'Public\', \'Friends\', \'Private\', \'Unlisted\')) not null default \'Public\');');

    this.addSql('create table "user_folder" ("user_id" bigint not null, "position" text not null default \'U\', constraint "user_folder_pkey" primary key ("user_id"));');

    this.addSql('alter table "role" add constraint "role_server_id_foreign" foreign key ("server_id") references "server" ("id") on update cascade;');

    this.addSql('alter table "server_user" add constraint "server_user_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "server_user" add constraint "server_user_role_id_foreign" foreign key ("role_id") references "role" ("id") on update cascade;');

    this.addSql('alter table "relationship" add constraint "relationship_owner_id_foreign" foreign key ("owner_id") references "user" ("id") on update cascade;');
    this.addSql('alter table "relationship" add constraint "relationship_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;');

    this.addSql('alter table "group_user" add constraint "group_user_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "group_users" add constraint "group_users_group_id_foreign" foreign key ("group_id") references "group" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "group_users" add constraint "group_users_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "folder" add constraint "folder_owner_id_foreign" foreign key ("owner_id") references "user" ("id") on update cascade on delete set null;');

    this.addSql('alter table "user_folder" add constraint "user_folder_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade on delete cascade;');
  }

}
