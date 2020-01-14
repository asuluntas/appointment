DROP DATABASE IF EXISTS notable;
CREATE DATABASE notable;
USE notable;

CREATE TABLE doctors(
  id int NOT NULL AUTO_INCREMENT,
  name varchar(100) NOT NULL,
  lastname varchar(100) NOT NULL,
  PRIMARY KEY(id)
);

CREATE TABLE appointments(
  id int NOT NULL AUTO_INCREMENT,
  doctor_id int NOT NULL,
  patient_name varchar(100) NOT NULL,
  patient_lastname varchar(100) NOT NULL,
  date_time DATETIME NOT NULL,
  kind varchar(100) NOT NULL,
  PRIMARY KEY(id)
);

INSERT INTO doctors (name, lastname) VALUES ('Julius', 'Hibbert');
INSERT INTO doctors (name, lastname) VALUES ('Algernop', 'Krieger');
INSERT INTO doctors (name, lastname) VALUES ('Nick', 'Riviera');

INSERT INTO appointments (doctor_id, patient_name, patient_lastname, date_time, kind) VALUES (2, 'Strerling', 'Archer', '2018-05-09 08:00:00', 'New Patient');
INSERT INTO appointments (doctor_id, patient_name, patient_lastname, date_time, kind) VALUES (2, 'Cyril', 'Figis', '2018-05-09 08:30:00', 'Follow-up');
INSERT INTO appointments (doctor_id, patient_name, patient_lastname, date_time, kind) VALUES (2, 'Ray', 'Gilette', '2018-05-09 09:00:00', 'Follow-up');
INSERT INTO appointments (doctor_id, patient_name, patient_lastname, date_time, kind) VALUES (2, 'Lana', 'Kane', '2018-05-09 09:30:00', 'New Patient');
INSERT INTO appointments (doctor_id, patient_name, patient_lastname, date_time, kind) VALUES (1, 'Pam', 'Poovey', '2018-05-09 10:00:00', 'New Patient');