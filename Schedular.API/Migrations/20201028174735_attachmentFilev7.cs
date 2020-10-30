using Microsoft.EntityFrameworkCore.Migrations;

namespace Schedular.API.Migrations
{
    public partial class attachmentFilev7 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "AttachmentFiles",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_AttachmentFiles_UserId",
                table: "AttachmentFiles",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_AttachmentFiles_AspNetUsers_UserId",
                table: "AttachmentFiles",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AttachmentFiles_AspNetUsers_UserId",
                table: "AttachmentFiles");

            migrationBuilder.DropIndex(
                name: "IX_AttachmentFiles_UserId",
                table: "AttachmentFiles");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "AttachmentFiles");
        }
    }
}
