-- CAR RENTAL MANAGEMENT SYSTEM SQL
--creating the db
CREATE DATABASE CCMS_DB;
GO
USE CMS_DB;
-- CAR TABLE
CREATE TABLE Car (
    Car_ID INT IDENTITY(1,1) PRIMARY KEY,
    Car_Model VARCHAR(50) NOT NULL,
    Manufacturer VARCHAR(100) NOT NULL,
    Year INT NOT NULL,
    Color VARCHAR(50) NOT NULL,
    Rental_Rate DECIMAL(10,2) NOT NULL,
    Availability BIT NOT NULL
);

-- CUSTOMER TABLE
CREATE TABLE Customer (
    Customer_ID INT IDENTITY(1,1) PRIMARY KEY,
    First_Name VARCHAR(50) NOT NULL,
    Last_Name VARCHAR(50) NOT NULL,
    Email VARCHAR(50) UNIQUE NOT NULL,
    Phone_Number NVARCHAR(50) NOT NULL,
    Address NVARCHAR(100) NOT NULL
);

-- BOOKING TABLE
CREATE TABLE Booking (
    Booking_ID INT IDENTITY(1,1) PRIMARY KEY,
    Car_ID INT FOREIGN KEY REFERENCES Car(Car_ID),
    Customer_ID INT FOREIGN KEY REFERENCES Customer(Customer_ID),
    Rental_Start_Date DATETIME NOT NULL,
    Rental_End_Date DATETIME NOT NULL,
    TotalAmount DECIMAL(10,2) NOT NULL
);

-- PAYMENT TABLE
CREATE TABLE Payment (
    Payment_ID INT IDENTITY(1,1) PRIMARY KEY,
    Booking_ID INT FOREIGN KEY REFERENCES Booking(Booking_ID),
    PaymentDate DATETIME NOT NULL,
    Amount DECIMAL(10,2) NOT NULL,
    PaymentMethod VARCHAR(50) NOT NULL
);

-- INSURANCE TABLE
CREATE TABLE Insurance (
    Insurance_ID INT IDENTITY(1,1) PRIMARY KEY,
    Car_ID INT FOREIGN KEY REFERENCES Car(Car_ID),
    InsuranceProvider VARCHAR(100) NOT NULL,
    PolicyNumber VARCHAR(100) NOT NULL,
    StartDate DATE NOT NULL,
    EndDate DATE NOT NULL
);
-- LOCATION TABLE
CREATE TABLE Location (
    Location_ID INT IDENTITY(1,1) PRIMARY KEY,
    Car_ID INT FOREIGN KEY REFERENCES Car(Car_ID),
    LocationName VARCHAR(100) NOT NULL,
    Address VARCHAR(200) NOT NULL,
    ContactNumber VARCHAR(50) NOT NULL
);

--RESERVATION TABLE
CREATE TABLE Reservation (
    Reservation_ID INT IDENTITY(1,1) PRIMARY KEY,
    Car_ID INT FOREIGN KEY REFERENCES Car(Car_ID),
    Customer_ID INT FOREIGN KEY REFERENCES Customer(Customer_ID),
    ReservationDate DATE NOT NULL,
    PickupDate DATE NOT NULL,
    ReturnDate DATE NOT NULL
);

-- MAINTENANCE TABLE
CREATE TABLE Maintenance (
    Maintenance_ID INT IDENTITY(1,1) PRIMARY KEY,
    Car_ID INT FOREIGN KEY REFERENCES Car(Car_ID),
    MaintenanceDate DATE NOT NULL,
    Description TEXT NOT NULL,
    Cost DECIMAL(10,2) NOT NULL
);


--CRAUD OPERATIONS
--CREATE
-- Insert into Car
INSERT INTO Car (Car_Model, Manufacturer, Year, Color, Rental_Rate, Availability)
VALUES 
('Corolla', 'Toyota', 2020, 'White', 4500.00, 1),
('Civic', 'Honda', 2021, 'Black', 5000.00, 1),
('CX-5', 'Mazda', 2019, 'Red', 5500.00, 1),
('X-Trail', 'Nissan', 2022, 'Blue', 6000.00, 1),
('Fortuner', 'Toyota', 2023, 'Silver', 7500.00, 1);

-- Insert into Customer
INSERT INTO Customer (First_Name, Last_Name, Email, Phone_Number, Address)
VALUES
('John', 'mwangi', 'john.mwa@gmail.com', '0712345678', 'Nairobi'),
('Mary', 'Wanjiku', 'mary.wanjiku@gmail.com', '0723456789', 'Mombasa'),
('Peter', 'Kamau', 'peter.kamau@gmail.com', '0734567890', 'Kisumu'),
('Lucy', 'Njeri', 'lucy.njeri@gmail.com', '0745678901', 'Nakuru'),
('Brian', 'Otieno', 'brian.otieno@gmail.com', '0756789012', 'Eldoret');

-- Insert into Booking
INSERT INTO Booking (Car_ID, Customer_ID, Rental_Start_Date, Rental_End_Date, TotalAmount)
VALUES
(1, 1, '2025-10-01', '2025-10-05', 18000.00),
(2, 2, '2025-09-25', '2025-09-30', 25000.00),
(3, 3, '2025-10-02', '2025-10-07', 27000.00),
(4, 4, '2025-09-20', '2025-09-25', 30000.00),
(5, 5, '2025-09-28', '2025-10-03', 35000.00);

