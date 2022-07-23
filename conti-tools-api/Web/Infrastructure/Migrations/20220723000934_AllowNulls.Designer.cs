﻿// <auto-generated />
using System;
using Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace Infrastructure.Migrations
{
    [DbContext(typeof(ContinentalToolsDbContext))]
    [Migration("20220723000934_AllowNulls")]
    partial class AllowNulls
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.3")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("Domain.Entities.FileUpload", b =>
                {
                    b.Property<Guid>("FileUploadId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("CommentIdentifier")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("DateUploaded")
                        .HasColumnType("datetime2");

                    b.Property<string>("FileData")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FileName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("FileUploadId");

                    b.ToTable("FileUploads");
                });

            modelBuilder.Entity("Domain.Entities.ReportRecord", b =>
                {
                    b.Property<int>("ReportRecordId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ReportRecordId"), 1L, 1);

                    b.Property<string>("ActualQtyOnHand")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Comments")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("CustomerInfo")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("CustomerStock")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("DaysLate")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FifoQtyOnHand")
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid>("FileUploadId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Item")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("MaterialDescription")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("MaterialNumber")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("OutstValue")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PODate")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Plant")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PurchaseOrderNo")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("QtyOutst")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Reqdlvdt")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("SalesDoc")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("SchedLnDate")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("ReportRecordId");

                    b.HasIndex("FileUploadId");

                    b.ToTable("ReportRecords");
                });

            modelBuilder.Entity("Domain.Entities.Todo", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("Body")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTimeOffset>("CreatedAt")
                        .HasColumnType("datetimeoffset");

                    b.Property<int>("CreatedBy")
                        .HasColumnType("int");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("bit");

                    b.Property<bool>("IsDone")
                        .HasColumnType("bit");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTimeOffset>("UpdatedAt")
                        .HasColumnType("datetimeoffset");

                    b.Property<int>("UpdatedBy")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("Todos");
                });

            modelBuilder.Entity("Domain.Entities.ReportRecord", b =>
                {
                    b.HasOne("Domain.Entities.FileUpload", null)
                        .WithMany("ReportRecords")
                        .HasForeignKey("FileUploadId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Domain.Entities.FileUpload", b =>
                {
                    b.Navigation("ReportRecords");
                });
#pragma warning restore 612, 618
        }
    }
}
