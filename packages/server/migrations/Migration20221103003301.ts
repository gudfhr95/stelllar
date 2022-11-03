import { Migration } from '@mikro-orm/migrations';

export class Migration20221103003301 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "user" ("id" bigserial primary key, "created_at" timestamptz(0) not null, "username" text not null, "email" text null, "last_login_at" timestamptz(0) null, "avatar_url" text null, "online_status" text check ("online_status" in (\'Online\', \'Away\', \'DoNotDisturb\', \'Offline\')) not null default \'Online\', "is_admin" boolean not null default false, "color" text check ("color" in (\'Red\', \'Yellow\', \'Green\', \'Blue\', \'Indigo\', \'Purple\', \'Pink\')) not null, "password_hash" text not null, "is_deleted" boolean not null default false, "is_banned" boolean not null default false, "ban_reason" text null, "is_og" boolean not null default false, "is_staff" boolean not null default false);');

    this.addSql('create table "server" ("id" bigserial primary key, "created_at" timestamptz(0) not null, "name" text not null, "display_name" text not null, "description" text null, "owner_id" bigint not null, "category" text check ("category" in (\'Arts\', \'Business\', \'Culture\', \'Discussion\', \'Entertainment\', \'Gaming\', \'Health\', \'Hobbies\', \'Lifestyle\', \'Memes\', \'Meta\', \'News\', \'Politics\', \'Programming\', \'Science\', \'Sports\', \'Technology\', \'Other\')) not null default \'Other\', "user_count" int not null default 0, "avatar_url" text null, "banner_url" text null, "is_banned" boolean not null default false, "is_deleted" boolean not null default false, "is_public" boolean not null default true, "is_chat_enabled" boolean not null default true, "is_downvotes_enabled" boolean not null default false, "is_featured" boolean not null default false);');

    this.addSql('create table "server_folder" ("server_id" bigint not null, "position" text not null default \'U\', constraint "server_folder_pkey" primary key ("server_id"));');

    this.addSql('create table "role" ("id" bigserial primary key, "created_at" timestamptz(0) not null, "name" text not null, "server_id" bigint not null, "is_default" boolean not null default false, "color" varchar(255) null, "permissions" text[] not null default \'{SendMessages}\');');

    this.addSql('create table "server_user" ("user_id" bigint not null, "server_id" bigint not null, "position" text not null default \'U\', "created_at" timestamptz(0) not null, "role_id" bigint not null, "status" text check ("status" in (\'None\', \'Joined\', \'Banned\')) not null default \'Joined\', constraint "server_user_pkey" primary key ("user_id", "server_id"));');

    this.addSql('create table "channel" ("id" bigserial primary key, "created_at" timestamptz(0) not null, "server_id" bigint not null, "position" text not null default \'U\');');

    this.addSql('create table "relationship" ("owner_id" bigint not null, "user_id" bigint not null, "created_at" timestamptz(0) not null, "show_chat" boolean not null default false, "status" text check ("status" in (\'None\', \'FriendRequestOutgoing\', \'FriendRequestIncoming\', \'Friends\', \'Blocking\', \'Blocked\')) not null default \'None\', "last_view_at" timestamptz(0) not null, "last_message_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "unread_count" int not null default 0, constraint "relationship_pkey" primary key ("owner_id", "user_id"));');

    this.addSql('create table "post" ("id" bigserial primary key, "created_at" timestamptz(0) not null, "title" text not null, "text" text null, "link_url" text null, "link_metadata" jsonb null, "link_metadatas" jsonb not null, "images" jsonb not null, "author_id" bigint not null, "is_pinned" boolean not null default false, "pinned_at" timestamptz(0) null, "server_id" bigint not null, "vote_count" int not null default 0, "comment_count" int not null default 0, "updated_at" timestamptz(0) null, "is_deleted" boolean not null default false);');

    this.addSql('create table "post_vote" ("user_id" bigint not null, "post_id" bigint not null, "created_at" timestamptz(0) not null, "type" text check ("type" in (\'Up\', \'None\', \'Down\')) not null default \'None\', constraint "post_vote_pkey" primary key ("user_id", "post_id"));');

    this.addSql('create table "folder_post" ("post_id" bigint not null, "added_at" timestamptz(0) not null, constraint "folder_post_pkey" primary key ("post_id"));');

    this.addSql('create table "comment" ("id" bigserial primary key, "created_at" timestamptz(0) not null, "post_id" bigint not null);');

    this.addSql('create table "group" ("id" bigserial primary key, "created_at" timestamptz(0) not null, "owner_id" bigint not null, "name" text not null, "avatar_url" text null, "last_message_at" timestamptz(0) not null);');

    this.addSql('create table "message" ("id" bigserial primary key, "created_at" timestamptz(0) not null, "author_id" bigint not null, "channel_id" bigint null, "group_id" bigint null, "to_user_id" bigint null, "text" text null, "images" jsonb not null, "file" jsonb null, "link_metadatas" jsonb not null, "is_everyone_mentioned" boolean not null default false, "is_pinned" boolean not null default false, "updated_at" timestamptz(0) null, "pinned_at" timestamptz(0) null, "is_deleted" boolean not null default false, "type" text check ("type" in (\'Normal\', \'Join\', \'Left\', \'FriendRequestReceived\', \'Initial\')) not null default \'Normal\');');

    this.addSql('create table "message_mentioned_users" ("message_id" bigint not null, "user_id" bigint not null, constraint "message_mentioned_users_pkey" primary key ("message_id", "user_id"));');

    this.addSql('create table "group_user" ("user_id" bigint not null, "group_id" bigint not null, "last_view_at" timestamptz(0) not null, "last_message_at" timestamptz(0) not null, "unread_count" int not null default 0, constraint "group_user_pkey" primary key ("user_id", "group_id"));');

    this.addSql('create table "group_users" ("group_id" bigint not null, "user_id" bigint not null, constraint "group_users_pkey" primary key ("group_id", "user_id"));');

    this.addSql('create table "folder" ("id" bigserial primary key, "created_at" timestamptz(0) not null, "name" text not null, "description" text null, "avatar_url" text null, "owner_id" bigint null, "is_deleted" boolean not null default false, "post_count" int not null default 0, "follower_count" int not null default 0, "is_collaborative" boolean not null default false, "visibility" text check ("visibility" in (\'Public\', \'Friends\', \'Private\', \'Unlisted\')) not null default \'Public\');');

    this.addSql('create table "user_folder" ("user_id" bigint not null, "position" text not null default \'U\', constraint "user_folder_pkey" primary key ("user_id"));');

    this.addSql('alter table "server" add constraint "server_owner_id_foreign" foreign key ("owner_id") references "user" ("id") on update cascade;');

    this.addSql('alter table "server_folder" add constraint "server_folder_server_id_foreign" foreign key ("server_id") references "server" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "role" add constraint "role_server_id_foreign" foreign key ("server_id") references "server" ("id") on update cascade;');

    this.addSql('alter table "server_user" add constraint "server_user_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;');
    this.addSql('alter table "server_user" add constraint "server_user_server_id_foreign" foreign key ("server_id") references "server" ("id") on update cascade;');
    this.addSql('alter table "server_user" add constraint "server_user_role_id_foreign" foreign key ("role_id") references "role" ("id") on update cascade;');

    this.addSql('alter table "channel" add constraint "channel_server_id_foreign" foreign key ("server_id") references "server" ("id") on update cascade;');

    this.addSql('alter table "relationship" add constraint "relationship_owner_id_foreign" foreign key ("owner_id") references "user" ("id") on update cascade;');
    this.addSql('alter table "relationship" add constraint "relationship_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;');

    this.addSql('alter table "post" add constraint "post_author_id_foreign" foreign key ("author_id") references "user" ("id") on update cascade;');
    this.addSql('alter table "post" add constraint "post_server_id_foreign" foreign key ("server_id") references "server" ("id") on update cascade;');

    this.addSql('alter table "post_vote" add constraint "post_vote_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;');
    this.addSql('alter table "post_vote" add constraint "post_vote_post_id_foreign" foreign key ("post_id") references "post" ("id") on update cascade;');

    this.addSql('alter table "folder_post" add constraint "folder_post_post_id_foreign" foreign key ("post_id") references "post" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "comment" add constraint "comment_post_id_foreign" foreign key ("post_id") references "post" ("id") on update cascade;');

    this.addSql('alter table "group" add constraint "group_owner_id_foreign" foreign key ("owner_id") references "user" ("id") on update cascade;');

    this.addSql('alter table "message" add constraint "message_author_id_foreign" foreign key ("author_id") references "user" ("id") on update cascade;');
    this.addSql('alter table "message" add constraint "message_channel_id_foreign" foreign key ("channel_id") references "channel" ("id") on update cascade on delete set null;');
    this.addSql('alter table "message" add constraint "message_group_id_foreign" foreign key ("group_id") references "group" ("id") on update cascade on delete set null;');
    this.addSql('alter table "message" add constraint "message_to_user_id_foreign" foreign key ("to_user_id") references "user" ("id") on update cascade on delete set null;');

    this.addSql('alter table "message_mentioned_users" add constraint "message_mentioned_users_message_id_foreign" foreign key ("message_id") references "message" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "message_mentioned_users" add constraint "message_mentioned_users_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "group_user" add constraint "group_user_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;');
    this.addSql('alter table "group_user" add constraint "group_user_group_id_foreign" foreign key ("group_id") references "group" ("id") on update cascade;');

    this.addSql('alter table "group_users" add constraint "group_users_group_id_foreign" foreign key ("group_id") references "group" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "group_users" add constraint "group_users_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "folder" add constraint "folder_owner_id_foreign" foreign key ("owner_id") references "user" ("id") on update cascade on delete set null;');

    this.addSql('alter table "user_folder" add constraint "user_folder_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade on delete cascade;');
  }

}