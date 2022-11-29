import { Migration } from '@mikro-orm/migrations';

export class Migration20221129080217 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "post" drop column "link_metadatas";');
  }

  async down(): Promise<void> {
    this.addSql('alter table "post" add column "link_metadatas" jsonb not null;');
  }

}
