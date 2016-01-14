var express = require('express');

var router = module.exports = express.Router();

// 404 Page Not Found handler
router.use(function(req, res) {
    console.warn('404 Not Found: %s', req.originalUrl);
    res.status(404).render('error', {
        notification: {
            severity: "error",
            title: "404 - Page Not Found",
            message: "Sorry! The page you requested doesn’t exist. Here is a cat instead."
        },
        title: "404 - Page not found"
    });
});
