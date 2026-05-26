
use Sysfore_tasks; 
-- TABLE 1 : USERS
CREATE TABLE Users (
    user_id INT IDENTITY(1,1) PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    country VARCHAR(50),
    mobile BIGINT,

    created_on DATETIME DEFAULT GETUTCDATE(),
    created_by VARCHAR(50),

    updated_on DATETIME DEFAULT GETUTCDATE(),
    updated_by VARCHAR(50),

    is_active BIT DEFAULT 1
);




-- TABLE 2 : WATCH HISTORY
CREATE TABLE WatchHistory (
    watch_id INT IDENTITY(1,1) PRIMARY KEY,
    user_id INT,
    movie_name VARCHAR(100) NOT NULL,
    genre VARCHAR(50),
    watch_minutes INT,
    plan_type VARCHAR(50), 
    watched_date DATE,

    created_on DATETIME DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(50),

    updated_on DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_by VARCHAR(50),

    is_active BIT DEFAULT 1,

    FOREIGN KEY (user_id)
    REFERENCES Users(user_id)
);




INSERT INTO Users
(full_name,email,country,mobile,created_by,updated_by)
VALUES
('Rahul','rahul@gmail.com','India',123456799,'admin','admin'),
('Mushraf','mushraf@gmail.com','Dubai',123456799,'admin','admin'),
('Manan','manan@gmail.com','Canada',123456799,'admin','admin'),
('Kiran','kiran@gmail.com','Australia',123456799,'admin','admin');




SELECT * FROM Users;




INSERT INTO WatchHistory
(user_id, movie_name, genre, watch_minutes, plan_type, watched_date, created_by, updated_by)
VALUES
(1, 'The Dark Knight', 'Action', 152, 'Premium', '2026-05-01', 'admin', 'admin'),
(2, '3 Idiots', 'Comedy', 171, 'Basic', '2026-05-03', 'admin', 'admin'),
(3, 'The Pursuit of Happyness', 'Drama', 117, 'Premium', '2026-05-05', 'admin', 'admin'),
(4, 'John Wick', 'Action', 101, 'Standard', '2026-05-07', 'admin', 'admin');



SELECT * FROM WatchHistory;




SELECT * FROM Users
WHERE country = 'India';




SELECT * FROM WatchHistory
WHERE watch_minutes >= 150
AND plan_type = 'Premium';




SELECT * FROM Users
WHERE country = 'Canada'
OR country = 'Australia';




SELECT * FROM Users
WHERE full_name LIKE 'A%';


SELECT * FROM Users
WHERE country LIKE 'A%';

SELECT * FROM WatchHistory
ORDER BY watch_minutes DESC;




SELECT Users.user_id,Users.full_name,Users.country,WatchHistory.movie_name,WatchHistory.plan_type
FROM Users
INNER JOIN WatchHistory
ON Users.user_id = WatchHistory.user_id;

UPDATE Users
SET mobile = 9999999999,updated_by = 'admin2'
WHERE user_id = 1;


SELECT * FROM Users
WHERE user_id = 1;




DELETE FROM WatchHistory
WHERE watch_id = 5;




SELECT * FROM WatchHistory;




UPDATE Users
SET is_active = 0,updated_by = 'admin2'
WHERE user_id = 4;

SELECT * FROM Users;





SELECT full_name FROM Users;
SELECT * FROM Users;
UPDATE Users set full_name= 'kiran',
updated_by = 'Mushraf',
updated_on=GETUTCDATE()
where full_name = 'tapan';

SELECT COUNT(*) FROM Users;

UPDATE Users set is_active=0,updated_by = 'Mushraf',updated_on=GETUTCDATE()
WHERE user_id=1;



 ---  NEW TABLE : SUBSCRIPTIONS
