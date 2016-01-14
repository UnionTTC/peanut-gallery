var buildUrl = require('../../lib/build-url');

/**
 * link_to
 * =======
 *
 * A Handlebars helper for building links. Much magic lies herein.
 *
 * - path     : (Optional) A String for the path to link to. This is optional,
 *                and a URL to the current page will be used if none is provided.
 * - keepQuery: (Optional) A boolean identifying whether or not to maintain the
 *                query parameters currently in the URL. Defaults to `false`.
 *
 * You can contribute your own query parameters by specifying something like the
 * following:
 *
 *     <a href="{{link_to classStanding="Freshman"}}">Freshman</a>
 *
 * You can maintain the other query parameters in the URL by passing `true` as
 * the value for `keepQuery`, like:
 *
 *     <a href="{{link_to true page=next_page}}">Next</a>
 *
 * You can provide a body to the helper if you want to conditionally add the
 * active classname:
 *
 *     {{#link_to "/students/grid" true }}
 *       <li class="{{active}}"><a href="{{url}}">Grid</a></li>
 *     {{/link_to}}
 */
module.exports = function link_to(path, keepQuery, options) {
    // Use the current_page property as the default path if it exists in the
    // context, otherwise use an empty string.
    var defaultPath = this.current_page || '';

    // Support {{link_to true}} and {{link_to true page=next_page}}
    if (typeof path === 'boolean') {
        options = keepQuery;
        keepQuery = path;
        path = defaultPath;
    }
    // Support {{link_to classStanding="Freshman"}}
    if (typeof path === 'object') {
        options = path;
        keepQuery = false;
        path = defaultPath;
    }
    // Support {{link_to "/students/grid" classStanding="Freshman"}}
    if (typeof keepQuery === 'object') {
        options = keepQuery;
        keepQuery = false;
    }

    var url;
    if (keepQuery) {
        // Maintain the original query parameters in the URL.
        url = buildUrl(path, this.query, options.hash);
    }
    else {
        url = buildUrl(path, options.hash);
    }

    // Support {{#link_to ...}}<a href="{{url}} class="{{active}}">Hey!</a>{{/link_to}}
    if (options.fn) {
        // Would anything else be helpful here?
        var context = {
            url: url,
            active: (path === this.current_page) ? "active" : ""
        };
        return options.fn(context);
    }
    // Support <a href="{{link_to ...}}">Hey!</a>
    else {
        return url;
    }
};