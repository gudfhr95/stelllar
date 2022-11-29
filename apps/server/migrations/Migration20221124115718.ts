import { Migration } from "@mikro-orm/migrations";

export class Migration20221124115718 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'alter table "server" add column "post_count" int not null default 0;'
    );
    this.addSql(
      "update server set post_count = (select count(*) from post where server_id=server.id and is_deleted=false)"
    );
  }

  async down(): Promise<void> {
    this.addSql('alter table "server" drop column "post_count";');
  }
}