CREATE TABLE Subscriptions (
    subscription_id INT IDENTITY(1,1) PRIMARY KEY,  

    user_id INT NOT NULL,                      

    plan_name VARCHAR(50) NOT NULL,
    monthly_price DECIMAL(10,2),
    start_date DATE,
    end_date DATE,
    payment_status VARCHAR(30),

    transaction_id VARCHAR(100) UNIQUE,             -- Unique Key

    created_on DATETIME DEFAULT GETUTCDATE(),
    created_by VARCHAR(50),

    updated_on DATETIME DEFAULT GETUTCDATE(),
    updated_by VARCHAR(50),

    is_active BIT DEFAULT 1,

    FOREIGN KEY (user_id)
    REFERENCES Users(user_id)
);



INSERT INTO Subscriptions
(user_id, plan_name, monthly_price, start_date, end_date,
payment_status, transaction_id, created_by, updated_by)

VALUES
(1, 'Premium', 799, '2026-05-01', '2026-06-01',
'Paid', 'TXN1001', 'admin', 'admin'),

(2, 'Basic', 199, '2026-05-02', '2026-06-02',
'Paid', 'TXN1002', 'admin', 'admin'),

(3, 'Premium', 799, '2026-05-03', '2026-06-03',
'Paid', 'TXN1003', 'admin', 'admin'),

(4, 'Standard', 499, '2026-05-04', '2026-06-04',
'Pending', 'TXN1004', 'admin', 'admin');





SELECT * FROM Subscriptions;



SELECT
    U.user_id,
    U.full_name,
    U.country,

    W.movie_name,
    W.genre,
    W.watch_minutes,

    S.plan_name,
    S.monthly_price,
    S.payment_status

FROM Users U

INNER JOIN WatchHistory W
ON U.user_id = W.user_id

INNER JOIN Subscriptions S
ON U.user_id = S.user_id;



---   USERS WITH PREMIUM PLAN


SELECT
    U.full_name,
    S.plan_name,
    S.monthly_price

FROM Users U

INNER JOIN Subscriptions S
ON U.user_id = S.user_id

WHERE S.plan_name = 'Premium';



---   USERS WHO WATCHED ACTION MOVIES

SELECT
    U.full_name,
    W.movie_name,
    W.genre,
    S.plan_name

FROM Users U

INNER JOIN WatchHistory W
ON U.user_id = W.user_id

INNER JOIN Subscriptions S
ON U.user_id = S.user_id

WHERE W.genre = 'Action';






SELECT
    SUM(monthly_price) AS total_revenue
FROM Subscriptions;






UPDATE Subscriptions
SET payment_status = 'Paid',
    updated_by = 'Mushraf',
    updated_on = GETUTCDATE()

WHERE subscription_id = 4;





DELETE FROM Subscriptions
WHERE subscription_id = 2;





---Task3

-- MASTER TABLE : USERS
CREATE TABLE mst_Users
(
    UserId INT PRIMARY KEY IDENTITY(1,1),

    FullName VARCHAR(100) NOT NULL,
    Email VARCHAR(100) UNIQUE NOT NULL,
    Country VARCHAR(50),
    Mobile BIGINT,

    CreatedOn DATETIME DEFAULT GETUTCDATE(),
    CreatedBy VARCHAR(50),

    UpdatedOn DATETIME DEFAULT GETUTCDATE(),
    UpdatedBy VARCHAR(50),

    IsActive BIT DEFAULT 1
);

-- MASTER TABLE : PLAN
CREATE TABLE mst_Plan
(
    PlanId INT PRIMARY KEY IDENTITY(1,1),

    PlanName VARCHAR(50) NOT NULL,
    MonthlyPrice DECIMAL(10,2),

    CreatedOn DATETIME DEFAULT GETUTCDATE(),
    CreatedBy VARCHAR(50),

    UpdatedOn DATETIME DEFAULT GETUTCDATE(),
    UpdatedBy VARCHAR(50),

    IsActive BIT DEFAULT 1
);

