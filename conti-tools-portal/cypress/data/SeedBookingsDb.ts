export const seedSqlBookings = `
USE BookingDB;
--Declerations
DECLARE @Date DATETIME = GETDATE();

--Delete tables
DELETE FROM [Locations];
DELETE FROM [Rooms];
DELETE FROM [AuctionBookings];

-- Reset id increment on tables
DBCC CHECKIDENT('[Locations]', RESEED, 0);
DBCC CHECKIDENT('[Rooms]', RESEED, 0);

-- Inserting data into tables
SET IDENTITY_INSERT [Locations] ON;
INSERT INTO [Locations]
(
[LocationId],
[Name],
[Code],
[IsAvailable],
[CreatedAt],
[UpdatedAt],
[CreatedBy],
[UpdatedBy],
[IsDeleted]
)
VALUES
(1, 'Antwerp', 'ANT', 1, @Date, @Date, 0, 0, 0),
(2, 'Beijing', 'BEI', 1, @Date, @Date, 0, 0, 0),
(3, 'New York', 'NYC', 1, @Date, @Date, 0, 0, 0),
(4, 'Tel Aviv', 'TEL', 1, @Date, @Date, 0, 0, 0),
(5, 'Mumbai', 'MUM', 1, @Date, @Date, 0, 0, 0),
(6, 'Hong Kong', 'HKG', 1, @Date, @Date, 0, 0, 0)
SET IDENTITY_INSERT [Locations] OFF;

SET IDENTITY_INSERT [Rooms] ON;
INSERT INTO [Rooms]
(
[RoomId],
[LocationId],
[Name],
[Capacity],
[IsAvailable],
[CreatedAt],
[UpdatedAt],
[CreatedBy],
[UpdatedBy],
[IsDeleted]
)
VALUES
(1, 1,'ANT001', 6, 1, @Date, @Date, 0, 0, 0),
(2, 1,'ANT002', 12, 1, @Date, @Date, 0, 0, 0),
(3, 1,'ANT003', 2, 1, @Date, @Date, 0, 0, 0),
(4, 1,'ANT004', 8, 1, @Date, @Date, 0, 0, 0),
(5, 1,'ANT005', 14, 1, @Date, @Date, 0, 0, 0),
(6, 1,'ANT006', 2, 1, @Date, @Date, 0, 0, 0),
(7, 2,'BEI001', 6, 1, @Date, @Date, 0, 0, 0),
(8, 2,'BEI002', 12, 1, @Date, @Date, 0, 0, 0),
(9, 2,'BEI003', 2, 0, @Date, @Date, 0, 0, 0)
SET IDENTITY_INSERT [Rooms] OFF;

INSERT INTO [AuctionBookings]
(
  [AuctionBookingId]
  ,[RoomId]
  ,[CustomerId]
  ,[SalesCycleId]
  ,[BookingStart]
  ,[BookingEnd]
  ,[GuestCount]
  ,[CreatedAt]
  ,[UpdatedAt]
  ,[CreatedBy]
  ,[UpdatedBy]
  ,[IsDeleted])
VALUES
(NEWID(), 1, '26d64e56-e2e3-4dce-bbbe-5e8e589f748f', 1, '2022-01-01 10:00', '2022-01-01 12:00', 1, @Date, @Date, 1, 1, 0)`;
