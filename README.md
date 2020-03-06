# spy-js blog posts and screencasts

* [Spy-js 2.0 features](http://blog.jetbrains.com/webstorm/2014/10/spy-js-2-0-new-level-of-javascript-tracing/)
* [Node.js support](http://blog.jetbrains.com/webstorm/2014/08/tracing-debugging-and-profiling-node-js-with-spy-js/)
* [Spy-js 1.0 features](http://blog.jetbrains.com/webstorm/2014/04/spy-js-webstorm-secret-service/)

# spy-js availability

The project is a part of IntelliJ product line, spy-js is bundled with WebStorm and IndelliJ IDEA Ultimate Edition and available as a [free downloadable plugin](http://plugins.jetbrains.com/plugin/7417) for PhpStorm, RubyMine and PyCharm Professional Edition. You can watch a 7 min [screencast here](http://www.youtube.com/watch?v=vPIbwxzC5cU) and read [a detailed feature walkthrough in WebStorm blog](http://blog.jetbrains.com/webstorm/2014/04/spy-js-webstorm-secret-service/).

# spy-js documentation
For full documentation please also visit [WebStorm web help](https://www.jetbrains.com/help/webstorm/debugging-with-spy-js.html).

This documentation covers various topics not covered (or covered briefly) in WebStorm web help, and contains:
* [Overview](#overview)
* [License](#license)
* [Installation notes](#installation)
* [Configuration documentation](#configuration)
	+ [Full configuration example](#full-example)
	+ [Tips](#configuration-tips)
* [PhantomJs](#phantomjs)
* [Karma Runner] (#karma-runner)
* [Development proxy (like Fiddler or Charles proxy) configuration](#development-proxy-configuration)
 	+ [HTTPS tracing configuration example](#https-tracing)
* [Mobile device proxy configuration](#mobile-device-configuration)
* [Virtual machine configuration](#virtual-machine-configuration)
* [Troubleshooting, known issues and limitations](#known-issues)

If something described in the documentation doesn't work for you, please check if it's one of the **[known issues](#known-issues)**. Feel free to ask your questions [on stackoverflow with spy-js tag](http://stackoverflow.com/questions/ask?tags=javascript+spy-js) or [in the repository issues](https://github.com/spy-js/spy-js/issues).

## Overview

In a nutshell, spy-js is a tool for JavaScript developers that allows to simply debug/trace/profile JavaScript when running on different platforms/browsers/devices. It fills gaps that existing browser development tools have and tackles common development tasks from a different angle.

## License
Documentation and code samples in this repository are licensed under MIT. Spy-js tool itself isn’t open source.

## Installation

To use WebStorm integration of spy-js: install latest WebStorm version. To use spy-js in PhpStorm, RubyMine and PyCharm Professional Edition: install [this plugin](http://plugins.jetbrains.com/plugin/7417) from JetBrains plugin repository.

## Configuration

Spy-js can work with zero configuration or be configured with *.conf.js configuration file.

Configuration code is just a simple valid JavaScript file.

```javascript
module.exports = function ($) {
	// $.configSetting1 = value1;
	// $.configSetting2 = value2;
	// many other settings
	// ...
};
```

In order to configure your session you use the passed in session configuration parameter ```$``` and assign its supported properties the desired values. If you've already used [grunt](http://gruntjs.com/), you'll find the process very similar.

#### Configuration settings

##### root (optional)
Root URL is a URL of the page/website you'd like to trace. Set it to isolate your session from receiving events from any other websites/pages.

```javascript
$.root = 'http://localhost:3002/';
```

##### mapper (optional)
URL mapper is one of the most important bits of the session configuration.
When given the URL for the script, the mapper function is supposed to return a configuration object for the script. The configuration object contains various settings affecting how the script should be processed by spy-js.

Mapper function can return different configuration objects for different script URLs.
Configuration object should have following structure:

```javascript
// configuration object
{
	instrument: true (default instrumentation settings used) 
		    | false (script will not be traced) 
		    | instrumentation settings object | not set (same as false)
}

// instrumentation settings object
{
	prettify: true | false (default) | not set (same as false),
	objectDump: false | dump settings object 
		    | not set (default, dump settings object with default settings used)
}

// dump settings object
{
	depth: number | not set (default 1 used),
	propertyNumber: number | not set (default 3 used),
	arrayLength: number | not set (default 3 used),
	stringLength: number | not set (default 50 used)
}
```

**```instrument```** property that specifies how the script from the given URL will be modified (if at all) and what data will be collected at runtime. Set the property to false to not trace the script. Set the property to true to use default values or specify the object with settings.

**```instrument.prettify```** property that specifies whether to make the script look nice in case it is minified or badly formatted.

**```instrument.objectDump```** property that specifies whether any runtime data (apart from stack trace) should be collected and to what extent. Set the property to false if you don't want to collect the runtime values. Don't set the property if you want to use default object dump settings or specify your own settings object.

**```instrument.objectDump.depth```** property that specifies how many levels of nesting within an object should be traversed and logged. 

**```instrument.objectDump.propertyNumber```** property that specifies how many first properties within an object should be logged (at any allowed level of logged object hierarchy).

**```instrument.objectDump.arrayLength```** property that specifies how many array elements should be logged (at any allowed level of logged object hierarchy).

**```instrument.objectDump.stringLength```** property that specifies the limit of number of characters in logged string properties.

For example, if a function in runtime returns something like

```javascript
[{
	a: {
      p1: true
    },
    b: 'abcdefghij',
    c: false
},
{
	a : {}
}]
```

and ```instrument.objectDump.depth``` is 2, ```instrument.objectDump.propertyNumber``` is 2, ```instrument.objectDump.arrayLength``` is 1 and ```instrument.objectDump.stringLength``` is 2, then in the stack trace or the code editor you'll be able to see following representation of the object:

```javascript
[
         0: 
         {
            a: {...}
            b: "ab..."
            ...
         }
         1: ...
]
```

Because of the depth constraint, we don't see the first array element "a" property value (level 1 is traversing array, level 2 is traversing its element); only see the two first properties of the first array element because of the property number constraint; only see the first two characters of the first array element "b" string property because of the string length constraint; only see the first array element object dump because of the array length constraint.

##### eventFilter (optional)
Event filter allows to specify what kind of events are captured and displayed in spy-js UI. There are five properties in the event filter object that you can set: globalScope, timeout, interval, events and noEvents.

With the following event filter, spy-js will show program execution scope (scripts loading), intervals, will not show timeouts, will show all events except blacklisted DOMContentLoaded and keyup. 

```javascript
$.eventFilter = {
    globalScope: true,
    timeout: false,
    interval: true,
    noEvents: ['DOMContentLoaded', 'keyup']
  };
```

With the following event filter, spy-js will not show program execution scope (scripts loading), will show intervals and timeouts, will only show whitelisted click and keyup events. 

```javascript
$.eventFilter = {
    globalScope: false,
    timeout: true,
    interval: true,
    events: ['click', 'keyup']
  };
```

#### Full example
Let's have a look at a complete sample of a configuration file to see how it all works together.

```javascript
module.exports = function ($) {

  $.root = 'http://localhost:3002/';

  $.mapper = function (url) {
    if (url.indexOf('jquery') >= 0) {
      return {
        instrument: false
      };
    }

    if (url.indexOf('underscore-1.4.4.min.js') >= 0) {
      return {
        instrument: {
          prettify: true,
          objectDump: false
        }
      };
    }

    return {
      instrument: {
        prettify: false,
        objectDump: {
          depth: 1,
          propertyNumber: 3,
          arrayLength: 3,
          stringLength: 50
        }
      }
    };
  };

  $.eventFilter = {
    globalScope: false,
    timeout: true,
    interval: true,
    events: ['click']
  };
};
```

The sample assumes that you have a locally hosted web project at ```http://localhost:3002/```.

Mapper above is configured not to trace jQuery (or any jQuery plugins or related scripts if they have "jquery" string in their URL). It is also configured to trace minified underscore library, prettify it, but not collect any runtime data from it. 

Mapper is not prettifying them because these are local scripts that are formatted nicely anyway and constraining object dumps to reasonably low limits to avoid any performance issues on the traced website (traversing objects and sending dumps across the wire does take additional time). 

When tracing the website, according to the specified event filter we'll only see the code executed by timeouts, intervals and click events.

#### Configuration tips
**For best performance**
* turn off prettifying for already nicely formatted non-minified files
* set reasonably low object dump limits
* exclude scripts you are not interested in by setting instrument to false. This can be done for example for libraries you wouldn't want to step in
* whitelist/blacklist events you would like/would not like to see by using event filter setting

It is recommended to save your session configuration file as spy.conf.js (or spy-all.conf.js/spy-nolibs.conf.js etc.) in your project folder and commit/check in your VCS system so the configuration could be shared across your project team.

## PhantomJs

PhantomJS is a headless WebKit, so simple spy-js configuration is sufficient to trace web pages loaded by it.

Please note, that because of [PhantomJs limitation](https://github.com/ariya/phantomjs/issues/11342), when you'd like to trace localhost, you should use your machine name instead.

In the example below I'll illustrate how to use spy-js to trace Jasmine tests running by PhantomJs from Grunt (using WebStorm Grunt console).

Create a new spy-js run configuration as on the screenshot below. Start the configuration.<br/>
![screen shot 2014-08-14 at 3 57 14 pm](https://cloud.githubusercontent.com/assets/979966/3916635/f40a2082-237d-11e4-9884-232294c6b208.png)

Create Gruntfile.js and Jasmine spec as illustrated below. Note that the machine name is used as the host and host name. Run default grunt task.<br/>
![screen shot 2014-08-14 at 4 14 55 pm](https://cloud.githubusercontent.com/assets/979966/3916427/6546af9e-237a-11e4-8a44-74c0def98304.png)

Switch to spy-js tool window to work with the trace.<br/>
![screen shot 2014-08-14 at 4 47 46 pm](https://cloud.githubusercontent.com/assets/979966/3916720/a721ec30-237f-11e4-9a8a-6bc364db3a60.png)

I'm also using the following capture exclusion to avoid noise from jasmine task generated files.<br/>
![screen shot 2014-08-14 at 4 38 40 pm](https://cloud.githubusercontent.com/assets/979966/3916625/c3b30584-237d-11e4-9df3-9bdf5afe26ce.png)

## Karma Runner

In the example below I'll illustrate how to use spy-js to trace Jasmine tests running with Karma runner in Chrome and PhantomJs.

Create a new spy-js run configuration as in the screenshot below. Start the configuration.<br/>
![screen shot 2014-08-14 at 3 57 14 pm](https://cloud.githubusercontent.com/assets/979966/3916635/f40a2082-237d-11e4-9884-232294c6b208.png)

Create karma.conf.js and Jasmine spec as illustrated below. Note that the machine name is used as the host name in order for PhantomJs to work.<br/>
![screen shot 2014-09-11 at 6 48 20 pm](https://cloud.githubusercontent.com/assets/979966/4244781/c8f799cc-3a27-11e4-8341-d32542d0ccf4.png)

Create and launch karma run configuration.<br/>
![screen shot 2014-09-11 at 6 49 31 pm](https://cloud.githubusercontent.com/assets/979966/4244782/c949af3c-3a27-11e4-995f-4452647ed6a5.png)

Wait till your test suite execution is finished.<br/>
![screen shot 2014-08-15 at 12 07 45 pm](https://cloud.githubusercontent.com/assets/979966/4244800/355b8c22-3a28-11e4-9965-24df9fe18077.png)

Switch to spy-js tool window to work with the trace.<br/>
![screen shot 2014-08-15 at 12 14 47 pm](https://cloud.githubusercontent.com/assets/979966/4244801/425a1d44-3a28-11e4-84e0-0e7e5d1b08ea.png)

I'm also using the following capture exclusion to avoid noise from library files.<br/>
![screen shot 2014-09-12 at 12 47 18 pm](https://cloud.githubusercontent.com/assets/979966/4244805/5ae90384-3a28-11e4-8530-5e41cbabc1df.png)

## Development proxy configuration
If you're using a development proxy, for instance to map minified files and replace them with local development versions, it is still possible to use spy-js to instrument and trace those development versions of JavaScript files.

In the example below it's illustrated how to make Fiddler work with spy-js in WebStorm. The idea is to request your non-minified files via spy-js proxy server using local proxy mode URLs. In the example I'll replace minified sh\_javascript.min.js file from nodejs.org with my version sh\_javascript.js using Fiddler and will trace sh\_javascript.js execution using spy-js.

Create a new spy-js run configuration, uncheck "Automatically configure system proxy" checkbox.<br/>
![screen shot 2014-06-26 at 12 59 01 pm](https://cloud.githubusercontent.com/assets/979966/3394356/017203be-fcde-11e3-8cda-55b56c4ceed2.png)

Configure AutoResponder in Fiddler as follows:<br/>
![screen shot 2014-06-26 at 2 01 26 pm](https://cloud.githubusercontent.com/assets/979966/3394639/ab84fffc-fce6-11e3-8130-db2817c34e95.png)

Start Fiddler and spy-js run configuration (the order doesn't matter), access the page in browser and see it being traced in WebStorm.

Note that localhost:3546 is the spy-js trace server launched by WebStorm, localhost:8080 is the address where your local non-minified files are hosted. I have used static [http-server](https://www.npmjs.org/package/http-server) to host them, but you can use any web server.

First AutoResponder rule uses a regular expression to replace all files like file.min.js with corresponding file.js, last two rules are mandatory to make spy-js work on the page.

#### HTTPS tracing
Even though spy-js itself doesn't support tracing HTTPS secured web pages, you can still use it for tracing with a tool that can do SSL termination, for example with a development proxy like Fiddler or Charles Proxy.

In the example below it's illustrated how to make Fiddler work with spy-js in WebStorm to trace HTTPS secured website. The idea is to use Fiddler to decrypt HTTPS traffic and request JavaScript files via spy-js proxy server using local proxy mode URLs. In the example I'll demonstrate how to set up Fiddler and spy-js to trace GitHub website. Other development proxies may need a different configuration, but the idea should still be applicable.

Create a new spy-js run configuration, uncheck "Automatically configure system proxy" checkbox.<br/>
![screen shot 2014-06-26 at 12 59 01 pm](https://cloud.githubusercontent.com/assets/979966/3394356/017203be-fcde-11e3-8cda-55b56c4ceed2.png)

Configure Fiddler to decrypt HTTPS traffic:<br/>
![screen shot 2014-09-30 at 11 37 30 am](https://cloud.githubusercontent.com/assets/979966/4452204/60424538-4843-11e4-97dd-093b023a3ea1.png)

Configure AutoResponder in Fiddler as follows:<br/>
![screen shot 2014-09-30 at 11 04 25 am](https://cloud.githubusercontent.com/assets/979966/4452220/acaeffd8-4843-11e4-93a4-d09d9c696c2a.png)

The first AutoResponder rule uses a regular expression to request all *.js files via spy-js proxy, the last two rules are mandatory to make spy-js work on the page.

Modify Fiddler rules (Rules - Customize Rules) as follows:<br/>
![screen shot 2014-09-30 at 11 05 19 am](https://cloud.githubusercontent.com/assets/979966/4452261/208fbe10-4844-11e4-9ba8-7a1f8e22b8b8.png)

The highlighted line just adds an additional HTTP response header; the header is required to configure Content Security Policy (for browsers that support it) to evaluate spy-js tracer code.

Start Fiddler and the spy-js run configuration (the order doesn't matter), access some HTTPS secured page in browser and see it traced in WebStorm.<br/>
![screen shot 2014-09-30 at 11 07 04 am](https://cloud.githubusercontent.com/assets/979966/4452344/2c5a51e6-4845-11e4-8644-95a2d0c8e186.png)

## Mobile device configuration
See configuration example for iOS in [spy-js WebStorm blog post](http://blog.jetbrains.com/webstorm/2014/04/spy-js-webstorm-secret-service/#mobile)

## Virtual machine configuration

If you are using a virtual machine, for instance on a develepment machine with Mac and WebStorm spy-js installed and hosting Windows VMs via Virtual Box, it is possible to use spy-js to trace web sites opened inside IE (or another browser) on VM instances and view the trace in your WebStorm.

First, create and start spy-js run configuration in WebStorm on your development machine. You can use default trace server port (3546), leave "URL to trace" field empty and not check "Automatically configure system proxy" checkbox (because the proxy configuration is not required on your development machine, it's required on the VM and will be performed manually).

Second, you need to configure your VM system proxy, for example see how to do it in [Windows](http://answers.oreilly.com/topic/675-how-to-configure-proxy-settings-in-windows-7/). The settings you'll need to specify are: 
* IP address of your development machine for the address (avoid using fake 10.0.2.2 IP address)
* spy-js run configuration trace server port for the port (3546, if you didn't change it)
* uncheck the "Bypass proxy server for local addresses" setting
* go to the "Advanced" settings and add <-loopback> string to the exceptions field down at the bottom

Now you can open any external website, like http://nodejs.org, in any browser on your VM and make sure it is being traced in WebStorm running on your development machine.

When you are tracing local sites (hosted on your development machine) and they hang, you may need to access them by the dev machine name or dev machine proper network IP address (instead of fake 10.0.2.2 IP address). Please note that the WebStorm built-in HTTP server doesn't support such access, so you may need to install and use some other development web server for this task, for example  static [http-server](https://www.npmjs.org/package/http-server).

To sum it up, if you have installed http-server (npm install http-server -g) and started it (by running http-server inside your application folder) using it's default port 8080, started described spy-js run configuration on your development machine (for instance named dev-box), configured your VM as described, opened a browser on the VM and accessed http://dev-box:8080, you should be able to see the the trace in your running WebStorm instance on your development machine.

## Known issues
If spy-js tracing doesn't work for you (and console output or log file doesn't contain any explanation), try this:
*  if you're using Chrome, when tracing session is running make sure chrome://net-internals/#proxy page "Effective proxy settings" is using spy-js-proxy.pac (if not, try re-applying the settings or clearing bad proxy list on the page if any)
* **do force refesh** (```Ctrl/Command + F5``` or ```Ctrl/Command + R```) on the traced page to make sure the traced website scripts are not cached in your browser
* tracing **scripts with incorrect (or without) Content-Type response header** is not supported. Some development web servers have default settings with incorrect Content-Type response header (or no Content-Type response header) for JavaScript files. Use your browser dev tools to check whether your script has correct Content-Type response header: ```text/javascript``` or ```application/x-javascript``` or ```application/javascript```.
* tracing **https** secured websites is not supported at the moment, however it is [possible to set up a development proxy to use with spy-js to trace HTTPS secured pages](#https-tracing)
* tracing HTML **pages with inline JavaScript** is not supported at the moment
* integrated windows authentication is not supported
* execution time figures display the time required to execute *modified code* and thus may significantly differ from the real figures; relatively to other spy-js collected performance metrics they make sense and may be used to identify and fix bottlenecks etc.; use target browser built-in profiler tools/v8 tools for node.js for precise figures
