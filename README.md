# spy-js documentation and samples

Feel free to ask your questions [on stackoverflow with spy-js tag](http://stackoverflow.com/questions/ask?tags=javascript+spy-js) or [in the repository issues](https://github.com/spy-js/spy-js/issues).

#### Installation
Install node.js v0.8 or newer from [nodejs website](http://nodejs.org).

Download latest version from [spy-js website](http://spy-js.com) and extract it from downloaded archive.

Windows users can run spy-js.exe, other platform users (and windows users if spy-js.exe doesn't work for them for whatever reason) should run: 
```shell
node spy.js
```
and manually configure browser/network proxy settings to use spy-js URL (defaults: host localhost, port 3546).

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
* integrated windows authentication is not supported

For windows users: avast antivirus may suspect spy-js.exe and run it in sandbox that sometimes causes proxy settings not being reset back after exiting spy-js.exe first time, this issue will be fixed in future. Technically spy-js.exe is just a convenience utility and is not required to run spy-js, so if you have any issues with it, for now you can just configure proxy settings manually (or script setting them) and run [node spy.js] from command line.

#### License
Documentation and code samples in this repository are [licensed under MIT](https://github.com/spy-js/spy-js/blob/master/LICENSE).

spy-js tool itself is not open source software, please refer to the tool EULA for more details.
