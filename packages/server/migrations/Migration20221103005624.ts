import { Migration } from '@mikro-orm/migrations';

export class Migration20221103005624 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "comment_vote" drop constraint "comment_vote_comment_id_foreign";');

    this.addSql('alter table "role" alter column "permissions" type text[] using ("permissions"::text[]);');

    this.addSql('alter table "comment_vote" add column "user_id" bigint not null, add column "created_at" timestamptz(0) not null, add column "type" text check ("type" in (\'Up\', \'None\', \'Down\')) not null default \'None\';');
    this.addSql('alter table "comment_vote" drop constraint "comment_vote_pkey";');
    this.addSql('alter table "comment_vote" add constraint "comment_vote_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;');
    this.addSql('alter table "comment_vote" add constraint "comment_vote_comment_id_foreign" foreign key ("comment_id") references "comment" ("id") on update cascade;');
    this.addSql('alter table "comment_vote" add constraint "comment_vote_pkey" primary key ("user_id", "comment_id");');
  }

  async down(): Promise<void> {
    this.addSql('alter table "comment_vote" drop constraint "comment_vote_user_id_foreign";');
    this.addSql('alter table "comment_vote" drop constraint "comment_vote_comment_id_foreign";');

    this.addSql('alter table "comment_vote" drop constraint "comment_vote_pkey";');
    this.addSql('alter table "comment_vote" drop column "user_id";');
    this.addSql('alter table "comment_vote" drop column "created_at";');
    this.addSql('alter table "comment_vote" drop column "type";');
    this.addSql('alter table "comment_vote" add constraint "comment_vote_comment_id_foreign" foreign key ("comment_id") references "comment" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "comment_vote" add constraint "comment_vote_pkey" primary key ("comment_id");');

    this.addSql('alter table "role" alter column "permissions" type text[] using ("permissions"::text[]);');
  }

}
