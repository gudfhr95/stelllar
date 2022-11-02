import { Migration } from '@mikro-orm/migrations';

export class Migration20221102112037 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "user" add column "color" text check ("color" in (\'Red\', \'Yellow\', \'Green\', \'Blue\', \'Indigo\', \'Purple\', \'Pink\')) not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "user" drop column "color";');
  }

}
