# [lib.js](source/lib.js)
> A micropackage formerly known as `application-log-winston-interface`: a wrapper around initialising Winston with Application-Log Standard levels, colours, and specific formats.

Author: Anadian

Code license: MIT
```
	Copyright 2021 Anadian
	Permission is hereby granted, free of charge, to any person obtaining a copy of this 
software and associated documentation files (the "Software"), to deal in the Software 
without restriction, including without limitation the rights to use, copy, modify, 
merge, publish, distribute, sublicense, and/or sell copies of the Software, and to 
permit persons to whom the Software is furnished to do so, subject to the following 
conditions:
	The above copyright notice and this permission notice shall be included in all copies 
or substantial portions of the Software.
	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, 
INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A 
PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT 
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF 
CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE 
OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```
Documentation License: [![Creative Commons License](https://i.creativecommons.org/l/by-sa/4.0/88x31.png)](http://creativecommons.org/licenses/by-sa/4.0/)
> The source-code comments and documentation are written in [GitHub Flavored Markdown](https://github.github.com/gfm/).

## Functions

### initWinstonLogger
> Creates a new Winston logger instance configured with Application Log standards.

#### Parametres
| name | type | description |
| --- | --- | --- |
| basename | {String} | The basename for all logging files.  |
| directory | {String} | The directory to store the log files in.  |
| console_level | {String} | The logging level for the console transport. \[default: 'info' \] |
| max_size | {Number} | The maximum size, in bytes, for each log file. [default: 1 MiB] \[default: 1048576\] |
| max_files | {Number} | The maximum number of log files before old ones start getting overwritten. [default: 4] \[default: 4\] |

#### Throws
| code | type | condition |
| --- | --- | --- |
| 'ERR_INVALID_ARG_TYPE' | {TypeError} | Thrown if a given argument isn't of the correct type. |
| 'ERR_INVALID_ARG_VALUE' | {Error} | Thrown if a given argument has an invalid value. |

#### History
| version | change |
| --- | --- |
| 5.0.0 | Deprecated |
| 2.0.0 | WIP |


### initLogger
> Creates a new logger from the given options.

#### Parametres
| name | type | description |
| --- | --- | --- |
| input_options | object? | [Reserved] Additional run-time options. \[default: {}\] |

##### Options
| directory | {String} | The directory to store the log files in. \[dynamically defaults to `process.cwd()`\]  |
| basename | {String} | The basename for all logging files. \[default: 'log_debug.log'\] |
| console_level | {String} | The logging level for the console transport. \[default: 'info' \] |
| max_size | {Number} | The maximum size, in bytes, for each log file. \[default: 1 MiB\] \[default: 1048576\] |
| max_files | {Number} | The maximum number of log files before old ones start getting overwritten. [default: 4] \[default: 4\] |

#### Returns
| type | description |
| --- | --- |
| object | The new logger instance. |

#### Throws
| code | type | condition |
| --- | --- | --- |
| 'ERR_INVALID_ARG_TYPE' | TypeError | Thrown if a given argument isn't of the correct type. |

#### History
| version | change |
| --- | --- |
| 6.0.0 | Refactored to use `cno-bedrock`. |
| 5.0.0 | WIP |

