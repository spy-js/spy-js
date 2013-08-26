## 0.2.1 (August 26, 2013)

[Bug fixing](https://github.com/spy-js/spy-js/issues?milestone=4)

## 0.2.0 (August 22, 2013)

Stabilization, a lot of memory leaks fixed, few small bugs fixed

## 0.1.11 (August 21, 2013)

Stabilizing release

* Local proxy stabilizing 
* More ES5 tolerant instrumentation
* Proper support for dumping positive and negative infinity, NaN, undefined

## 0.1.10 (August 20, 2013)

Various browsers support improvement

* Firefox issue when all events were marked as external fixed
* IE9 issue with different events being merged into one event
* IE8 issue with tracing data chunks order fixed
* IE8 object dump error fixed
* IE8 timeouts and intervals implemented
* IE7 JSON.stringify support
* Bug with inactive notification showing up too frequenly fixed
* Version checking script now loads with cache breaker

## 0.1.9 (August 20, 2013)

Usability improvements and bug fixes

* Easy local proxy mode : http://localhost:3546/?spy-js=your-site.com
* Visual indicator of spy-js on traced page
* Handling of missing or incorrect Content-Type for javascript files
* User notification when session is inactive for some time

## 0.1.8 (August 18, 2013)

Bug fixes and usability improvements
* Fixed local proxy issue: when refreshing spy-js UI while having opened traced page with proxy, local proxy won't stop
* Fixed event instrumenting bug (reproduced when event filter is on), was causing broken events that could not be opened
* Growl notifications for server and client side errors
* Server side session data clearing
* Clear session icon replacement

## 0.1.7 (August 16, 2013)

Windows 7 and IE related fixes

## 0.1.6 (August 13, 2013)

- **Major changes:**
	- [local proxy mode support (including windows tray application)](https://github.com/spy-js/spy-js/blob/master/README.md#local-proxy)
	- [local files mapping support, watching, reloading cache, mapping](https://github.com/spy-js/spy-js/blob/master/README.md#mapping-to-local-files)
	- start dialog now has a list of recently used session configurations
	- [massive documentation improvement](https://github.com/spy-js/spy-js)

- **Minor changes:**
	- default configuration file for global session
	- all session logging now also goes to console output (not just spy-js UI)
	- fixed array dump bug (empty array was always logged)

## 0.1.5 (August 06, 2013)

Internet Explorer related fixes

## 0.1.4 (August 02, 2013)
Small bug fix and new icons
