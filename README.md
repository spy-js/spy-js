# spy-js for node.js

Spy-js now supports tracing/debugging/profiling node.js code, check out [WebStorm blog for more details](http://blog.jetbrains.com/webstorm/2014/08/webstorm-9-eap/).

# spy-js availability

The project now is a part of IntelliJ product line, spy-js is bundled with WebStorm and IndelliJ IDEA Ultimate Edition and available as a [free downloadable plugin](http://plugins.jetbrains.com/plugin/7417) for PhpStorm, RubyMine and PyCharm Professional Edition. You can watch 7 min [screencast here](http://www.youtube.com/watch?v=vPIbwxzC5cU) and read [detailed feature walkthrough in WebStorm blog](http://blog.jetbrains.com/webstorm/2014/04/spy-js-webstorm-secret-service/).

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
* [Development proxy (like Fiddler or Charles proxy) configiration](#development-proxy-configuration)
* [Mobile device proxy configuration](#mobile-device-configuration)
* [Virtual machine configuration](#virtual-machine-configuration)
* [Troubleshooting and known issues](#known-issues)

If something described in the documentation doesn't work for you, please check if it's one of the **[known issues](#known-issues)**. Feel free to ask your questions [on stackoverflow with spy-js tag](http://stackoverflow.com/questions/ask?tags=javascript+spy-js) or [in the repository issues](https://github.com/spy-js/spy-js/issues).

## Overview

In a nutshell, spy-js is a tool for JavaScript developers that allows to simply debug/trace/profile JavaScript on running on different platforms/browsers/devices. It fills gaps that existing browser development tools have and tackles common development tasks from a different angle.

![spy-js diagram](http://spy-js.com/assets/img/diagram.png)

You should be able to run a **website you'd like to trace in any browser/platform/device that supports JavaScript**; you should be able to run **spy-js UI in all modern desktop browsers on any platform**.

## License
Documentation and code samples in this repository are [licensed under MIT](https://github.com/spy-js/spy-js/blob/master/LICENSE).

spy-js tool itself isn’t open source, but I intend to keep it free while I collect beta feedback. Please refer to the tool EULA and [this article](http://spy-js.com/why.html) for more details. 

## Installation

To use WebStorm integration of spy-js: install latest WebStorm version.

To use web UI version: install node.js v0.10.24 or newer from [nodejs website](http://nodejs.org), download latest version from [spy-js website](http://spy-js.com) and extract it from downloaded archive.

## Quick start and tutorial

**Following tutorial is for spy-js web UI version, to use WebStorm integration of spy-js follow the instructions in [the blog post](http://blog.jetbrains.com/webstorm/2014/04/spy-js-webstorm-secret-service/).**

Start spy-js by running the command from the folder where you have extracted downloaded archive to:
```shell
node spy
```
Windows users can run spy-js.exe instead; it's a tray application that manages spy-js state and configuration.

Running the command (or spy-js tray application) will start spy-js HTTP server on port 3546. Use ```-p``` argument (or tray application) to specify different port.

After starting spy-js server, open the tool UI **in new browser window** (UI URL will be displayed in console output, by default it's [http://localhost:3546/](http://localhost:3546/)). Windows tray application users should see the UI opening automatically once they start the tray application.

Started spy-js server acts as a proxy server. In order to trace your scripts, the proxy server has to capture the traced website requests. There are two options to make it happen:
* In **system proxy mode** you configure your system to use spy-js server as a proxy. See how to configure proxy settings on [Windows](http://answers.oreilly.com/topic/675-how-to-configure-proxy-settings-in-windows-7/), [Mac](http://support.apple.com/kb/PH7050), [Ubuntu](http://www.ubuntugeek.com/how-to-configure-ubuntu-desktop-to-use-your-proxy-server.html), [iOS](http://www.allanonymity.com/billing/knowledgebase/11/How-to-configure-proxy-usage-for-iPadorIphone.html), [Android](http://support.tabpilot.com/customer/portal/articles/937845-how-to-set-proxy-server-settings-in-android), [Windows Phone](http://forum.xda-developers.com/showthread.php?t=1106268). Please note that some desktop browsers have their own proxy settings configuration screen. Windows tray application users don't need to do it manually, the tray application can turn on and off system proxy mode (context menu - configure - use system proxy).
* In **local proxy mode** you use spy-js as a proxy by accessing the traced website via spy-js URL(s). **No system configuration is required**, but the mode has some limitations comparing to the system proxy mode.

For more information about how and when to use the proxy modes, please read [about them in sessions section](#proxy-modes).

Click "start session" button in start-up dialog and then open the website you'd like to trace **in new browser window** either by just accessing its URL directly if you're using **system proxy mode** (and have configured your system as described above) or, if you're using **local proxy mode**, by accessing ```http://localhost:3546/?spy-js=your-website.com``` URL. Please note that in local proxy mode [due to its limitations](#local-proxy) you won't be able to trace websites that are using CDNs (or non-relative script references), consider using system proxy mode in this case.

Once you've opened the traced page, you should be able see spy-js logo at the top right corner of the page as an indication that spy-js is ready to trace its scripts. The indicator will disappear in a few seconds after the page loads. **Do force refresh (```Ctrl/Command + F5``` or ```Ctrl/Command + R```) on the traced page** if don't see the indicator.

![spy-js main UI](http://spy-js.com/assets/img/nodejs.png)

Once the page is loaded, perform any actions you'd like to be traced and then have a look into spy-js UI to start inspecting occurred events.

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

The code pane is searchable. Click the magnifier icon at the top right corner on the pane or press ```Ctrl/Command + F``` when the code editor has focus to search the opened code file.

![spy-js code pane](http://spy-js.com/assets/img/code_pane.png)

### Miscellaneous
At the bottom right corner you can find action icons: refresh and configure. 

Refresh icon click clears all trace information from the screen. 

Configure icon click opens current session configuration code editor. See more details about sessions below, also see  how to configure tracing session in [Configuration section](#configuration).

## Sessions

Tracing in spy-js is session based. When you open spy-js UI, it creates a new session for you. You can open as many websites/sessions as you like while having just a single spy-js server running. Having said that, you can also start multiple spy-js servers on different ports if you need to. Once spy-js UI is opened in a browser of your choice, the first thing you see is new session configuration dialog. 

### Global session
You can start global session without specifying any configuration just be clicking "start session" button in the start-up dialog. The session will trace all scripts from proxied traffic using default configuration parameters.

After starting a global session, at any moment you can change its configuration by clicking "configure" icon at the bottom right corner of the screen and modifying [session configuration code](#configuration). Please note that your changes to the global session configuration will only be saved temporarily until your browser window with spy-js UI is refreshed. To use persistent configuration files for your sessions, save your configuration file somewhere and reuse it later by entering or selecting its path on the start-up dialog. Recommended place to save the file is in your project folder, recommended name is spy.js; you can also consider checking it in your VCS to share across your team.

### File configured session
If you already have a saved configuration file, you can paste its location path into the start-up dialog textbox or select it from the list of recently used configurations and start the session by clicking "start session" button. At any moment you can change the session configuration by clicking "configure" icon at the bottom right corner of the screen and modifying configuration code in spy-js built-in code editor. Please note that your changes will be saved to the selected session configuration file. Alternative way of changing session configuration is just editing the configuration file in your favourite text editor. spy-js monitors the file for changes and automatically updates the session configuration when the file is changed.

It is recommended to use file based configuration for your sessions as opposed to using global session. With file based configuration you can change, save and commit session settings to reuse later or across your team, also with file based configuration you can use local proxy mode and not touch your system/browser proxy settings while global session by default only works in [system proxy mode](#system-proxy).

### Proxy modes
In order to trace your website scripts, spy-js has to modify them on the fly. The modification doesn't affect your scripts logic, it's just inserting instrumentation instructions that are reporting back to spy-js UI about what functions have been invoked when your script executes. In order to get a chance to modify your scripts, spy-js has to act as a proxy server that sits between your browser and the website you're tracing. When you open traced website in your browser, spy-js receives script request, requests the script from your website, receives the script, makes required modifications and sends it back to your browser where the script executes and sends runtime information to spy-js UI (via spy-js server).

As you can see from the explanation above, spy-js acts as a proxy server. There are two proxy modes spy-js can work in: system proxy mode and local proxy mode.

#### System proxy
In system proxy mode spy-js is configured to be entire system/browser proxy. This way it can capture all traffic and modify all scripts, including CDN references. To make spy-js work in this mode you'll need to configure browser/network proxy settings to use spy-js URL (defaults: host localhost, port 3546). Windows tray application users don't need to do it manually, the tray application can turn on and off system proxy mode (context menu - configure - use system proxy). See how to configure proxy settings manually on [Windows](http://answers.oreilly.com/topic/675-how-to-configure-proxy-settings-in-windows-7/), [Mac](http://support.apple.com/kb/PH7050), [Ubuntu](http://www.ubuntugeek.com/how-to-configure-ubuntu-desktop-to-use-your-proxy-server.html), [iOS](http://www.allanonymity.com/billing/knowledgebase/11/How-to-configure-proxy-usage-for-iPadorIphone.html), [Android](http://support.tabpilot.com/customer/portal/articles/937845-how-to-set-proxy-server-settings-in-android), [Windows Phone](http://forum.xda-developers.com/showthread.php?t=1106268). Please note that some desktop browsers have their own proxy settings configuration screen. Windows tray application users don't need to do it manually, the tray application can turn on and off system proxy mode (context menu - configure - use system proxy).

#### Local proxy
In local proxy mode spy-js doesn't need to change any system settings. 
To use the mode you can either open your website by accessing ```http://localhost:3546/?spy-js=your-website.com``` URL while having a global spy-js session running. 

For a file configured session, you can simply set local proxy port in [the session configuration](#configuration):

```javascript
$.root = 'http://localhost:8080/';
$.proxy = 3000;
```
It means that if your website is locally hosted at ```http://localhost:8080/```, when you'd like to trace it, you open  ```http://localhost:3000/```. At ```http://localhost:3000/``` you'll see your ```http://localhost:8080/``` website but it will be traced by spy-js. After performing some actions on your website at ```http://localhost:3000/```, you'll be able to inspect captured events using opened spy-js UI (by default it's ```http://localhost:3546/```). At the same time you can browse normal non-traced version of your site at ```http://localhost:8080/```.

As opposed to system proxy mode, local proxy mode has some limitations in what it can trace. In local proxy mode only local (and relatively referenced) scripts can be traced and not CDN referenced or absolutely referenced ones because external reference requests are not going through the local proxy and cannot be intercepted for the code modification. For example, if on your page you are using locally hosted jQuery version referenced like:
```html
<script type="text/javascript" src="scripts/libs/jquery-1.9.1.js"></script>
```
then it can be traced (unless you don't want it in which case you can exclude it from being traced in [configuration file](#configuration)).
But if you reference the library or any other script from CDN, like:
```html
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
```
or like
```html
<script src="http://your-domain.com/scripts/libs/jquery.min.js"></script>
```
then it will not be traced.

There are some other limitations of the local proxy mode that you can hit, especially when using it from a global tracing session like ```http://localhost:3546/?spy-js=your-website.com```, for example, during the traced website **navigation or CORS related ones**. The root of the issues is in the fact that the traced website is accessed via spy-js hosted URL.

#### Selecting proxy mode
When choosing between system and local proxy mode, consider the task you need to perform. If you want to learn how some external website works by tracing its pages with potentially lots of CDN references and don't want to bother creating any session configuration files and want to just quickly use global session, then system proxy is your choice. If you trace your locally hosted project in your local dev environment and perhaps have specific session configuration shared across your team and don't want to bother turning on and off system wide proxy settings, then local proxy mode is your choice.

*In a nutshell, system proxy mode is more powerful in terms that it has no limitations it what it can capture, but it requires additional configuration.*

#### Mapping to local files 

**(skip this section if you're using WebStorm integration, as the IDE automaticall maps local project files for you)**

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
In order to configure your session you use session configuration parameter ```$``` passed in and assign its supported properties desired values. If you've already used [grunt](http://gruntjs.com/), you'll find the process very similar.

#### Configuration settings

##### name (optional)
Trace name is displayed at the top left corner of the screen (and in the page title) and allows you to easier understand what session you're working with if you have multiple browser windows with multiple sessions opened.
```javascript
$.name = 'trace name';
```

##### root (optional, but must be specified if not using system proxy mode)
Root URL is a URL of the page/website you'd like to trace. Set it to isolate your session from receiving events from any other websites/pages. Root URL must be set if using [local proxy mode](#local-proxy) via ```$.proxy```.
```javascript
$.root = 'http://localhost:3002/';
```

##### proxy (optional, but must be specified if not using system proxy mode)
Proxy port is used in [local proxy mode](#local-proxy) along with ```$.root```.
So specifying:
```javascript
$.root = 'http://localhost:3002/';
$.proxy = 3003;
```
will leave ```http://localhost:3002/``` available as it is, and host traced version of ```http://localhost:3002/``` at ```http://localhost:3003/```. ```http://localhost:3003/``` should be opened and used along with spy-js UI to trace events.

##### local (optional, is NOT required in WebStorm integration)
Local project root is used to map scripts to local files so that spy-js can monitor those file changes and update instrumented code. Local project root is used by ```$.mapper``` for URLs that specify "local" property.
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
        // local property is NOT required in WebStorm integration, 
        // as the IDE automatically tracks local project files for you 
	local: true | false | string (path) | not set or empty string (default),
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

**```local```** (**local property is NOT required if you're using WebStorm integration, as the IDE automatically tracks local project files for you**) property specifies whether spy-js should map the URL to local file, track the local file changes and re-instrument it when the file changes. By default, spy-js instruments all scripts just once and caches them, but if the local file mapping is created, spy-js will update the cache when required. 

The property can either specify a path to the local file, or just have a true value, in which case the local file will be automatically discovered as follows: ```$.local``` will be used as a local root along with current URL path (relative to ```$.root```). For example, if we have following configuration:
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
and open ```http://localhost:3002/``` page that references ```http://localhost:3002/scripts/main.js```, then spy-js will try to map requested main.js script to local file at ```c:\\myproject\\``` (from ```$.local```) + ```scripts\\main.js``` (path from URL relative to ```$.root```).

**```instrument```** property specifies how the script from given URL will be modified (if at all) and what data will be collected in runtime. Set the property to false to not trace the script. Set the property to true to use default values or specify the object with settings.

**```instrument.prettify```** property specifies whether to make the script look nice in case if it is minified or badly formatted.

**```instrument.objectDump```** property specifies whether any runtime data (apart from stack trace) should be collected and to what extent. Set the property to false if you don't want to collect the runtime values. Don't set the property if you want to use default object dump settings or specify your own settings object.

**```instrument.objectDump.depth```** property specifies how many levels of nesting within an object should be traversed and logged. 

**```instrument.objectDump.propertyNumber```** property specifies how many first properties within an object should be logged (at any allowed level of logged object hierarchy).

**```instrument.objectDump.arrayLength```** property specifies how many array elements should be logged (at any allowed level of logged object hierarchy).

**```instrument.objectDump.stringLength```** property specifies limit of number of characters in logged string properties.

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

  // local property is NOT required when using WebStorm integration, 
  // as the IDE automatically tracks local project files for you 
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
      // local property is NOT required when using WebStorm integration, 
      // as the IDE automatically tracks local project files for you 
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
The sample assumes that you have a locally hosted web project at ```http://localhost:3002/```. To trace it you'll need to open the project at ```http://localhost:3004/```, you are still able to browse non-traced version at ```http://localhost:3002/```.

Mapper above is configured not to trace jQuery (or any jQuery plugins or related scripts if they have "jquery" string in their URL). It is also configured to trace minified underscore library, prettify it, but not collect any runtime data from it. 

**(skip this paragraph if you're using WebStorm integration)** For the rest of the scripts the mapper maps them to local files using ```c:\\myproject\\``` root plus whatever the script path relative to ```http://localhost:3002/```. 

Mapper is not prettifying them because these are local scripts that are formatted nicely anyway and constraining object dumps to reasonably low limits to avoid any performance issues on the traced website (traversing objects and sending dumps across the wire does take additional time). 

When tracing the website, according to the specified event filter we'll only see the code executed by timeouts, intervals and click events.

#### Configuration tips
**For best performance**
* opt out prettifying already nicely formatted non-minified files
* set reasonably low object dump limits
* exclude scripts you are not interested in by setting instrument to false. This can be done for example for libraries you wouldn't want to step in
* whitelist/blacklist events you would like/would not like to see by using event filter setting

It is recommended to save your session configuration file as spy.js (or spy-all.js/spy-nolibs.js etc.) in your project folder and commit/check in your VCS system so the configuration could be shared across your project team.

## Development proxy configuration
If you're using development proxy, for instance to map minified files and replace them with local development versions, it is still possible to use spy-js to instrument and trace those development versions of JavaScript files.

In the example below it's illustrated how to make Fiddler work with spy-js in WebStorm. The idea is to request your non-minified files via spy-js proxy server using local proxy mode URLs. In the example I'll replace minified sh\_javascript.min.js file from nodejs.org with my version sh\_javascript.js using Fiddler and will trace sh_javascript.js execution using spy-js.

Create a new spy-js run configuration, uncheck "Automatically configure system proxy" checkbox.
![screen shot 2014-06-26 at 12 59 01 pm](https://cloud.githubusercontent.com/assets/979966/3394356/017203be-fcde-11e3-8cda-55b56c4ceed2.png)

Configure AutoResponder in Fiddler as follows:
![screen shot 2014-06-26 at 2 01 26 pm](https://cloud.githubusercontent.com/assets/979966/3394639/ab84fffc-fce6-11e3-8130-db2817c34e95.png)

Start Fiddler and spy-js run configuration (the order doesn't matter), access the page in browser and see it traced in WebStorm.

Note that localhost:3546 is spy-js trace server launched by WebStorm, localhost:8080 is an address where your local non-minified files are hosted. I have used static [http-server](https://www.npmjs.org/package/http-server) to host them, but you can use any web server.

First AutoResponder rule uses a regular expression to replace all files like file.min.js with corresponding file.js, last two rules are mandatory to make spy-js work on the page.

## Mobile device configuration
See configuration example for iOS in [spy-js WebStorm blog post](http://blog.jetbrains.com/webstorm/2014/04/spy-js-webstorm-secret-service/#mobile)

## Virtual machine configuration

If you are using virtual machine, for instance you have a develepment machine with Mac and WebStorm spy-js installed and hosting Windows VM via Virtual Box on it, it is possible to use spy-js to trace web sites opened inside IE (or another browser) on the VM instance and view the trace in your WebStorm.

First, create and start spy-js run configuration in WebStorm on your development machine. You can use default trace server port (3546), leave "URL to trace" field empty and do not check "Automatically configure system proxy" checkbox (because the proxy configuration is not required on your development machine, it's required on the VM and will be performed manually).

Second, you need to configure your VM system proxy, for example see how to do it on [Windows](http://answers.oreilly.com/topic/675-how-to-configure-proxy-settings-in-windows-7/). The settings you'll need to specify are: 
* IP address of your development machine for the address (avoid using fake 10.0.2.2 IP address)
* spy-js run configuration trace server port for the port (3546, if you didn't change it)
* uncheck "Bypass proxy server for local addresses" setting
* go to "Advanced" settings and add <-loopback> string to the exceptions field down the bottom

Now you can open any external website, like http://nodejs.org, in any browser on your VM and make sure it is being traced in WebStorm running on your development machine.

When you are tracing local sites (hosted on your development machine), and when you're trying to trace them they hang, you may need to access them by dev machine name or dev machine proper network IP address (instead of fake 10.0.2.2 IP address). Please note that WebStorm built-in HTTP server doesn't support such access, so you may need to install and use some other development web server for this task, for example  static [http-server](https://www.npmjs.org/package/http-server).

To sum it up, if you have installed http-server (npm install http-server -g) and started it (by running http-server inside your application folder) using it's default port 8080, started described spy-js run configuration on your development machine (for instance named dev-box), configured your VM as described, opened a browser on the VM and accessed http://dev-box:8080, you should be able to see the the trace in your running WebStorm instance on your development machine.

## Known issues
If spy-js tracing doesn't work for you (and console output or log file doesn't contain any explanation): 
* **do force refesh** (```Ctrl/Command + F5``` or ```Ctrl/Command + R```) on the traced page to make sure the traced website scripts are not cached in your browser
* if you're using system proxy mode, make sure that system/browser proxy settings are using spy-js URL (by default ```localhost:3546```)
* if you're using local proxy mode, note that the mode has [some limitations](#local-proxy)
* tracing **scripts with incorrect (or without) Content-Type response header** is not supported. Some development web servers have default settings with incorrect Content-Type response header (or no Content-Type response header) for JavaScript files. Use your browser dev tools to check whether your script has correct Content-Type response header: ```text/javascript``` or ```application/x-javascript``` or ```application/javascript```.
* tracing **https** secure websites is not supported at the moment
* tracing HTML **pages inline JavaScript** is not supported at the moment
* integrated windows authentication is not supported
* (following applies to the WebStorm version to much less extent than to web UI): execution time figures display the time required to execute modified code and thus may significantly differ from the real figures; use target browser built-in profiler tools for precise figures critical stuff like renderring optimization 

For windows users: avast antivirus may suspect spy-js.exe and run it in a sandbox that sometimes causes proxy settings not being reset back after exiting spy-js.exe first time, this issue will be fixed in future. Technically spy-js.exe is just a convenience utility and is not required to run spy-js, so if you have any issues with it, you can just configure proxy settings manually (or script setting them) and run ```node spy``` from command line.
