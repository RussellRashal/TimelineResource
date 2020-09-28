using Microsoft.EntityFrameworkCore.Migrations;

namespace Schedular.API.Migrations
{
    public partial class updateTaskScheduleUserIdName : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TaskSchedules_AspNetUsers_userId",
                table: "TaskSchedules");

            migrationBuilder.AlterColumn<int>(
                name: "userId",
                table: "TaskSchedules",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<int>(
                name: "userCurrentAssignedId",
                table: "TaskSchedules",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddForeignKey(
                name: "FK_TaskSchedules_AspNetUsers_userId",
                table: "TaskSchedules",
                column: "userId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TaskSchedules_AspNetUsers_userId",
                table: "TaskSchedules");

            migrationBuilder.DropColumn(
                name: "userCurrentAssignedId",
                table: "TaskSchedules");

            migrationBuilder.AlterColumn<int>(
                name: "userId",
                table: "TaskSchedules",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_TaskSchedules_AspNetUsers_userId",
                table: "TaskSchedules",
                column: "userId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
