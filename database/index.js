const Promise = require('bluebird');
const mysql = require('mysql');
const mysqlConfig = require('./config.js');

const connection = mysql.createConnection(mysqlConfig);
const db = Promise.promisifyAll(connection, { multiArgs: true });

db.connectAsync()
  .then(() => console.log('Connected to the database'))
  .error((err) => { console.log('Error connecting to database', err); });

module.exports = db;

const getDoctors = () => {
  const queryString = 'SELECT id, name, lastname from doctors';
  return db.queryAsync(queryString);
};

const getAppointmentsByDoctorByDay = (id, date) => {
  const queryString = `SELECT * from appointments WHERE doctor_id=${id} and DATE(date_time)=${date}`;
  const params = [id, date];
  return db.queryAsync(queryString, params);
};

const deleteAppointment = (id) => {
  const queryString = `DELETE FROM appointments WHERE id=${id}`;
  const params = [id];
  return db.queryAsync(queryString, params);
};

const checkAppointments = (date, time, doctor_id) => {
  const queryString = `SELECT * from appointments WHERE doctor_id=${doctor_id} and DATE(date_time)='${date}' and TIME(date_time)='${time}'`;
  const params = [date, time, doctor_id];
  return db.queryAsync(queryString, params);
};

const addAppointment = (date, time, doctor_id, patient_name, patient_lastname, kind) => {
  const date_time = new Date(date + ' ' + time);
  const queryString = `INSERT INTO appointments (doctor_id, patient_name, patient_lastname, date_time, kind) VALUES (?, ?, ?, ?, ?)`;
  const params = [doctor_id, patient_name, patient_lastname, date_time, kind];
  return db.queryAsync(queryString, params);
};

module.exports = {
  getDoctors,
  getAppointmentsByDoctorByDay,
  deleteAppointment,
  checkAppointments,
  addAppointment
}
