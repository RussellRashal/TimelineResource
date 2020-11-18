using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Schedular.API.Migrations
{
    public partial class closedDateTaskSchedulev2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "closedDate",
                table: "TaskSchedules");

            migrationBuilder.AddColumn<DateTime>(
                name: "userLastEditDate",
                table: "TaskSchedules",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "userLastEditDate",
                table: "TaskSchedules");

            migrationBuilder.AddColumn<DateTime>(
                name: "closedDate",
                table: "TaskSchedules",
                type: "datetime(6)",
                nullable: true);
        }
    }
}