-- Insert into Payment
INSERT INTO Payment (Booking_ID, PaymentDate, Amount, PaymentMethod)
VALUES
(1, '2025-10-01', 18000.00, 'Mpesa'),
(2, '2025-09-25', 25000.00, 'Credit Card'),
(3, '2025-10-02', 27000.00, 'Cash'),
(4, '2025-09-20', 30000.00, 'Bank Transfer'),
(5, '2025-09-28', 35000.00, 'Mpesa');

-- Insert into Insurance
INSERT INTO Insurance (Car_ID, InsuranceProvider, PolicyNumber, StartDate, EndDate)
VALUES
(1, 'APA Insurance', 'POL12345', '2025-01-01', '2026-01-01'),
(2, 'Jubilee Insurance', 'POL54321', '2025-02-01', '2026-02-01'),
(3, 'Britam Insurance', 'POL67890', '2025-03-01', '2026-03-01'),
(4, 'CIC Insurance', 'POL09876', '2025-04-01', '2026-04-01'),
(5, 'Madison Insurance', 'POL11223', '2025-05-01', '2026-05-01');

-- Insert into Location
INSERT INTO Location (Car_ID, LocationName, Address, ContactNumber)
VALUES
(1, 'Nairobi Branch', 'Moi Avenue, Nairobi', '0712345678'),
(2, 'Mombasa Branch', 'Nkrumah Road, Mombasa', '0723456789'),
(3, 'Kisumu Branch', 'Oginga Odinga Street, Kisumu', '0734567890'),
(4, 'Nakuru Branch', 'Kenyatta Avenue, Nakuru', '0745678901'),
(5, 'Eldoret Branch', 'Uganda Road, Eldoret', '0756789012');

-- Insert into Reservation
INSERT INTO Reservation (Car_ID, Customer_ID, ReservationDate, PickupDate, ReturnDate)
VALUES
(1, 2, '2025-09-28', '2025-10-02', '2025-10-05'),
(2, 3, '2025-09-26', '2025-09-30', '2025-10-03'),
(3, 1, '2025-09-25', '2025-09-29', '2025-10-02'),
(4, 4, '2025-09-20', '2025-09-22', '2025-09-25'),
(5, 5, '2025-09-27', '2025-09-29', '2025-10-01');

-- Insert into Maintenance
INSERT INTO Maintenance (Car_ID, MaintenanceDate, Description, Cost)
VALUES
(1, '2025-08-01', 'Oil Change and Filter Replacement', 5000.00),
(2, '2025-08-15', 'Brake Pad Replacement', 8000.00),
(3, '2025-09-01', 'Tire Replacement', 12000.00),
(4, '2025-09-10', 'Engine Tune-Up', 15000.00),
(5, '2025-09-20', 'Battery Replacement', 10000.00);

--READ QUERIES
-- View all cars
SELECT * FROM Car;

-- View all customers
SELECT * FROM Customer;

-- View all bookings with car and customer info
SELECT B.Booking_ID, C.First_Name, C.Last_Name, Car.Car_Model, B.Rental_Start_Date, B.Rental_End_Date, B.TotalAmount
FROM Booking B
JOIN Customer C ON B.Customer_ID = C.Customer_ID
JOIN Car ON B.Car_ID = Car.Car_ID;

-- View payments
SELECT * FROM Payment;

-- View maintenance records
SELECT Car.Car_Model, M.MaintenanceDate, M.Description, M.Cost
FROM Maintenance M
JOIN Car ON M.Car_ID = Car.Car_ID;

-- View reservations
SELECT R.Reservation_ID, C.First_Name, C.Last_Name, Car.Car_Model, R.PickupDate, R.ReturnDate
FROM Reservation R
JOIN Customer C ON R.Customer_ID = C.Customer_ID
JOIN Car ON R.Car_ID = Car.Car_ID;

--UPDATE QUERIES 
-- Update rental rate of a car
UPDATE Car
SET Rental_Rate = 4800.00
WHERE Car_Model = 'Corolla';

-- Update customer address
UPDATE Customer
SET Address = 'Nyeri'
WHERE First_Name = 'Mary' AND Last_Name = 'Wanjiku';

-- Update booking total amount
UPDATE Booking
SET TotalAmount = 20000.00
WHERE Booking_ID = 1;

-- Update payment method
UPDATE Payment
SET PaymentMethod = 'fuliza'
WHERE Payment_ID = 1;

-- Update maintenance description
UPDATE Maintenance
SET Description = 'Full Service (Oil, Tires, Brakes)'
WHERE Maintenance_ID = 1;

--DELETE QUERIES

-- Delete a reservation
DELETE FROM Reservation WHERE Reservation_ID = 5;

-- Delete a payment record
DELETE FROM Payment WHERE Payment_ID = 5;

-- Delete a car that is no longer available
--DELETE FROM Car WHERE Car_ID = 5;

-- Delete a maintenance record
--DELETE FROM Maintenance WHERE Maintenance_ID = 5;

-- Delete a customer
--DELETE FROM Customer WHERE Customer_ID = 5;


SELECT * FROM Car;
SELECT * FROM Customer;
SELECT * FROM Reservation;
SELECT * FROM Payment;
SELECT * FROM Maintenance;

DELETE FROM Customer 
WHERE Email ='spencer.muli001@gmail.com';


