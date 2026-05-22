
use Users_db; 
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