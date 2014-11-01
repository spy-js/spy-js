// Configuration file sample
module.exports = function($) {
  
  // URL to trace (optional)
  // $.root = 'http://todomvc.com/architecture-examples/knockoutjs/';

  // in mapper function you can configure whether to trace certain scripts and how
  // by returning configuration object for the script(s) URL
  $.mapper = function(url) {
    
    // no tracing for files that contain jquery in their names (jquery and plugins)
    if (url.indexOf('jquery') >= 0) 
      return {
        instrument: false
      };

    // Add more rules for scripts as required
    
    // To achieve best tracing performance and more accurate profiling figures:
    //    instrument only scripts you'll be looking into (set instrument: false for those you're not interested in)
    //    do not prettify scripts that already looked ok (not minified, formatted nicely)
    //    set objectDump property to false for scripts where you don't need to trace function params and return values
    //    set minimum necessary limits inside objectDump property for scripts where need to trace function params and return values

    // Following configuration means that the rest of scripts are traced,
    // prettified,
    // function params and return values collected 
    // (object depth: 1 level, maximum 3 properties or array elements, strings are truncated if more than 50 chars)
    return {
      instrument: {
        prettify: true,
        objectDump: {
          depth: 1,
          propertyNumber: 3,
          arrayLength: 3,
          stringLength: 50
        }
      }
    };
  };

  // with event filter you specify what you want and don't want to see in events list,
  // for example with the following event filter
  // spy-js will show program execution scope(s), intervals, will not show timeouts, 
  // will only show all events except blacklisted DOMContentLoaded and keyup (use events: [...] to whitelist events to show)
  $.eventFilter = {
    globalScope: true,
    timeout: false,
    interval: true,
    noEvents: ['DOMContentLoaded', 'keyup']
  };
};
