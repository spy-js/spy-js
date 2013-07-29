spy-js documentation and samples
=====

This is a short version of documentation, full documentation version is in progress. Feel free to ask your questions on stackoverflow (tag spy-js) or in the repository issues.

#### Installation
Install node.js v0.8 or newer from http://nodejs.org

Download latest version from http://spy-js.com

Windows users can use spy-js.exe, other platform users (and windows users if spy-js.exe doesn't work) should run: 
```shell
node spy.js
```
and manually configure browser proxy settings to use spy-js URL, by default localhost:3546

See sampleConfig.js as an example of configuration file.

#### Common issues
If tracing doesn't work: 
* make sure that browser proxy settings are using spy-js URL (by default localhost:3546)
* make sure traced website scripts are not cached in browser (clear the cache if required)
* tracing https websites is not supported at the moment


#### License
Documentation and code samples in this repository are licensed under MIT.

spy-js tool source code itself is not open, please refer to the tool EULA for more details.
