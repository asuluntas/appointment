const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database/index.js');

const app = express();
const port = 3001;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


app.get('/doctors', (req, res) => {
  db.getDoctors((err, results) => {
    if (err) {
      console.log(err);
    } else {
      res.send(results);
    }
  });
});

app.get('/appointments/:id/:date', (req, res) => {
  const {id, date} = req.params;
  db.getAppointmentsByDoctorByDay(id, date, (err, results) => {
    if (err) {
      console.log(err);
    } else {
      res.send(results);
    }
  });
});

app.delete('/appointments/delete', (req, res) => {
  const {id} = req.body;
  db.deleteAppointment (id, (err, results) => {
    if(err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      res.send(results);
    }
  });
});

app.post('/appointments/add', (req, res) => {
  let {date, time, doctor_id, patient_name, patient_lastname, kind} = req.body;
  db.addAppointment(date, time, doctor_id, patient_name, patient_lastname, kind, (err, results) => {
    if (err) {
      console.log(err);
    } else {
      console.log('POST successful! results: ', results);
      res.send(results);
    }
  });
});


// app.get('/patients/:id', (req, res) => {
//   const {id} = req.params;
//   db.getData(id, (err, results) => {
//     if (err) {
//       console.log(err);
//     } else {
//       res.send(results);
//     }
//   });
// });


// app.post('/patients/add', (req, res) => {
//   let {name, lastname} = req.body;
//   db.addData(name, lastname, (err, results) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log('POST successful! results: ', results);
//       res.send(results);
//     }
//   });
// });


// app.delete('/patients/delete', (req, res) => {
//   const {id} = req.body;
//   db.deleteData(id, (err, results) => {
//     if(err) {
//       console.log(err);
//       res.sendStatus(500);
//     } else {
//       res.status(200).json(results);
//     }
//   });
// });


app.listen(port, () => {
  console.log(`Server active! Listening on port ${port}.`)
});
