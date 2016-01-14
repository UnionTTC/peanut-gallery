var timestamp = function() {};
timestamp.toString = function() {
    return "[DEBUG " + (new Date).toLocaleTimeString() + "]";
};
module.exports = {
    log: console.log.bind(console, '%s', timestamp)
};