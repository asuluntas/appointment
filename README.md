# Appointment

# npm install
# npm run seed
# npm run start
# Requires Node.js and mysql running.

# Examples:
#  GET: http://localhost:3001/doctors
#  GET: http://localhost:3001/appointments/1/'2018-05-09'
#  DELETE: http://localhost:3001/appointments/delete (Request body: { "id" : 1 })
#  POST: http://localhost:3001/appointments/add (Request body: { "date" : "2018-05-09", "time" : "09:00:00", "doctor_id" : 2 "patient_name" : "John", "patient_lastname" : "Miller", "kind" : "Follow-up" })