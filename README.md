spy-js documentation and samples
=====

This is a short version of documentation, full documentation version is in progress. Feel free to ask your questions on stackoverflow (tag spy-js) or in the repository issues.

#### Installation
Install node.js v0.8 or newer from [nodejs website](http://nodejs.org).

Download latest version from [spy-js website](http://spy-js.com) and extract it from downloaded archive.

Windows users can use spy-js.exe, other platform users (and windows users if spy-js.exe doesn't work) should run: 
```shell
node spy.js
```
and manually configure browser proxy settings to use spy-js URL (by default localhost:3546).

After launching spy-js UI you can start global tracing session (if configuration file is not supplied) or trace specific URL. See [sampleConfig.js](https://github.com/spy-js/spy-js/blob/master/sampleConfig.js) as an example of configuration file.

#### Known issues
If tracing doesn't work (and console output or log file doesn't contain any explanation): 
* make sure that browser proxy settings are using spy-js URL (by default localhost:3546)
* make sure traced website scripts are not cached in browser (clear the cache if required)
* tracing https websites is not supported at the moment
* integrated windows authentication is not supported

#### License
Documentation and code samples in this repository are licensed under MIT.

spy-js tool source code itself is not open, please refer to the tool EULA for more details.
