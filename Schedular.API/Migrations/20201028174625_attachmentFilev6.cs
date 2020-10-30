using Microsoft.EntityFrameworkCore.Migrations;

namespace Schedular.API.Migrations
{
    public partial class attachmentFilev6 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
                migrationBuilder.DropColumn(
                                name: "UserId",
                                table: "AttachmentFiles");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
