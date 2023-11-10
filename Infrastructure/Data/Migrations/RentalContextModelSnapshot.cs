﻿// <auto-generated />
using System;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace Infrastructure.Data.Migrations
{
    [DbContext(typeof(RentalContext))]
    partial class RentalContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "7.0.13");

            modelBuilder.Entity("Core.Entities.Brand", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("BrandName")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Brands");
                });

            modelBuilder.Entity("Core.Entities.Customer", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Address")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("CustomerName")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("TEXT");

                    b.Property<string>("DriverLicense")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasMaxLength(70)
                        .HasColumnType("TEXT");

                    b.Property<string>("Phone")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Customers");
                });

            modelBuilder.Entity("Core.Entities.Fuel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("FuelName")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Fuels");
                });

            modelBuilder.Entity("Core.Entities.Insurance", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("InsuranceName")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<double>("InsurancePrice")
                        .HasColumnType("decimal(18,2)");

                    b.HasKey("Id");

                    b.ToTable("Insurances");
                });

            modelBuilder.Entity("Core.Entities.Invoice", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("CustomerId")
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("Date")
                        .HasColumnType("TEXT");

                    b.Property<string>("PaymentType")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int>("ReservationId")
                        .HasColumnType("INTEGER");

                    b.Property<double>("TotalAmount")
                        .HasColumnType("REAL");

                    b.HasKey("Id");

                    b.HasIndex("CustomerId");

                    b.HasIndex("ReservationId");

                    b.ToTable("Invoices");
                });

            modelBuilder.Entity("Core.Entities.Model", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("BrandId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("ModelName")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("BrandId");

                    b.ToTable("Models");
                });

            modelBuilder.Entity("Core.Entities.Reservation", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("CustomerId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("Days")
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("EndDate")
                        .HasColumnType("TEXT");

                    b.Property<int>("InsuranceId")
                        .HasColumnType("INTEGER");

                    b.Property<double>("RentalCost")
                        .HasColumnType("decimal(18,2)");

                    b.Property<DateTime>("StartDate")
                        .HasColumnType("TEXT");

                    b.Property<int>("VehicleId")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.HasIndex("CustomerId");

                    b.HasIndex("InsuranceId");

                    b.HasIndex("VehicleId");

                    b.ToTable("Reservations");
                });

            modelBuilder.Entity("Core.Entities.Status", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("StatusName")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Statuses");
                });

            modelBuilder.Entity("Core.Entities.Vehicle", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("BrandId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Color")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int>("Doors")
                        .HasColumnType("INTEGER");

                    b.Property<int>("FuelConsumption")
                        .HasColumnType("INTEGER");

                    b.Property<int>("FuelId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("ModelId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("Passengers")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Picture")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<double>("RentalPrice")
                        .HasColumnType("decimal(18,2)");

                    b.Property<int>("StatusId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Transmission")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("VehicleName")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("TEXT");

                    b.Property<int>("VehicleTypeId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Vin")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int>("Year")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.HasIndex("BrandId");

                    b.HasIndex("FuelId");

                    b.HasIndex("ModelId");

                    b.HasIndex("StatusId");

                    b.HasIndex("VehicleTypeId");

                    b.ToTable("Vehicles");
                });

            modelBuilder.Entity("Core.Entities.VehicleType", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("VehicleTypeName")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("VehicleTypes");
                });

            modelBuilder.Entity("Core.Entities.Invoice", b =>
                {
                    b.HasOne("Core.Entities.Customer", "Customer")
                        .WithMany("Invoices")
                        .HasForeignKey("CustomerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Core.Entities.Reservation", "Reservation")
                        .WithMany("Invoices")
                        .HasForeignKey("ReservationId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Customer");

                    b.Navigation("Reservation");
                });

            modelBuilder.Entity("Core.Entities.Model", b =>
                {
                    b.HasOne("Core.Entities.Brand", "Brand")
                        .WithMany("Models")
                        .HasForeignKey("BrandId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Brand");
                });

            modelBuilder.Entity("Core.Entities.Reservation", b =>
                {
                    b.HasOne("Core.Entities.Customer", "Customer")
                        .WithMany("Reservations")
                        .HasForeignKey("CustomerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Core.Entities.Insurance", "Insurance")
                        .WithMany("Reservations")
                        .HasForeignKey("InsuranceId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Core.Entities.Vehicle", "Vehicle")
                        .WithMany("Reservations")
                        .HasForeignKey("VehicleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Customer");

                    b.Navigation("Insurance");

                    b.Navigation("Vehicle");
                });

            modelBuilder.Entity("Core.Entities.Vehicle", b =>
                {
                    b.HasOne("Core.Entities.Brand", "Brand")
                        .WithMany("Vehicles")
                        .HasForeignKey("BrandId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Core.Entities.Fuel", "Fuel")
                        .WithMany("Vehicles")
                        .HasForeignKey("FuelId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Core.Entities.Model", "Model")
                        .WithMany("Vehicles")
                        .HasForeignKey("ModelId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Core.Entities.Status", "Status")
                        .WithMany("Vehicles")
                        .HasForeignKey("StatusId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Core.Entities.VehicleType", "VehicleType")
                        .WithMany("Vehicles")
                        .HasForeignKey("VehicleTypeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Brand");

                    b.Navigation("Fuel");

                    b.Navigation("Model");

                    b.Navigation("Status");

                    b.Navigation("VehicleType");
                });

            modelBuilder.Entity("Core.Entities.Brand", b =>
                {
                    b.Navigation("Models");

                    b.Navigation("Vehicles");
                });

            modelBuilder.Entity("Core.Entities.Customer", b =>
                {
                    b.Navigation("Invoices");

                    b.Navigation("Reservations");
                });

            modelBuilder.Entity("Core.Entities.Fuel", b =>
                {
                    b.Navigation("Vehicles");
                });

            modelBuilder.Entity("Core.Entities.Insurance", b =>
                {
                    b.Navigation("Reservations");
                });

            modelBuilder.Entity("Core.Entities.Model", b =>
                {
                    b.Navigation("Vehicles");
                });

            modelBuilder.Entity("Core.Entities.Reservation", b =>
                {
                    b.Navigation("Invoices");
                });

            modelBuilder.Entity("Core.Entities.Status", b =>
                {
                    b.Navigation("Vehicles");
                });

            modelBuilder.Entity("Core.Entities.Vehicle", b =>
                {
                    b.Navigation("Reservations");
                });

            modelBuilder.Entity("Core.Entities.VehicleType", b =>
                {
                    b.Navigation("Vehicles");
                });
#pragma warning restore 612, 618
        }
    }
}
