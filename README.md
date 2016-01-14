# Peanut Gallery

#### A student directory application built for Union College

## Feature List:

* List students
* View student
* Search students
* Authentication
  * passport-ldapauth
* Featured birthdays
* API?

## Routes

* `/`
  * Root. This lists all staff and students in a sortable table.
* `/student`
  * Lists all students in a sortable table.
* `/student/{ucid}`
  * Displays details for a specific student.
* `/student/{ucid}/edit`
  * Allows editing of a specific student entry.
* `/staff`
  * Lists all staff in a sortable table.
* `/staff/{ucid}`
  * Displays details for a specific staff.
* `/staff/{ucid}/edit`
  * Allows editing of a specific staff entry.
* `/birthdays`
  * Displays all students and staff born on the day viewed.
* `/categories`
  * Displays sorted tables by category. Probably not needed with the new sorttable.js
* `/search`
  * Allows searching all fields. Returns in a sortable table.

## Technologies

* Node.js
* Express
* Handlebars
* MongoDB
* Mongoose
