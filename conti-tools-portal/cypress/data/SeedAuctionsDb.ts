export const seedSqlAuctions = `
USE AuctionDb;
--Declarations
DECLARE @Date DATETIME = GETDATE();
DECLARE @DatePlus DATE = (select DATEADD(day,1,getdate()))
DECLARE @DOCIDGUID UNIQUEIDENTIFIER = NEWID();
DECLARE @SESSIONIDGUID UNIQUEIDENTIFIER = NEWID();

--Delete tables
DELETE FROM [Customers];
DELETE FROM [SalesCycles];
DELETE FROM [Documents];
DELETE FROM [Products];
DELETE FROM [ProductItineraries];
DELETE FROM [ProductItineraryLocations];
DELETE FROM [ProductViewings];
DELETE FROM [Sessions];

--Reset id increment on tables
DBCC CHECKIDENT('[SalesCycles]', RESEED, 0);
DBCC CHECKIDENT('[Products]', RESEED, 0);
DBCC CHECKIDENT('[ProductItineraries]', RESEED, 0);
DBCC CHECKIDENT('[ProductItineraryLocations]', RESEED, 0);
DBCC CHECKIDENT('[ProductViewings]', RESEED, 0);

--Inserting data into tables
INSERT INTO [Customers]
(
[CustomerId],
[AccountId],
[Name],
[AllocatedLocation],
[AccountOwner],
[CustomerGroup],
[AccountStatus],
[AccountOwnerEmail],
[CreatedAt],
[UpdatedAt],
[CreatedBy],
[UpdatedBy],
[IsDeleted]
)
VALUES
('26d64e56-e2e3-4dce-bbbe-5e8e589f748f','0012000000WCk9XAAT', '4 CS Ltd', 'Tel Aviv', 'Danny Peles', 'Non-Sightholders', 'Active', 'dannypeles@4csltd.com', @Date, @Date, 0, 0, 0),
(NEWID(),'0012p00002mldgOAAQ', '4G GEMS', 'Mumbai', 'Rhyzard Bilimoria', 'Non-Sightholders', 'Active', 'rhyzardbilimoria@4ggems.com', @Date, @Date, 0, 0, 0)

SET IDENTITY_INSERT [SalesCycles] ON;
INSERT INTO [SalesCycles]
(
[SalesCycleId],
[Name],
[StartDate],
[EndDate],
[CreatedAt],
[UpdatedAt],
[CreatedBy],
[UpdatedBy],
[IsDeleted]
)
VALUES
(1, '2022_03', @Date, @DatePlus, @Date, @Date, 0, 0, 0)
SET IDENTITY_INSERT [SalesCycles] OFF;

INSERT INTO [Documents]
(
[DocumentId],
[Name],
[SalesCycleId],
[CreatedAt],
[UpdatedAt],
[CreatedBy],
[UpdatedBy],
[IsDeleted]
)
VALUES
(@DOCIDGUID, '1000597', 1, @Date, @Date, 0, 0, 0);

SET IDENTITY_INSERT [Products] ON;
INSERT INTO [Products]
(
[ProductId],
[LotId],
[LotNumber],
[Name],
[MaxTimeInMinutes],
[WeightInCarats],
[AuctionBlockId],
[IsActive],
[EventNumber],
[DocumentId],
[CreatedAt],
[UpdatedAt],
[CreatedBy],
[UpdatedBy],
[IsDeleted]
)
VALUES
(1, 1, '100ABC', 'Gem-1-1CT', 60, CAST(100.10 AS DECIMAL(5, 2)), 3, 1, '111A', @DOCIDGUID, @Date, @Date, 0, 0, 0),
(2, 2, '100AAA', 'Gem-1-10CT', 120, CAST(80.10 AS DECIMAL(5, 2)), 3, 1, '112A', @DOCIDGUID, @Date, @Date, 0, 0, 0),
(3, 3, '100AAD', 'Gem-1-100CT', 120, CAST(80.10 AS DECIMAL(5, 2)), 2, 1, '112A', @DOCIDGUID, @Date, @Date, 0, 0, 0),
(4, 5, '100AAE', 'Gem-2-100CT', 120, CAST(80.10 AS DECIMAL(5, 2)), 3, 1, '112A', @DOCIDGUID, @Date, @Date, 0, 0, 0)
SET IDENTITY_INSERT [Products] OFF;

SET IDENTITY_INSERT [ProductItineraryLocations] ON;
INSERT INTO [ProductItineraryLocations]
(
[ProductItineraryLocationId],
[LocationId],
[InDate],
[OutDate],
[CreatedAt],
[UpdatedAt],
[CreatedBy],
[UpdatedBy],
[IsDeleted]
)
VALUES
(1, 3, '2022-01-01 00:00:00.0000000', '2022-12-01 00:00:00.0000000', @Date, @Date, 0, 0, 0),
(2, 1, '2022-01-01 00:00:00.0000000', '2022-12-01 00:00:00.0000000', @Date, @Date, 0, 0, 0),
(3, 4, '2022-01-01 00:00:00.0000000', '2022-12-01 00:00:00.0000000', @Date, @Date, 0, 0, 0),
(4, 5, '2022-01-01 00:00:00.0000000', '2022-12-01 00:00:00.0000000', @Date, @Date, 0, 0, 0),
(5, 6, '2022-01-01 00:00:00.0000000', '2022-12-01 00:00:00.0000000', @Date, @Date, 0, 0, 0)
SET IDENTITY_INSERT [ProductItineraryLocations] OFF;

SET IDENTITY_INSERT [ProductItineraries] ON;
INSERT INTO [ProductItineraries]
(
[ProductItineraryId]
      ,[DocumentId]
      ,[ProductItineraryLocationId]
      ,[CreatedAt]
      ,[UpdatedAt]
      ,[CreatedBy]
      ,[UpdatedBy]
      ,[IsDeleted]
)
VALUES
(1, @DOCIDGUID, 1, @Date, @Date, 0, 0, 0),
(2, @DOCIDGUID, 2, @Date, @Date, 0, 0, 0),
(3, @DOCIDGUID, 3, @Date, @Date, 0, 0, 0),
(4, @DOCIDGUID, 4, @Date, @Date, 0, 0, 0)
SET IDENTITY_INSERT [ProductItineraries] OFF;

INSERT INTO [Sessions]
(
	SessionId, 
	AuctionBookingId, 
	KamId, 
	SessionStatusId, 
	StartDateTime, 
	EndDateTime, 
	CreatedAt, 
	UpdatedAt, 
	CreatedBy, 
	UpdatedBy, 
	IsDeleted
)
VALUES
(@SESSIONIDGUID, '3FA85F64-5717-4562-B3FC-2C963F66AFA6', '3FA85F64-5717-4562-B3FC-2C963F66AFA6', 1, @Date, @Date, @Date, @Date, 0, 0, 0);

SET IDENTITY_INSERT [ProductViewings] ON;
INSERT INTO [ProductViewings]
(
	[ProductViewingId],
	[SessionID],
	[ProductId], 
	[FinishTime], 
	[ProductViewingStatusId], 
	[CreatedAt], 
	[UpdatedAt], 
	[CreatedBy], 
	[UpdatedBy], 
	[IsDeleted]
)
VALUES
(0,@SESSIONIDGUID, 4,  @Date, 1, @Date, @Date, 0, 0, 0)
SET IDENTITY_INSERT [ProductViewings] OFF;
`;
