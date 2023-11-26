const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});


const queryString = `
SELECT DISTINCT teachers.name as teacher, cohorts.name as cohort
FROM teachers
JOIN assistance_requests ON teacher_id = teachers.id
JOIN students ON student_id = students.id
JOIN cohorts ON cohort_id = cohorts.id
WHERE cohorts.name = 'JUL02'
ORDER BY teacher;
`;

const cohortName = [`%${process.argv[2]}%`];

pool.query(queryString, cohortName)
  .then(res => {
    res.rows.forEach(response => {
      console.log(`${response.cohort}: ${response.teacher}`);
    });
  })
  .catch(err => {
    console.log('err:', err.message);
  })