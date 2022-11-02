import { Migration } from '@mikro-orm/migrations';

export class Migration20221102110539 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "relationship" add column "status" text check ("status" in (\'None\', \'FriendRequestOutgoing\', \'FriendRequestIncoming\', \'Friends\', \'Blocking\', \'Blocked\')) not null default \'None\';');
  }

  async down(): Promise<void> {
    this.addSql('alter table "relationship" drop column "status";');
  }

}
