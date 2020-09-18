using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Schedular.API.Migrations
{
    public partial class notesTableAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "TaskSchedules",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "TaskSchedules",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "TaskSchedules",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "TaskSchedules",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "TaskSchedules",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "TaskSchedules",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "TaskSchedules",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "TaskSchedules",
                keyColumn: "Id",
                keyValue: 8);

            migrationBuilder.CreateTable(
                name: "Notes",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    NotesInfo = table.Column<string>(nullable: true),
                    taskScheduleId = table.Column<int>(nullable: true),
                    taskId = table.Column<int>(nullable: false),
                    userId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Notes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Notes_TaskSchedules_taskScheduleId",
                        column: x => x.taskScheduleId,
                        principalTable: "TaskSchedules",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Notes_AspNetUsers_userId",
                        column: x => x.userId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Notes_taskScheduleId",
                table: "Notes",
                column: "taskScheduleId");

            migrationBuilder.CreateIndex(
                name: "IX_Notes_userId",
                table: "Notes",
                column: "userId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Notes");

            migrationBuilder.InsertData(
                table: "TaskSchedules",
                columns: new[] { "Id", "End", "Start", "Title", "userId" },
                values: new object[,]
                {
                    { 1, new DateTime(2020, 9, 14, 14, 45, 0, 0, DateTimeKind.Unspecified), new DateTime(2020, 9, 14, 12, 12, 0, 0, DateTimeKind.Unspecified), "create this to achieve that", 1 },
                    { 2, new DateTime(2020, 9, 14, 17, 30, 0, 0, DateTimeKind.Unspecified), new DateTime(2020, 9, 14, 12, 0, 0, 0, DateTimeKind.Unspecified), "Antoher task to do", 2 },
                    { 3, new DateTime(2020, 9, 15, 16, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(2020, 9, 15, 11, 14, 0, 0, DateTimeKind.Unspecified), "collection of objects", 3 },
                    { 4, new DateTime(2020, 9, 16, 15, 30, 0, 0, DateTimeKind.Unspecified), new DateTime(2020, 9, 16, 10, 30, 0, 0, DateTimeKind.Unspecified), "removal needed to clear", 1 },
                    { 5, new DateTime(2020, 9, 16, 15, 36, 0, 0, DateTimeKind.Unspecified), new DateTime(2020, 9, 16, 12, 12, 0, 0, DateTimeKind.Unspecified), "create documentation needed", 2 },
                    { 6, new DateTime(2020, 9, 18, 15, 30, 0, 0, DateTimeKind.Unspecified), new DateTime(2020, 9, 18, 11, 30, 0, 0, DateTimeKind.Unspecified), "setup equipment for the day", 3 },
                    { 7, new DateTime(2020, 9, 15, 18, 30, 0, 0, DateTimeKind.Unspecified), new DateTime(2020, 9, 15, 15, 30, 0, 0, DateTimeKind.Unspecified), "speak to other customers in regards to", 1 },
                    { 8, new DateTime(2020, 9, 15, 18, 30, 0, 0, DateTimeKind.Unspecified), new DateTime(2020, 9, 12, 15, 30, 0, 0, DateTimeKind.Unspecified), "allow for time to be selected within", 2 }
                });
        }
    }
}
