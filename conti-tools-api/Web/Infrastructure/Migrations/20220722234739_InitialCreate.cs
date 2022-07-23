using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "FileUploads",
                columns: table => new
                {
                    FileUploadId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CommentIdentifier = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FileName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FileData = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DateUploaded = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FileUploads", x => x.FileUploadId);
                });

            migrationBuilder.CreateTable(
                name: "Todos",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Body = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsDone = table.Column<bool>(type: "bit", nullable: false),
                    CreatedAt = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false),
                    UpdatedAt = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false),
                    CreatedBy = table.Column<int>(type: "int", nullable: false),
                    UpdatedBy = table.Column<int>(type: "int", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Todos", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ReportRecords",
                columns: table => new
                {
                    ReportRecordId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FileUploadId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    SalesDoc = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PODate = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PurchaseOrderNo = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Item = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Plant = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    MaterialDescription = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    MaterialNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    QtyOutst = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CustomerInfo = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Reqdlvdt = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SchedLnDate = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DaysLate = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FifoQtyOnHand = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ActualQtyOnHand = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CustomerStock = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    OutstValue = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Comments = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ReportRecords", x => x.ReportRecordId);
                    table.ForeignKey(
                        name: "FK_ReportRecords_FileUploads_FileUploadId",
                        column: x => x.FileUploadId,
                        principalTable: "FileUploads",
                        principalColumn: "FileUploadId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ReportRecords_FileUploadId",
                table: "ReportRecords",
                column: "FileUploadId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ReportRecords");

            migrationBuilder.DropTable(
                name: "Todos");

            migrationBuilder.DropTable(
                name: "FileUploads");
        }
    }
}
