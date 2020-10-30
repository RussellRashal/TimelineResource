using Microsoft.EntityFrameworkCore.Migrations;

namespace Schedular.API.Migrations
{
    public partial class attachmentsTableTaskSch : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Attachments_TaskScheduleId",
                table: "Attachments",
                column: "TaskScheduleId");

            migrationBuilder.AddForeignKey(
                name: "FK_Attachments_TaskSchedules_TaskScheduleId",
                table: "Attachments",
                column: "TaskScheduleId",
                principalTable: "TaskSchedules",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Attachments_TaskSchedules_TaskScheduleId",
                table: "Attachments");

            migrationBuilder.DropIndex(
                name: "IX_Attachments_TaskScheduleId",
                table: "Attachments");
        }
    }
}
