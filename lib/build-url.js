var url = require('url')
var merge = require('lodash.merge')
var slice = Array.prototype.slice

// Build a URL to a path, and merge additional arguments
module.exports = function buildUrl (pathname) {
  var query = {}
  if (arguments.length > 1) {
    slice.call(arguments, 1).reduce(function (query, e) {
      return merge(query, e), query
    }, query)
  }
  return url.format({
    pathname: pathname,
    query: query
  })
}
