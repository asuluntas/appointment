const mysql = require('mysql');
const mysqlConfig = require('./config.js');

const connection = mysql.createConnection(mysqlConfig);

const getDoctors = function(callback) {
  connection.query(`SELECT id, name, lastname from doctors`, function(err, results) {
    callback(err, results);
  });
}

const getAppointmentsByDoctorByDay = function(id, date, callback) {
  connection.query(`SELECT * from appointments WHERE doctor_id=${id} and DATE(date_time)=${date}`, function(err, results) {
    callback(err, results);
  });
}

const deleteAppointment = function(id, callback) {
  connection.query(`DELETE FROM appointments WHERE id=${id}`, function(err, results) {
    callback(err, results);
  });
}

const addAppointment = function(date, time, doctor_id, patient_name, patient_lastname, kind, callback) {
  let date_time = new Date(date + ' ' + time);
  let minutes = date_time.getMinutes();
  let seconds = date_time.getSeconds();
  if (minutes % 15 !== 0 || seconds !==0) {
    callback('invalid time selected for the appointment', []);
    return;
  }
  connection.query(`SELECT COUNT(*) from appointments WHERE doctor_id=${doctor_id} and DATE(date_time)=${date} and TIME(date_time)=${time}`, function(err, results) {
    if (results >= 3) {
      callback('3 or more appointments already', []);
      return;
    }
    connection.query(`INSERT INTO appointments (doctor_id, patient_name, patient_lastname, date_time, kind) VALUES (?, ?, ?, ?, ?)`, [doctor_id, patient_name, patient_lastname, date_time, kind], function(err, results) {
          callback(err, results);
        });
  });
}

module.exports = {
  getDoctors,
  getAppointmentsByDoctorByDay,
  deleteAppointment,
  addAppointment
}
