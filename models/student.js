var mongoose = require('mongoose');

/**
 * Student
 * ---------------
 * Student objects contain information on the student.
 *
 * A Student is primarily a UCID with associated metadata and image gathered
 * from Self-Service.
 */
var schema = new mongoose.Schema({
    /**
     * ucid - A Number to serve as a unique identifier. This number is generated
     * by Self-Service.
     */
    ucid: String,

    /**
     * imagePath - A file path to the location of the student's image. Could be
     * referenced using a combination of a root path and the ucid.
     */
    //    imagePath: String,

    /**
     * name - A String containing the student's first name.
     */
    nameFirst: String,

    /**
     * name - A String containing the student's last name.
     */
    nameLast: String,

    /**
     * classStanding - A string containing the student's class standing as a
     * number.
     */
    classStanding: String,

    /**
     * classStanding - A string containing the student's class standing as a
     * number.
     */
    major: String,

    /**
     * classStanding - A string containing the student's class standing as a
     * number.
     */
    minor: String,

    /**
     * classStanding - A string containing the student's class standing as a
     * number.
     */
    dateBirth: String,

    /**
     * classStanding - A string containing the student's class standing as a
     * number.
     */
    residenceHall: String,

    /**
     * classStanding - A string containing the student's class standing as a
     * number.
     */
    residenceNumber: String,

    /**
     * classStanding - A string containing the student's class standing as a
     * number.
     */
    phoneNumber: String, //Number?

    /**
     * classStanding - A string containing the student's class standing as a
     * number.
     */
    homeTown: String,

    /**
     * classStanding - A string containing the student's class standing as a
     * number.
     */
    homeState: String,

    /**
     * classStanding - A string containing the student's class standing as a
     * number.
     */
    homeCountry: String,

    /**
     * gradDate - The expected graduation date.
     */
    gradDate: String,

    /**
     * quote - A String to hold the user's personal quote for the PG. Request
     * more than 30 characters.
     */
    quote: String,

    gender: String
});

// Perform a .find() based on the passed parameters.
schema.statics.query = function(query, limit, callback) {
    if (typeof limit === 'function') {
        callback = limit;
        limit = undefined;
    }
    var queryBuilder = this.find();

    /* Query Parameters */
    if (query.gender) {
        queryBuilder.where('gender').equals(query.gender);
    }
    if (query.classStanding) {
        queryBuilder.where('classStanding').equals(query.classStanding);
    }
    if (query.residenceHall) {
        queryBuilder.where('residenceHall').equals(query.residenceHall);
    }
    if (query.name) {
        try {
            var result = new RegExp("^" + query.name, 'i');
            queryBuilder.where({
                $or: [{
                    nameFirst: result
                }, {
                    nameLast: result
                }]
            });
        }
        catch (err) {
            // Do not filter, just log regexp error.
            console.error(err);
        }
    }
    // Paging
    if (limit) {
        var page = parseInt(query.page, 10) || 1;
        var pageSize = limit;
        var previousPage = page - 1;
        queryBuilder.limit(pageSize).skip(previousPage * pageSize);
    }

    return queryBuilder;
};

var student = mongoose.model('student', schema);
module.exports = student;