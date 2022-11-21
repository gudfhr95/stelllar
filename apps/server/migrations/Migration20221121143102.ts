import { Migration } from '@mikro-orm/migrations';

export class Migration20221121143102 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "user" ("id" varchar(255) not null, "created_at" timestamptz(0) null default \'now\', "name" text not null, "email" text not null, "email_verified" timestamptz(0) null, "image" varchar(255) null, "last_login_at" timestamptz(0) null, "is_admin" boolean not null default false, "is_deleted" boolean not null default false, constraint "user_pkey" primary key ("id"));');
    this.addSql('alter table "user" add constraint "user_email_unique" unique ("email");');

    this.addSql('create table "session" ("id" varchar(255) not null, "user_id" varchar(255) not null, "expires" timestamptz(0) not null, "session_token" varchar(255) not null, constraint "session_pkey" primary key ("id"));');
    this.addSql('alter table "session" add constraint "session_session_token_unique" unique ("session_token");');

    this.addSql('create table "server" ("id" varchar(255) not null, "created_at" timestamptz(0) not null, "name" text not null, "display_name" text not null, "description" text null, "owner_id" varchar(255) not null, "category" text check ("category" in (\'Arts\', \'Business\', \'Culture\', \'Discussion\', \'Entertainment\', \'Gaming\', \'Health\', \'Hobbies\', \'Lifestyle\', \'Memes\', \'Meta\', \'News\', \'Politics\', \'Programming\', \'Science\', \'Sports\', \'Technology\', \'Other\')) not null default \'Other\', "user_count" int not null default 0, "avatar_url" text null, "banner_url" text null, "is_deleted" boolean not null default false, constraint "server_pkey" primary key ("id"));');

    this.addSql('create table "server_user" ("user_id" varchar(255) not null, "server_id" varchar(255) not null, "position" text not null default \'U\', "created_at" timestamptz(0) not null, "status" text check ("status" in (\'None\', \'Joined\', \'Banned\')) not null default \'Joined\', constraint "server_user_pkey" primary key ("user_id", "server_id"));');

    this.addSql('create table "post" ("id" varchar(255) not null, "created_at" timestamptz(0) not null, "title" text not null, "text" text null, "link_url" text null, "link_metadata" jsonb null, "link_metadatas" jsonb not null, "images" jsonb not null, "author_id" varchar(255) not null, "server_id" varchar(255) not null, "vote_count" int not null default 0, "comment_count" int not null default 0, "updated_at" timestamptz(0) null, "is_deleted" boolean not null default false, constraint "post_pkey" primary key ("id"));');

    this.addSql('create table "post_vote" ("user_id" varchar(255) not null, "post_id" varchar(255) not null, "created_at" timestamptz(0) not null, "type" text check ("type" in (\'Up\', \'None\', \'Down\')) not null default \'None\', constraint "post_vote_pkey" primary key ("user_id", "post_id"));');

    this.addSql('create table "comment" ("id" varchar(255) not null, "created_at" timestamptz(0) not null, "author_id" varchar(255) not null, "post_id" varchar(255) not null, "text" text not null, "parent_comment_id" varchar(255) null, "vote_count" int not null default 0, "updated_at" timestamptz(0) null, "is_deleted" boolean not null default false, constraint "comment_pkey" primary key ("id"));');

    this.addSql('create table "comment_vote" ("user_id" varchar(255) not null, "comment_id" varchar(255) not null, "created_at" timestamptz(0) not null, "type" text check ("type" in (\'Up\', \'None\', \'Down\')) not null default \'None\', constraint "comment_vote_pkey" primary key ("user_id", "comment_id"));');

    this.addSql('create table "account" ("id" varchar(255) not null, "user_id" varchar(255) not null, "type" varchar(255) not null, "provider" varchar(255) not null, "provider_account_id" varchar(255) not null, "refresh_token" varchar(255) null, "access_token" varchar(255) null, "expires_at" int null, "token_type" varchar(255) null, "scope" varchar(255) null, "id_token" text null, "session_state" varchar(255) null, constraint "account_pkey" primary key ("id"));');
    this.addSql('alter table "account" add constraint "account_provider_provider_account_id_unique" unique ("provider", "provider_account_id");');

    this.addSql('alter table "session" add constraint "session_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "server" add constraint "server_owner_id_foreign" foreign key ("owner_id") references "user" ("id") on update cascade;');

    this.addSql('alter table "server_user" add constraint "server_user_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;');
    this.addSql('alter table "server_user" add constraint "server_user_server_id_foreign" foreign key ("server_id") references "server" ("id") on update cascade;');

    this.addSql('alter table "post" add constraint "post_author_id_foreign" foreign key ("author_id") references "user" ("id") on update cascade;');
    this.addSql('alter table "post" add constraint "post_server_id_foreign" foreign key ("server_id") references "server" ("id") on update cascade;');

    this.addSql('alter table "post_vote" add constraint "post_vote_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;');
    this.addSql('alter table "post_vote" add constraint "post_vote_post_id_foreign" foreign key ("post_id") references "post" ("id") on update cascade;');

    this.addSql('alter table "comment" add constraint "comment_author_id_foreign" foreign key ("author_id") references "user" ("id") on update cascade;');
    this.addSql('alter table "comment" add constraint "comment_post_id_foreign" foreign key ("post_id") references "post" ("id") on update cascade;');
    this.addSql('alter table "comment" add constraint "comment_parent_comment_id_foreign" foreign key ("parent_comment_id") references "comment" ("id") on update cascade on delete set null;');

    this.addSql('alter table "comment_vote" add constraint "comment_vote_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;');
    this.addSql('alter table "comment_vote" add constraint "comment_vote_comment_id_foreign" foreign key ("comment_id") references "comment" ("id") on update cascade;');

    this.addSql('alter table "account" add constraint "account_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade on delete cascade;');
  }

}