-- MASTER TABLE : GENRE
CREATE TABLE mst_Genre
(
    GenreId INT PRIMARY KEY IDENTITY(1,1),

    GenreName VARCHAR(50) NOT NULL,

    CreatedOn DATETIME DEFAULT GETUTCDATE(),
    CreatedBy VARCHAR(50),

    UpdatedOn DATETIME DEFAULT GETUTCDATE(),
    UpdatedBy VARCHAR(50),

    IsActive BIT DEFAULT 1
);

-- TRANSACTION TABLE : SUBSCRIPTION
CREATE TABLE tbl_Subscription
(
    SubscriptionId INT PRIMARY KEY IDENTITY(1,1),

    UserId INT NOT NULL,
    PlanId INT NOT NULL,

    StartDate DATE,
    EndDate DATE,

    PaymentStatus VARCHAR(30),
    TransactionId VARCHAR(100) UNIQUE,

    CreatedOn DATETIME DEFAULT GETUTCDATE(),
    CreatedBy VARCHAR(50),

    UpdatedOn DATETIME DEFAULT GETUTCDATE(),
    UpdatedBy VARCHAR(50),

    IsActive BIT DEFAULT 1,

    CONSTRAINT FK_Subscription_User
    FOREIGN KEY (UserId)
    REFERENCES mst_Users(UserId),

    CONSTRAINT FK_Subscription_Plan
    FOREIGN KEY (PlanId)
    REFERENCES mst_Plan(PlanId)
);

-- TRANSACTION TABLE : WATCH HISTORY
CREATE TABLE tbl_WatchHistory
(
    WatchId INT PRIMARY KEY IDENTITY(1,1),

    UserId INT NOT NULL,
    GenreId INT NOT NULL,

    MovieName VARCHAR(100) NOT NULL,
    WatchMinutes INT,
    WatchedDate DATE,

    CreatedOn DATETIME DEFAULT GETUTCDATE(),
    CreatedBy VARCHAR(50),

    UpdatedOn DATETIME DEFAULT GETUTCDATE(),
    UpdatedBy VARCHAR(50),

    IsActive BIT DEFAULT 1,

    CONSTRAINT FK_WatchHistory_User
    FOREIGN KEY (UserId)
    REFERENCES mst_Users(UserId),

    CONSTRAINT FK_WatchHistory_Genre
    FOREIGN KEY (GenreId)
    REFERENCES mst_Genre(GenreId)
);


-- ERROR LOG TABLE

CREATE TABLE tbl_ErrorLog
(
    ErrorLogId INT PRIMARY KEY IDENTITY(1,1),

    ErrorMessage VARCHAR(MAX),
    ErrorProcedure VARCHAR(100),
    ErrorLine INT,

    ErrorDate DATETIME DEFAULT GETDATE()
);

-- INSERT INTO mst_Plan
INSERT INTO mst_Plan
(
    PlanName,
    MonthlyPrice,
    CreatedBy,
    UpdatedBy
)
VALUES
('Basic',199,'admin','admin'),
('Standard',499,'admin','admin'),
('Premium',799,'admin','admin');

-- INSERT INTO mst_Genre
INSERT INTO mst_Genre
(
    GenreName,
    CreatedBy,
    UpdatedBy
)
VALUES
('Action','admin','admin'),
('Comedy','admin','admin'),
('Drama','admin','admin');

-- INSERT INTO mst_Users
INSERT INTO mst_Users
(
    FullName,
    Email,
    Country,
    Mobile,
    CreatedBy,
    UpdatedBy
)
VALUES
('Rahul','rahul@gmail.com','India',9999999991,'admin','admin'),
('Mushraf','mushraf@gmail.com','Dubai',9999999992,'admin','admin'),
('Manan','manan@gmail.com','Canada',9999999993,'admin','admin'),
('Kiran','kiran@gmail.com','Australia',9999999994,'admin','admin');

-- NORMAL SELECT QUERIES
SELECT
    UserId,
    FullName,
    Country
FROM mst_Users
WHERE Country = 'India';



SELECT
    MovieName,
    WatchMinutes
