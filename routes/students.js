var express = require('express')
var url = require('url')
var pick = require('lodash.pick')
var debug = require('../lib/debug')

var Student = require('../models/student.js')

var router = module.exports = express.Router()

// Add a new student
router.get('/students/add', function (req, res, next) {
  res.render('student/student_add', {
    title: 'New Student',
    path: req.path
  })
})

// Edit student info
router.get('/students/:ucid/edit', function (req, res, next) {
  Student.findOne({
    ucid: req.params.ucid
  }, function (err, student) {
    if (err) {
      // Pass along error
      return next(err)
    }
    if (student) {
      res.render('student/student_add', {
        title: 'Edit Student',
        students: student
      })
    } else {
      res.render('student/student', {
        title: 'Student does not exist.',
        notification: {
          severity: 'error',
          message: 'No student exists with that id.'
        }
      })
    }
  })
})

// Save student information
router.post('/students/add', saveStudent)
router.post('/students/:ucid/edit', saveStudent)

function saveStudent (req, res, next) {
  if (req.body.action === 'delete') {
    debug.log('Deleting student.')
    return deleteStudent(req, res, next)
  }

  Student.findOne({
    ucid: req.params.ucid
  }, function (err, student) {
    if (err) {
      // Pass along error
      return next(err)
    }

    if (!student) {
      debug.log('Creating new student.')
      student = new Student()
    }

    debug.log('Editing student.')
    var studentInfo = pick(req.body, 'ucid ucName nameFirst nameLast classStanding major minor dateBirth residenceHall residenceNumber phoneNumber homeTown homeState homeCountry gradDate quote gender'.split(' '))
    student.set(studentInfo)
    student.save(function (err) {
      if (err) {
        res.render('student/student_add', {
          students: student,
          notification: {
            severity: 'error',
            message: 'Could not save student: ' + student.nameFirst + ' ' + student.nameLast
          }
        })
      } else {
        res.redirect('/students')
      }
    })
  })
}

function deleteStudent (req, res, next) {
  Student.findOne({
    ucid: req.params.ucid
  }, function (err, student) {
    if (err) {
      // Pass along error
      return next(err)
    }
    if (student) {
      Student.remove(student, function (err) {
        if (err) {
          res.render('student/studentEdit', {
            title: 'New Student',
            notification: {
              severity: 'error',
              message: 'Could not delete student: ' + err
            }
          })
        } else {
          res.redirect('/students')
        }
      })
    } else {
      res.redirect('/students')
    }
  })
}

// Set page size for students/grid
router.use('/students/grid', function (req, res, next) {
  req.pageSize = 12
  next()
})

// Middleware to help with searching, links, etc.
router.use('/students/*', function (req, res, next) {
  Student.query(req.query).count(function (err, count) {
    if (err) {
      return next(err)
    } else {
      res.locals.current_page = url.parse(req.originalUrl).pathname
      if (req.pageSize) {
        var page = parseInt(req.query.page, 10) || 1
        var nextPage = (count > (req.pageSize * page) ? page + 1 : 0)
        var prevPage = (page) ? page - 1 : 0
        res.locals.next_page = nextPage
        res.locals.prev_page = prevPage
      }
      if (req.query) {
        res.locals.query = pick(req.query, 'gender', 'classStanding', 'residenceHall', 'page', 'name')
      }
      next()
    }
  })
})

// Redirect to /students/grid
router.get('/students', function (req, res, next) {
  res.redirect('/students/grid')
})

// Shows all students in table form.
router.get('/students/table', function (req, res, next) {
  Student.query(req.query).sort('nameLast nameFirst').exec(function (err, students) {
    if (err) {
      return next(err)
    }
    res.render('student/students_table', {
      title: 'Students',
      students: students
    })
  })
})

// Shows all students in grid form.
router.get('/students/grid', function (req, res, next) {
  Student.query(req.query, req.pageSize).sort('nameLast nameFirst').exec(function (err, students) {
    if (err) {
      return next(err)
    }
    res.render('student/students_grid', {
      title: 'Students',
      students: students
    })
  })
})

// Register the the students/:ucid route.
// Shows specific student in block form.
router.get('/students/:ucid', function (req, res, next) {
  Student.findOne({
    ucid: req.params.ucid
  }, function (err, student) {
    if (err) {
      // Pass along error
      return next(err)
    }
    if (student) {
      res.render('student/student.hbs', {
        title: 'Student',
        students: student,
        layout: (req.query.partial) ? false : 'layout'
      })
    } else {
      res.render('student/student', {
        title: 'Student does not exist.',
        notification: {
          severity: 'error',
          message: 'No student exists with that id.'
        }
      })
    }
  })
})
