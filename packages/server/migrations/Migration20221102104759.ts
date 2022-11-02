import { Migration } from '@mikro-orm/migrations';

export class Migration20221102104759 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "user" add column "online_status" text check ("online_status" in (\'Online\', \'Away\', \'DoNotDisturb\', \'Offline\')) not null default \'Online\';');
  }

  async down(): Promise<void> {
    this.addSql('alter table "user" drop column "online_status";');
  }

}
