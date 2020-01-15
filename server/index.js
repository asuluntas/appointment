const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database/index.js');

const app = express();
const port = 3001;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


app.get('/doctors', (req, res) => {
  db.getDoctors()
    .then((results) => {
        res.status(200).send(results[0]);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.get('/appointments/:id/:date', (req, res) => {
  const { id, date } = req.params;

  db.getAppointmentsByDoctorByDay(id, date)
    .then((results) => {
      res.status(200).send(results[0]);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.delete('/appointments/delete', (req, res) => {
  const { id } = req.body;

  db.deleteAppointment(id)
    .then((results) => {
      res.status(200).send(results[0]);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.post('/appointments/add', (req, res) => {
  const {date, time, doctor_id, patient_name, patient_lastname, kind} = req.body;

  let date_time = new Date(date + ' ' + time);
  let minutes = date_time.getMinutes();
  let seconds = date_time.getSeconds();

  if (minutes % 15 !== 0 || seconds !== 0) {
    res.send('Please select a valid time');
    return;
  } else {
    db.checkAppointments(date, time, doctor_id)
      .then((results) => {
        const appointments = results[0];
        return appointments;
      })
      .then((appointments) => {
        if (appointments.length < 3) {
          db.addAppointment(date, time, doctor_id, patient_name, patient_lastname, kind)
            .then((results) => {
              res.send(results[0]);
            })
        } else {
          res.send('Can not add more than 3 appointments');
        }
      })
      .catch((err) => {
        res.status(500).send(err);
      })
  }
});


app.listen(port, () => {
  console.log(`Server active! Listening on port ${port}.`)
});
