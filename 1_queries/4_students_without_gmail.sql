SELECT name, email, id, cohort_id
FROM students
WHERE email != '%gmail.com'
OR phone IS NULL;