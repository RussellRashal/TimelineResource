using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Schedular.API.Migrations
{
    public partial class seedTaskScheduleData : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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

        protected override void Down(MigrationBuilder migrationBuilder)
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
        }
    }
}
