import { Migration } from '@mikro-orm/migrations';

export class Migration20221102091244 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "user" add column "is_og" boolean not null default false, add column "is_staff" boolean not null default false;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "user" drop column "is_og";');
    this.addSql('alter table "user" drop column "is_staff";');
  }

}
