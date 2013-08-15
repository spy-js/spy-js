# spy-js documentation

The documentation contains:
* [Overview](#overview)
* [License](#license)
* [Installation notes](#installation)
* [Quick start tutorial](#quick-start-and-tutorial)
	+ [Events](#events)
	+ [Stack](#stack)
	+ [Code](#code)
* [Sessions notes](#sessions)
	+ [Global session](#global-session)
	+ [File driven session](#file-configured-session)
	+ [Proxy modes](#proxy-modes)
* [Configuration documentation](#configuration)
	+ [Full configuration example](#full-example)
	+ [Tips](#configuration-tips)
* [Troubleshooting and known issues](#known-issues)

If something described in the documentation doesn't work for you, please check that it's not one of the [known issues](#known-issues). Feel free to ask your questions [on stackoverflow with spy-js tag](http://stackoverflow.com/questions/ask?tags=javascript+spy-js) or [in the repository issues](https://github.com/spy-js/spy-js/issues).

## Overview

In a nutshell, spy-js is a tool for JavaScript developers that allows to simply debug/trace/profile JavaScript on running on differents platforms/browsers/devices. It fills gaps that existing browser development tools have and tackles common development tasks from a different angle.

![spy-js diagram](http://spy-js.com/assets/img/diagram.png)

## License
Documentation and code samples in this repository are [licensed under MIT](https://github.com/spy-js/spy-js/blob/master/LICENSE).

spy-js tool itself isn’t open source, but I intend to keep it free while I collect beta feedback. Please refer to the tool EULA and [this article](http://spy-js.com/why.html) for more details. 

## Installation
Install node.js v0.8 or newer from [nodejs website](http://nodejs.org).

Download latest version from [spy-js website](http://spy-js.com) and extract it from downloaded archive.

## Quick start and tutorial
Start spy-js by running the command from the folder where you have extracted downloaded archive to:
```shell
node spy
```
Windows users can run spy-js.exe instead, it's a tray application that manages spy-js state and configuration.

Running the command (or spy-js tray application) will start spy-js HTTP server on port 3546. Use -p argument (or tray application) to specify different port.

In default system proxy mode spy-js has to be configured to be entire system/browser proxy. Windows tray application users don't need to do this manually, the tray application can turn on and off the system proxy mode (context menu - configure - use system proxy). Other platform users (and windows users not using the tray application for any reason)  need to configure system proxy settings on [Windows](http://answers.oreilly.com/topic/675-how-to-configure-proxy-settings-in-windows-7/), [Mac](http://support.apple.com/kb/PH7050), [Ubuntu](http://www.ubuntugeek.com/how-to-configure-ubuntu-desktop-to-use-your-proxy-server.html), [iOS](http://www.allanonymity.com/billing/knowledgebase/11/How-to-configure-proxy-usage-for-iPadorIphone.html), [Android](http://support.tabpilot.com/customer/portal/articles/937845-how-to-set-proxy-server-settings-in-android), [Windows Phone](http://forum.xda-developers.com/showthread.php?t=1106268) to use localhost:3546 as a proxy server. 

System proxy mode is not the only mode supported, **if you don't like the idea of changing system/browser proxy settings**, please read [sessions section](#sessions) to see how to use local proxy mode instead.

After starting spy-js server and configuring proxy settings, open the tool UI in browser (UI URL will be displayed in console output, by default it's [http://localhost:3546/](http://localhost:3546/)). Windows tray application users should see the UI opening automatically once they start the tray application.

Click "start session" button in start-up dialog, then open any website you'd like to trace in another browser window.

![spy-js new session](http://spy-js.com/assets/img/session.png)

Perform any actions you'd like to be traced and then have a look into spy-js UI to start inspecting occured events.

The UI contains three resizable main panes - events, stack and code.

![spy-js main UI](http://spy-js.com/assets/img/main.png)

### Events
In the events pane (leftmost) you can see the traced code events as they occur. Each event link contains execution time and name. By hovering your mouse over an event information icon, you can see additional event details, like what script files code has been executed as a result of the event triggering. Script file names have different colours to help distinguishing between them when working with the stack pane. By hovering your mouse over a script file name, you can see the full script URL.

Events of the same type are grouped into visual containers. The header of the container displays average execution time across all events within the container, event name and number of events inside the container. By clicking plus icon, you can expand the container and inspect individual events.

![spy-js events pane](http://spy-js.com/assets/img/events.png)

### Stack
Once some event in the events pane is clicked, its call stack is displayed in the stack pane (in the middle). The stack is represented in the pane by a tree of function calls. 

Each tree node represents invoked function. Node text contains total execution time, script file name and the function name. By hovering your mouse over the information icon, you can see additional function call details, like the number of statements and invoked functions, parameter values and return value, occurred exception details if there was one during the function execution.

Some tree nodes (functions that called other functions) can be expanded. If the expanded tree node contains too many children (invoked functions), some of them will not be displayed immediately. To see those children, click the link with "X item(s)" text in the desired tree level. Alternatively, hover your mouse over the information icon next to the "X item(s)" link and you will see a brief list of invoked functions without having to expand the node.

The stack pane is searchable. Above the pane there is a search textbox. Start typing the function name you're looking for and the textbox will suggest function names that may satisfy your search. By selecting desired function name and pressing Enter, you'll see the first found instance expanded in the tree, scrolled to and highlighted. By continuing pressing Enter, you'll find and expand the rest of the function occurrences.

![spy-js stack pane](http://spy-js.com/assets/img/stack.png)

### Code
Once the function you're interested in is located in the stack tree and clicked, its source code will be opened in the source pane and its execution path will be highlighted. Executed function has yellow background (or red if there's any uncaught exception occurred during the function execution), executed statements are green. Global/program scope execution is displayed using blue background.

By hovering your mouse over function keyword or return keyword or named parameters of the function, you'll be able to see the values that have been passed to the function or returned from the function when it has been executed. Please note that even if there're no function parameters explicitly declared, you can still see what was passed to the function by hovering your mouse over function keyword.

The code pane is searchable. Click the magnifier icon at the top right corner on the pane or press [Ctrl/Command + F] when the code editor has focus to search the opened code file.

![spy-js code pane](http://spy-js.com/assets/img/code_pane.png)

### Miscellaneous
At the bottom right corner you can find action icons: refresh and configure. 

Refresh icon click clears all trace information from the screen. 

Configure icon click opens current session configuration code editor. See more details about sessions below, also see  how to configure tracing session in [Configuration section](#configuration).

## Sessions

Tracing in spy-js is session based. When you open spy-js UI, it creates a new session for you. You can open as many websites/sessions as you like while having just a single spy-js server running. Having said that, you can also start multiple spy-js servers on different ports if you need to. Once spy-js UI is opened in a browser of your choice, the first thing you see is new session configuration dialog. 

### Global session
You can start global session without specifying any configuration just be clicking "start session" button in the start-up dialog. The session will trace all scripts from proxied traffic using default configuration parameters. In order to work, global session needs spy-js to work in [system proxy mode](#system-proxy) because it has to capture all traffic from all open browsers, hence the name "global".

After starting a global session, at any moment you can change its configuration by clicking "configure" icon at the bottom right corner of the screen and modifying [session configuration code](#configuration). Please note that your changes to the global session configuration will only be saved temporarily until your browser window with spy-js UI is refreshed. To use persistent configuration files for your sessions, save your configuration file somewhere and reuse it later by entering or selecting its path on the start-up dialog. Recommended place to save the file is in your project folder, recommended name is spy.js; you can also consider checking it in your VCS to share across your team.

### File configured session
If you already have a saved configuration file, you can paste its location path into the start-up dialog textbox or select it from the list of recently used configurations and start the session by clicking "start session" button. At any moment you can change the session configuration by clicking "configure" icon at the bottom right corner of the screen and modifying configuration code in spy-js built-in code editor. Please note that your changes will be saved to the selected session configuration file. Alternative way of changing session configuration is just editing the configuration file in your favourite text editor. spy-js monitors the file for changes and automatically updates the session configuration when the file is changed.

It is recommended to use file based configuration for your sessions as opposed to using global session. With file based configuration you can change, save and commit session settings to reuse later or across your team, also with file based configuration you can use local proxy mode and not touch your system/browser proxy settings while global session by default only works in [system proxy mode](#system-proxy).

### Proxy modes
In order to trace your website scripts, spy-js has to modify them on the fly. The modification doesn't affect your scripts logic, it's just inserting instrumentation instructions that are reporting back to spy-js UI about what functions have been invoked when your script executes. In order to get a chance to modify your scripts, spy-js has to act as a proxy server that sits between your browser and the website you're tracing. When you open traced website in your browser, spy-js receives script request, requests the script from your website, receives the script, makes required modifications and sends it back to your browser where the script executes and sends runtime information to spy-js UI (via spy-js server).

As you can see from the explanation above, spy-js acts as a proxy server. There are two proxy modes spy-js can work in: system proxy mode and local proxy mode.

#### System proxy
In system proxy mode spy-js is configured to be entire system/browser proxy. This way it can capture all traffic and modify all scripts, including CDN references. [Global session](#global-session) can only works in the system proxy mode. To make spy-js work in this mode you'll need to configure browser/network proxy settings to use spy-js URL (defaults: host localhost, port 3546). Windows tray application users don't need to do it manually, the tray application can turn on and off system proxy mode (context menu - configure - use system proxy). See how to configure proxy settings manually on [Windows](http://answers.oreilly.com/topic/675-how-to-configure-proxy-settings-in-windows-7/), [Mac](http://support.apple.com/kb/PH7050), [Ubuntu](http://www.ubuntugeek.com/how-to-configure-ubuntu-desktop-to-use-your-proxy-server.html), [iOS](http://www.allanonymity.com/billing/knowledgebase/11/How-to-configure-proxy-usage-for-iPadorIphone.html), [Android](http://support.tabpilot.com/customer/portal/articles/937845-how-to-set-proxy-server-settings-in-android), [Windows Phone](http://forum.xda-developers.com/showthread.php?t=1106268). Please note that some desktop browsers have their own proxy settings configuration screen.

#### Local proxy
In local proxy mode spy-js doesn't need to change any system settings. Local proxy mode can be enabled for particluar session in [its configuration](#configuration) by simply setting local proxy port:

```javascript
$.root = 'http://localhost:8080/';
$.proxy = 3000;
```
It means that if your website is locally hosted at http://localhost:8080/, when you'd like to trace it, you open  http://localhost:3000/. At http://localhost:3000/ you'll see your http://localhost:8080/ website but it will be traced by spy-js. After performing some actions on your website at http://localhost:3000/, you'll be able to inspect captured events using opened spy-js UI (by default it's http://localhost:3546/). At the same time you can browse normal non-traced version of your site at http://localhost:8080/.

As opposed to system proxy mode, local proxy mode has one limitation in what it can trace. In local proxy mode only local scripts can be traced and not CDN referenced ones because external reference requests are not going through the local proxy and cannot be intercepted for the code modification. For example, if on your page you are using locally hosted jQuery version referenced like:
```html
<script type="text/javascript" src="scripts/libs/jquery-1.9.1.js"></script>
```
then it can be traced (unless you don't want it in which case you can exclude it from being traced in [configuration file](#configuration)).
But if you reference the library or any other script from CDN, like:
```html
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
```
then it will not be traced.

#### Selecting proxy mode
When choosing between system and local proxy mode, consider the task you need to perform. If you want to learn how some external website works by tracing its pages with potentially lots of CDN references and don't want to bother creating any session configuration files and want to just quickly use global session, then system proxy is your choice. If you trace your locally hosted project in your local dev environment and perhaps have specific session configuration shared across your team and don't want to bother turning on and off system wide proxy settings, then local proxy mode is your choice.

#### Mapping to local files
In local proxy mode (as well as in system proxy mode) you can map scripts you trace to local files. It may be handy when you're in development phase and are actively changing your scripts and tracing them at the same time. Normally spy-js instruments and caches modified code in the session cache, but when dealing with locally mapped files spy-js will be watching them for changes, re-instrumenting changed ones and updating the cache. See [configuration section](#configuration) for more details on how to do this. 

## Configuration

Tracing session in spy-js can be configured by clicking "configure" icon at the bottom right corner of the screen. Clicking the icon brings up the configuration code editor. You can use any text editor to open and modify the configuration file code directly from your file system.

![spy-js configuration](http://spy-js.com/assets/img/config.png)

Configuration code is just a simple valid JavaScript file.
```javascript
module.exports = function ($) {
	// $.configSetting1 = value1;
	// $.configSetting2 = value2;
	// many other settings
	// ...
};
```
In order to configure your session you use session configuration parameter ($) passed and assign its supported properties desired values. If you've already used [grunt](http://gruntjs.com/), you'll find the process very similar.

#### Configuration settings

##### name (optional)
Trace name is displayed at the top left corner of the screen (and in the page title) and allows you to easier understand what session you're working with if you have multiple browser windows with multiple sessions opened.
```javascript
$.name = 'trace name';
```

##### root (optional, but must be specified if not using system proxy mode)
Root URL is a URL of the page/website you'd like to trace. Set it to isolate your session from receiving events from any other websites/pages. Root URL must be set if using [local proxy mode](#local-proxy) via $.proxy.
```javascript
$.root = 'http://localhost:3002/';
```

##### proxy (optional, but must be specified if not using system proxy mode)
Proxy port is used in [local proxy mode](#local-proxy) along with $.root.
So specifying:
```javascript
$.root = 'http://localhost:3002/';
$.proxy = 3003;
```
will leave http://localhost:3002/ available as it is, and host traced version of http://localhost:3002/ at http://localhost:3003/. http://localhost:3003/ should be opened and used along with spy-js UI to trace events.

##### local (optional)
Local project root is used to map scripts to local files so that spy-js can monitor those file changes and update instrumented code. Local project root is used by $.mapper for URLs that specify "local" property.
```javascript
$.local = 'c:\\myproject\\scripts\\';
```

##### mapper (optional)
URL mapper is one of the most important bits of the session configuration.
By given URL of the script, mapper function is supposed to return configuration object for the script. The configuration object contains various settings affecting how the script should be processed by spy-js.

Mapper function can return different configuration objects for different script URLs.
Configuration object should have following structure:
```javascript
// configuration object
{
	local: true | false | string (path) | not set or empty string (default),
	instrument: true (default instrumentation settings used) | false (script will not be traced) | instrumentation settings object | not set (same as false)
}

// instrumentation settings object
{
	prettify: true | false (default) | not set (same as false),
	objectDump: false | dump settings object | not set (default, dump settings object with default settings used)
}

// dump settings object
{
	depth: number | not set (default 1 used),
	propertyNumber: number | not set (default 3 used),
	arrayLength: number | not set (default 3 used),
	stringLength: number | not set (default 50 used)
}
```

**local** property specifies whether spy-js should map the URL to local file, track the local file changes and re-instrument it when the file changes. By default, spy-js instruments all scripts just once and caches them, but if the local file mapping is created, spy-js will update the cache when required. 

The property can either specify a path to the local file, or just have a true value, in which case the local file will be automatically discovered as follows: $.local will be used as a local root along with current URL path (relative to $.root). For example, if we have following configuration:
```javascript
module.exports = function ($) {

  $.root = 'http://localhost:3002/';

  $.local = 'c:\\myproject\\';

  $.mapper = function (url) {
    return {
      local: true,
      instrument: {
        prettify: true,
      }
    };
  };
};
```
and open http://localhost:3002/ page that references http://localhost:3002/scripts/main.js, then spy-js will try to map requested main.js script to local file at "c:\\myproject\\" ($.local) + "scripts\\main.js" (path from URL relative to $.root).

**instrument** property specifies how the script from given URL will be modified (if at all) and what data will be collected in runtime. Set the property to false to not trace the script. Set the property to true to use default values or specify the object with settings.

**instrument.prettify** property specifies whether to make the script look nice in case if it is minified or badly formatted.

**instrument.objectDump** property specifies whether any runtime data (apart from stack trace) should be collected and to what extent. Set the property to false if you don't want to collect the runtime values. Don't set the property if you want to use default object dump settings or specify your own settings object.

**instrument.objectDump.depth** property specifies how many levels of nesting within an object should be traversed and logged. 

**instrument.objectDump.propertyNumber** property specifies how many first properties within an object should be logged (at any allowed level of logged object hierarchy).

**instrument.objectDump.arrayLength** property specifies how many array elements should be logged (at any allowed level of logged object hierarchy).

**instrument.objectDump.stringLength** property specifies limit of number of characters in logged string properties.

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
and instrument.objectDump.depth is 2, instrument.objectDump.propertyNumber is 2, instrument.objectDump.arrayLength is 1 and instrument.objectDump.stringLength is 2, then in the stack trace or the code editor you'll be able to see following representation of the object:
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

Because of the depth constraint, we don't see the first array element "a" property value (level 1 is traversing array, level 2 is traversing its element); only see two first properties of the first array element because of the property number constraint; only see the first two characters of the first array element "b" string property because of the string length constraint; only see the first array element object dump because of the array length constraint.

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
Let's have a look at the full sample of a configuration file to see how it all works together.

```javascript
module.exports = function ($) {

  $.name = 'my project';

  $.root = 'http://localhost:3002/';

  $.proxy = 3004;

  $.local = 'c:\\myproject\\';

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
      local: true,
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
The sample assumes that you have a locally hosted web project at http://localhost:3002/. To trace it you'll need to open the project at http://localhost:3004/, you are still able to browse non-traced version at http://localhost:3002/.

Mapper above is configured not to trace jQuery (or any jQuery plugins or related scripts if they have "jquery" string in their URL). It is also configured to trace minified underscore library, prettify it, but not collect any runtime data from it. For the rest of the scripts the mapper maps them to local files using "c:\\myproject\\" root plus whatever the script path relative to http://localhost:3002/, not prettifying them because these are local scripts that are formatted nicely anyway and constraining object dumps to reasonably low limits to avoid any performance issues on the traced website (traversing objects and sending dumps across the wire does take additional time). 

When tracing the website, according to the specified event filter we'll only see the code executed by timeouts, intervals and click events.

#### Configuration tips
**For best performance**
* opt out prettifying already nicely formatted non-minified files
* set reasonably low object dump limits
* exclude scripts you are not interested in by setting instrument to false. This can be done for example for libraries you wouldn't want to step in
* whitelist/blacklist events you would like/would not like to see by using event filter setting

It is recommended to save your session configuration file as spy.js (or spy-all.js/spy-nolibs.js etc.) in your project folder and commit/check in your VCS system so the configuration could be shared across your project team.

## Known issues
If spy-js tracing doesn't work for you (and console output or log file doesn't contain any explanation): 
* if you're using system proxy mode, make sure that system/browser proxy settings are using spy-js URL (by default localhost:3546)
* make sure the traced website scripts are not cached in your browser (clear the cache if required)
* tracing https secure websites is not supported at the moment
* tracing HTML pages inline JavaScript is not supported at the moment
* integrated windows authentication is not supported

For windows users: avast antivirus may suspect spy-js.exe and run it in a sandbox that sometimes causes proxy settings not being reset back after exiting spy-js.exe first time, this issue will be fixed in future. Technically spy-js.exe is just a convenience utility and is not required to run spy-js, so if you have any issues with it, you can just configure proxy settings manually (or script setting them) and run [node spy] from command line.
