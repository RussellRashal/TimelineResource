using Microsoft.EntityFrameworkCore.Migrations;

namespace Schedular.API.Migrations
{
    public partial class updateTAskScheduleUserIdNamev2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TaskSchedules_AspNetUsers_userId",
                table: "TaskSchedules");

            migrationBuilder.DropIndex(
                name: "IX_TaskSchedules_userId",
                table: "TaskSchedules");

            migrationBuilder.DropColumn(
                name: "userId",
                table: "TaskSchedules");

            migrationBuilder.CreateIndex(
                name: "IX_TaskSchedules_userCurrentAssignedId",
                table: "TaskSchedules",
                column: "userCurrentAssignedId");

            migrationBuilder.AddForeignKey(
                name: "FK_TaskSchedules_AspNetUsers_userCurrentAssignedId",
                table: "TaskSchedules",
                column: "userCurrentAssignedId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TaskSchedules_AspNetUsers_userCurrentAssignedId",
                table: "TaskSchedules");

            migrationBuilder.DropIndex(
                name: "IX_TaskSchedules_userCurrentAssignedId",
                table: "TaskSchedules");

            migrationBuilder.AddColumn<int>(
                name: "userId",
                table: "TaskSchedules",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_TaskSchedules_userId",
                table: "TaskSchedules",
                column: "userId");

            migrationBuilder.AddForeignKey(
                name: "FK_TaskSchedules_AspNetUsers_userId",
                table: "TaskSchedules",
                column: "userId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
