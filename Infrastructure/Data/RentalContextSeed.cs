using System.Reflection;
using System.Text.Json;
using Core.Entities;

namespace Infrastructure.Data
{
    public class RentalContextSeed
    {
        public static async Task SeedAsync(RentalContext context)
        {

            var path = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location);
            // 1
            if (!context.Brands.Any())
            {
                var brandsData = File.ReadAllText(path + @"/Data/SeedData/brand.json");
                var brand = JsonSerializer.Deserialize<List<Brand>>(brandsData);

                context.Brands.AddRange(brand);
            }
            // 2
            if (!context.Customers.Any())
            {
                var customerData = File.ReadAllText(path + @"/Data/SeedData/customer.json");
                var customer = JsonSerializer.Deserialize<List<Customer>>(customerData);

                context.Customers.AddRange(customer);
            }
            // 3
            if (!context.Fuels.Any())
            {
                var fuelData = File.ReadAllText(path + @"/Data/SeedData/fuel.json");
                var fuel = JsonSerializer.Deserialize<List<Fuel>>(fuelData);

                context.Fuels.AddRange(fuel);
            }
            // 4
            if (!context.Insurances.Any())
            {
                var insuranceData = File.ReadAllText(path + @"/Data/SeedData/insurance.json");
                var insurance = JsonSerializer.Deserialize<List<Insurance>>(insuranceData);

                context.Insurances.AddRange(insurance);
            }
            // 5
            if (!context.Invoices.Any())
            {
                var invoiceData = File.ReadAllText(path + @"/Data/SeedData/invoice.json");
                var invoice = JsonSerializer.Deserialize<List<Invoice>>(invoiceData);

                context.Invoices.AddRange(invoice);
            }

            if (!context.Models.Any())
            {
                var modelData = File.ReadAllText(path + @"/Data/SeedData/model.json");
                var model = JsonSerializer.Deserialize<List<Model>>(modelData);

                context.Models.AddRange(model);
            }
            // 6
            if (!context.Reservations.Any())
            {
                var reservationData = File.ReadAllText(path + @"/Data/SeedData/reservation.json");
                var reservation = JsonSerializer.Deserialize<List<Reservation>>(reservationData);

                context.Reservations.AddRange(reservation);
            }
            // 7
            if (!context.Statuses.Any())
            {
                var statusData = File.ReadAllText(path + @"/Data/SeedData/status.json");
                var status = JsonSerializer.Deserialize<List<Status>>(statusData);

                context.Statuses.AddRange(status);
            }
            // 8
            if (!context.VehicleTypes.Any())
            {
                var vehicleTypeData = File.ReadAllText(path + @"/Data/SeedData/vehicletype.json");
                var vehicleType = JsonSerializer.Deserialize<List<VehicleType>>(vehicleTypeData);

                context.VehicleTypes.AddRange(vehicleType);
            }
            // 9
            if (!context.Vehicles.Any())
            {

                var vehiclesData = File.ReadAllText(path + @"/Data/SeedData/vehicle.json");
                var vehicles = JsonSerializer.Deserialize<List<VehicleSeedModel>>(vehiclesData);

                foreach (var item in vehicles)
                {
                    var pictureFileName = item.PictureUrl.Substring(16);
                    var vehicle = new Vehicle
                    {
                        Id = item.Id,
                        VehicleName = item.VehicleName,
                        Year = item.Year,
                        Vin = item.Vin,
                        Passengers = item.Passengers,
                        Transmission = item.Transmission,
                        Doors = item.Doors,
                        Color = item.Color,
                        RentalPrice = item.RentalPrice,
                        FuelConsumption = item.FuelConsumption,
                        FuelId = item.FuelId,
                        BrandId = item.BrandId,
                        ModelId = item.ModelId,
                        StatusId = item.StatusId,
                        VehicleTypeId = item.VehicleTypeId,
                    };
                    vehicle.AddPhoto(item.PictureUrl, pictureFileName);
                    context.Vehicles.Add(vehicle);
                }
                await context.SaveChangesAsync();
            }

            if (context.ChangeTracker.HasChanges()) await context.SaveChangesAsync();
        }
    }
}