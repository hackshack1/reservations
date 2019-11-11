DROP KEYSPACE IF EXISTS hackshack;
CREATE KEYSPACE IF NOT EXISTS hackshack WITH replication = {'class': 'SimpleStrategy', 'replication_factor': '1'};
USE hackshack;

CREATE TABLE reservations (
  id INT,
  id_listings INT,
  start_date VARCHAR,
  end_date VARCHAR,
  adult_count INT,
  children_count INT,
  infant_count INT,
  total DECIMAL,
  PRIMARY KEY (id_listings, start_date)
);

CREATE TABLE listings (
  id INT,
  cleaning_fee DECIMAL,
  service_fee DECIMAL,
  minimum_stay INT,
  base_price INT,
  id_users INT,
  average_rating DECIMAL,
  review_count INT,
  PRIMARY KEY (id)
);


