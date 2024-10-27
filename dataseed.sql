-- SQLite
-- Insertar datos para Brand
INSERT INTO Brands (Id, BrandName) VALUES
(1, 'Toyota'),
(2, 'Honda'),
(3, 'Ford'),
(4, 'BMW');

-- Insertar datos para Fuel
INSERT INTO Fuels (Id, FuelName) VALUES
(1, 'Petrol'),
(2, 'Diesel'),
(3, 'Electric'),
(4, 'Hybrid');

-- Insertar datos para Insurance
INSERT INTO Insurances (Id, InsuranceName, InsurancePrice) VALUES
(1, 'Basic Coverage', 300.00),
(2, 'Comprehensive Coverage', 600.00),
(3, 'Premium Coverage', 900.00);

-- Insertar datos para Model
INSERT INTO Models (Id, ModelName, BrandId) VALUES
(1, 'Corolla', 1),
(2, 'Civic', 2),
(3, 'Mustang', 3),
(4, 'X5', 4);


-- Insertar datos para VehicleType
INSERT INTO VehicleTypes (Id, VehicleTypeName) VALUES
(1, 'Sedan'),
(2, 'SUV'),
(3, 'Truck'),
(4, 'Coupe');

-- Insertar datos para Vehicle
INSERT INTO Vehicles (Id, VehicleName, Year, Vin, Passengers, Transmission, Doors, Color, RentalPrice, FuelConsumption, FuelId, BrandId, ModelId, VehicleTypeId)
VALUES
(1, 'Toyota Corolla', 2020, '1HGBH41JXMN109186', 5, 'Automatic', 4, 'Blue', 50.00, 30, 1, 1, 1, 1),
(2, 'Honda Civic', 2021, '2HGBH41JXMN109186', 5, 'Manual', 4, 'Red', 45.00, 35, 2, 2, 2, 1),
(3, 'Ford Mustang', 2019, '3HGBH41JXMN109186', 4, 'Automatic', 2, 'Black', 100.00, 20, 1, 3, 3, 4),
(4, 'BMW X5', 2022, '4HGBH41JXMN109186', 5, 'Automatic', 4, 'White', 120.00, 25, 3, 4, 4, 2),
(5, 'Toyota RAV4', 2020, '5HGBH41JXMN109186', 5, 'Automatic', 4, 'Gray', 75.00, 28, 1, 1, 1, 2),
(6, 'Honda CR-V', 2021, '6HGBH41JXMN109186', 5, 'Automatic', 4, 'Silver', 70.00, 30, 2, 2, 2, 2),
(7, 'Ford F-150', 2021, '7HGBH41JXMN109186', 5, 'Automatic', 4, 'Green', 80.00, 15, 1, 3, 3, 3),
(8, 'BMW 3 Series', 2020, '8HGBH41JXMN109186', 5, 'Automatic', 4, 'Blue', 90.00, 22, 4, 4, 4, 1);


-- Insertar datos para Photo
-- INSERT INTO Photos (Id, VehicleId, FileName, PictureUrl, IsMain) VALUES
-- (1, 1, 'corolla_le.jpg', 'http://example.com/images/corolla_le.jpg', true),
-- (2, 2, 'civic_ex.jpg', 'http://example.com/images/civic_ex.jpg', false),
-- (3, 3, 'mustang_gt.jpg', 'http://example.com/images/mustang_gt.jpg', false),
-- (4, 4, 'x5_m.jpg', 'http://example.com/images/x5_m.jpg', false);
