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

-- Insertar datos para ReservationStatus
INSERT INTO ReservationStatus (Id, StatusName) VALUES
(1, 'Pending'),
(2, 'Confirmed'),
(3, 'Cancelled'),
(4, 'Completed');

-- Insertar datos para Status
INSERT INTO Statuses (Id, StatusName) VALUES
(1, 'Available'),
(2, 'Unavailable'),
(3, 'Under Maintenance'),
(4, 'Sold');

-- Insertar datos para VehicleType
INSERT INTO VehicleTypes (Id, VehicleTypeName) VALUES
(1, 'Sedan'),
(2, 'SUV'),
(3, 'Truck'),
(4, 'Coupe');

-- Insertar datos para Vehicle
INSERT INTO Vehicles (Id, VehicleName, Year, Vin, Passengers, Transmission, Doors, Color, RentalPrice, FuelConsumption, FuelId, BrandId, ModelId, StatusId, VehicleTypeId) VALUES
(1, 'Corolla LE', 2020, '1HGBH41JXMN109186', 5, 'Automatic', 4, 'Blue', 30.00, 25, 1, 1, 1, 1, 1),
(2, 'Civic EX', 2021, '2HGEJ6576TH007258', 5, 'Manual', 4, 'Red', 35.00, 28, 1, 2, 2, 1, 2),
(3, 'Mustang GT', 2022, '1FATP8FF4J5101234', 4, 'Automatic', 2, 'Black', 50.00, 20, 1, 3, 3, 1, 3),
(4, 'X5 M', 2023, '5UXKW8C52L9A00001', 5, 'Automatic', 5, 'White', 70.00, 18, 1, 4, 4, 1, 4);

-- Insertar datos para Photo
-- INSERT INTO Photos (Id, VehicleId, FileName, PictureUrl, IsMain) VALUES
-- (1, 1, 'corolla_le.jpg', 'http://example.com/images/corolla_le.jpg', true),
-- (2, 2, 'civic_ex.jpg', 'http://example.com/images/civic_ex.jpg', false),
-- (3, 3, 'mustang_gt.jpg', 'http://example.com/images/mustang_gt.jpg', false),
-- (4, 4, 'x5_m.jpg', 'http://example.com/images/x5_m.jpg', false);
