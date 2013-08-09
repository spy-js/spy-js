# spy-js documentation and samples

Feel free to ask your questions [on stackoverflow with spy-js tag](http://stackoverflow.com/questions/ask?tags=javascript+spy-js) or [in the repository issues](https://github.com/spy-js/spy-js/issues).

#### License
Documentation and code samples in this repository are [licensed under MIT](https://github.com/spy-js/spy-js/blob/master/LICENSE).

spy-js tool itself isn’t open source, but I intend to keep it free while I collect beta feedback. Please refer to the tool EULA and [this article](http://spy-js.com/why.html) for more details. 

#### Installation
Install node.js v0.8 or newer from [nodejs website](http://nodejs.org).

Download latest version from [spy-js website](http://spy-js.com) and extract it from downloaded archive.

Windows users can run spy-js.exe, other platform users (and windows users if spy-js.exe doesn't work for them for whatever reason) should run: 
```shell
node spy.js
```
and manually configure browser/network proxy settings to use spy-js URL (defaults: host localhost, port 3546). See how to configure proxy setting on [Windows] (http://answers.oreilly.com/topic/675-how-to-configure-proxy-settings-in-windows-7/), [Mac] (http://support.apple.com/kb/PH7050), [Ubuntu] (http://www.ubuntugeek.com/how-to-configure-ubuntu-desktop-to-use-your-proxy-server.html), [iOS](http://www.allanonymity.com/billing/knowledgebase/11/How-to-configure-proxy-usage-for-iPadorIphone.html), [Android](http://support.tabpilot.com/customer/portal/articles/937845-how-to-set-proxy-server-settings-in-android), [Windows Phone](http://forum.xda-developers.com/showthread.php?t=1106268). Please note that some browsers have their own proxy settings configuration screen. *There is a plan to enhance spy-js to host local proxy instead of using system/browser one*, [see this issue for more details](https://github.com/spy-js/spy-js/issues/12). 

#### Configuration
After launching spy-js UI you can start global tracing session without specifing any configuration. The session will trace all scripts from proxied traffic using default configuration parameters. 

To trace specific URL and configure what and how you'd like to trace, supply configuration in a form of a saved config file path on UI startup (or in a form of ad-hoc code any time after startup in configuration popup). See [sampleConfig.js](https://github.com/spy-js/spy-js/blob/master/sampleConfig.js) as an example of configuration file and description of what and how can be configured (including better performance/profiling accuracy tips).

#### Usage
To trace a website, after launching spy-js UI, open the website in a browser/device/platform of your choice and perform any actions you'd like to be traced. Use spy-js UI to inspect the website javascript code trace as it executes.

#### Known issues
If tracing doesn't work (and console output or log file doesn't contain any explanation): 
* make sure that browser/network proxy settings are using spy-js URL (by default localhost:3546)
* make sure traced website scripts are not cached in browser (clear the cache if required)
* tracing https websites is not supported at the moment
* tracing javascript inlined into HTML pages is not supported at the moment
* integrated windows authentication is not supported

For windows users: avast antivirus may suspect spy-js.exe and run it in sandbox that sometimes causes proxy settings not being reset back after exiting spy-js.exe first time, this issue will be fixed in future. Technically spy-js.exe is just a convenience utility and is not required to run spy-js, so if you have any issues with it, for now you can just configure proxy settings manually (or script setting them) and run [node spy.js] from command line.
