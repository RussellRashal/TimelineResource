using Microsoft.EntityFrameworkCore.Migrations;

namespace Schedular.API.Migrations
{
    public partial class cusotmerIDTaskScheduleTbl : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CustomerId",
                table: "TaskSchedules",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_TaskSchedules_CustomerId",
                table: "TaskSchedules",
                column: "CustomerId");

            migrationBuilder.AddForeignKey(
                name: "FK_TaskSchedules_Customers_CustomerId",
                table: "TaskSchedules",
                column: "CustomerId",
                principalTable: "Customers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TaskSchedules_Customers_CustomerId",
                table: "TaskSchedules");

            migrationBuilder.DropIndex(
                name: "IX_TaskSchedules_CustomerId",
                table: "TaskSchedules");

            migrationBuilder.DropColumn(
                name: "CustomerId",
                table: "TaskSchedules");
        }
    }
}
