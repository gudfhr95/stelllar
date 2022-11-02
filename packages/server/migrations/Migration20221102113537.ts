import { Migration } from '@mikro-orm/migrations';

export class Migration20221102113537 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "folder" add column "visibility" text check ("visibility" in (\'Public\', \'Friends\', \'Private\', \'Unlisted\')) not null default \'Public\';');
  }

  async down(): Promise<void> {
    this.addSql('alter table "folder" drop column "visibility";');
  }

}
