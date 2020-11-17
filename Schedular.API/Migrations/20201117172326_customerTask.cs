using Microsoft.EntityFrameworkCore.Migrations;

namespace Schedular.API.Migrations
{
    public partial class customerTask : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CustomerId",
                table: "TaskSchedules");

            migrationBuilder.AddColumn<int>(
                name: "customerIdId",
                table: "TaskSchedules",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_TaskSchedules_customerIdId",
                table: "TaskSchedules",
                column: "customerIdId");

            migrationBuilder.AddForeignKey(
                name: "FK_TaskSchedules_Customers_customerIdId",
                table: "TaskSchedules",
                column: "customerIdId",
                principalTable: "Customers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TaskSchedules_Customers_customerIdId",
                table: "TaskSchedules");

            migrationBuilder.DropIndex(
                name: "IX_TaskSchedules_customerIdId",
                table: "TaskSchedules");

            migrationBuilder.DropColumn(
                name: "customerIdId",
                table: "TaskSchedules");

            migrationBuilder.AddColumn<int>(
                name: "CustomerId",
                table: "TaskSchedules",
                type: "int",
                nullable: true);
        }
    }
}
