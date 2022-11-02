import { Migration } from '@mikro-orm/migrations';

export class Migration20221102154532 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "post_vote" drop constraint "post_vote_post_id_foreign";');

    this.addSql('alter table "post_vote" add column "user_id" bigint not null, add column "created_at" timestamptz(0) not null, add column "type" text check ("type" in (\'Up\', \'None\', \'Down\')) not null default \'None\';');
    this.addSql('alter table "post_vote" drop constraint "post_vote_pkey";');
    this.addSql('alter table "post_vote" add constraint "post_vote_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;');
    this.addSql('alter table "post_vote" add constraint "post_vote_post_id_foreign" foreign key ("post_id") references "post" ("id") on update cascade;');
    this.addSql('alter table "post_vote" add constraint "post_vote_pkey" primary key ("user_id", "post_id");');
  }

  async down(): Promise<void> {
    this.addSql('alter table "post_vote" drop constraint "post_vote_user_id_foreign";');
    this.addSql('alter table "post_vote" drop constraint "post_vote_post_id_foreign";');

    this.addSql('alter table "post_vote" drop constraint "post_vote_pkey";');
    this.addSql('alter table "post_vote" drop column "user_id";');
    this.addSql('alter table "post_vote" drop column "created_at";');
    this.addSql('alter table "post_vote" drop column "type";');
    this.addSql('alter table "post_vote" add constraint "post_vote_post_id_foreign" foreign key ("post_id") references "post" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "post_vote" add constraint "post_vote_pkey" primary key ("post_id");');
  }

}