FROM tbl_WatchHistory
WHERE WatchMinutes >= 150;



SELECT
    FullName,
    Country
FROM mst_Users
WHERE Country = 'Canada'
OR Country = 'Australia';



SELECT
    FullName
FROM mst_Users
WHERE FullName LIKE 'M%';



SELECT
    MovieName,
    WatchMinutes
FROM tbl_WatchHistory
ORDER BY WatchMinutes DESC;



-- INNER JOIN
SELECT * FROM mst_Users U
INNER JOIN tbl_Subscription S
ON U.UserId = S.UserId;


-- LEFT JOIN
SELECT
    U.FullName,
    P.PlanName

FROM mst_Users U

LEFT JOIN tbl_Subscription S
ON U.UserId = S.UserId

LEFT JOIN mst_Plan P
ON S.PlanId = P.PlanId;

-- RIGHT JOIN
SELECT
    U.FullName,
    P.PlanName

FROM tbl_Subscription S

RIGHT JOIN mst_Plan P
ON S.PlanId = P.PlanId

LEFT JOIN mst_Users U
ON U.UserId = S.UserId;


-- FULL JOIN
SELECT
    U.FullName,
    P.PlanName

FROM mst_Users U

FULL JOIN tbl_Subscription S
ON U.UserId = S.UserId

FULL JOIN mst_Plan P
ON S.PlanId = P.PlanId;

-- USER DEFINED TABLE TYPE (UDT)
CREATE TYPE Subscription_Type AS TABLE
(
    UserId INT,
    PlanId INT,
    StartDate DATE,
    EndDate DATE,
    PaymentStatus VARCHAR(30),
    TransactionId VARCHAR(100)
);


-- STORED PROCEDURE 1
-- GET USERS BY COUNTRY

CREATE PROCEDURE usp_GetUsersByCountry
(
    @Country VARCHAR(50)
)
AS
BEGIN

    SET NOCOUNT ON;

    SELECT
        UserId,
        FullName,
        Email,
        Country
    FROM mst_Users
    WHERE Country = @Country;

END;


-- EXECUTE SP 1
EXEC usp_GetUsersByCountry 'India';



-- STORED PROCEDURE 2
-- GET PREMIUM USERS
CREATE PROCEDURE usp_GetPremiumUsers
AS
BEGIN

    SET NOCOUNT ON;

    SELECT
        U.FullName,
        P.PlanName,
        P.MonthlyPrice

    FROM mst_Users U

    INNER JOIN tbl_Subscription S
    ON U.UserId = S.UserId

    INNER JOIN mst_Plan P
    ON S.PlanId = P.PlanId

    WHERE P.PlanName = 'Premium';

END;


-- EXECUTE SP 2
EXEC usp_GetPremiumUsers;


-- STORED PROCEDURE 3
-- INSERT MULTIPLE SUBSCRIPTIONS USING UDT

CREATE PROCEDURE usp_InsertSubscriptions
(
    @Subscriptions Subscription_Type READONLY
)
AS
BEGIN

    SET NOCOUNT ON;

    INSERT INTO tbl_Subscription
    (
        UserId,
        PlanId,
        StartDate,
        EndDate,
        PaymentStatus,
        TransactionId,
        CreatedBy,
        UpdatedBy
    )

    SELECT
        UserId,
        PlanId,
        StartDate,
        EndDate,
        PaymentStatus,
        TransactionId,
        'admin',
        'admin'

    FROM @Subscriptions;

END;

-- EXECUTE SP 3 USING UDT
DECLARE @NewSubscriptions Subscription_Type;

INSERT INTO @NewSubscriptions
(
    UserId,
    PlanId,
    StartDate,
    EndDate,
    PaymentStatus,
    TransactionId
)
VALUES
(1,1,'2026-06-01','2026-07-01','Paid','TXN2001'),

(2,2,'2026-06-02','2026-07-02','Paid','TXN2002');

EXEC usp_InsertSubscriptions @NewSubscriptions;