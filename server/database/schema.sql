DROP SCHEMA IF EXISTS hackshack;
CREATE SCHEMA IF NOT EXISTS hackshack;

-- DROP TABLE IF EXISTS users;
-- CREATE TABLE users (
--   id SERIAL,
--   username VARCHAR(20) NOT NULL,
--   PRIMARY KEY (id)
-- );

DROP TABLE IF EXISTS reservations;
DROP TABLE IF EXISTS listings;
	
CREATE TABLE listings (
  id SERIAL,
  cleaning_fee DECIMAL(18,2) NOT NULL,
  service_fee DECIMAL(18,2) NOT NULL,
  minimum_stay INT NOT NULL,
  -- max_guests INT NOT NULL,
  base_price DECIMAL(18,2) NOT NULL,
  id_users INT NOT NULL,
  average_rating DECIMAL(3, 2),
  review_count INT DEFAULT 0,
  PRIMARY KEY (id)
  -- FOREIGN KEY (id_users) REFERENCES users(id)
);

CREATE TABLE reservations (
  id serial,
  id_listings INT NOT NULL,
  id_users INT NOT NULL,
  start_date VARCHAR NOT NULL,
  end_date VARCHAR NOT NULL,
  adult_count INT NOT NULL,
  children_count INT NOT NULL,
  infant_count INT NOT NULL,
  total DECIMAL(18,2) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (id_listings) REFERENCES listings (id)
);

COPY listings(id, cleaning_fee, service_fee, minimum_stay, base_price, id_users, average_rating, review_count) FROM '/mnt/c/users/austin/desktop/projects/hackreactor/reservations/server/database/listings.csv' DELIMITER ',' CSV HEADER;
COPY reservations(id, id_listings, id_users, start_date, end_date, adult_count, children_count, infant_count, total) FROM '/mnt/c/users/austin/desktop/projects/hackreactor/reservations/server/database/reservations.csv' DELIMITER ',' CSV HEADER;

-- alter table a add b_id int;

-- update a
--    set b_id = b.id
-- from b 
-- where a.tractce = b.tractfips;


-- alter table a drop column tractce;
-- alter table a add constraint fk_a_b foreign key (b_id) references b;

-- DROP TABLE IF EXISTS dates;
		
-- CREATE TABLE dates (
--   id INT SERIAL,
--   date DATE NOT NULL,
--   booking_price DECIMAL(18,2) NOT NULL,
--   id_reservations INT NOT NULL,
--   PRIMARY KEY (id),
--   FOREIGN KEY (id_reservations) REFERENCES reservations (id)
-- );

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `Reservations` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Listings` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Users` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `new table` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Dates` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- CREATE TABLE reservations(
--    id serial PRIMARY KEY,
--    username VARCHAR (50) UNIQUE NOT NULL,
--    password VARCHAR (50) NOT NULL,
--    email VARCHAR (355) UNIQUE NOT NULL,
--    created_on TIMESTAMP NOT NULL,
--    last_login TIMESTAMP
-- );

-- CREATE TABLE reservations(
--   id serial PRIMARY KEY,
--   start_date DATE NOT NULL,
--   end_date DATE NOT NULL,
--   adult_count INT NOT NULL,
--   children_count INT NOT NULL,
--   infant_count VARCHAR (50) NOT NULL,
--   discount VARCHAR (50) NOT NULL,
--   average_rating DOUBLE NOT NULL,
--   review_count INT NOT NULL,
--   created_on TIMESTAMP NOT NULL,

--   id_listings VARCHAR (50) NOT NULL,
--   email VARCHAR (355) UNIQUE NOT NULL,
-- );

-- CREATE TABLE listings(
--   id serial PRIMARY KEY,
--   cleaning_fee MONEY UNIQUE NOT NULL,
--   service_fee MONEY UNIQUE NOT NULL,
--   minimum_days 
--   created_on TIMESTAMP NOT NULL,
--   last_login TIMESTAMP
-- );