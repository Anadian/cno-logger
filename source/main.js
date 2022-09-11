#!/usr/bin/env node
/**
# [application-log-winston-interface.js](source/application-log-winston-interface.js)
> A wrapper around initialising Winston with Application-Log Standard levels, colours, and specific formats.

Internal module name: `ApplicationLogWinstonInterface`

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

> The type notation used in this documentation is based off of the [Google Closure type system](https://github.com/google/closure-compiler/wiki/Types-in-the-Closure-Type-System).

> The status and feature lifecycle keywords used in this documentation are based off of my own standard [defined here](https://github.com/Anadian/FeatureLifeCycleStateStandard).
*/

//# Dependencies
	//## Internal
	//## Standard
	//const FileSystem = require('fs');
	//import Path from 'node:path';
	//## External
	import LogForm from 'logform';
	import Winston from 'winston';
//# Constants
/*const FILENAME = 'application-log-winston-interface.js';
const MODULE_NAME = 'ApplicationLogWinstonInterface';
//var PACKAGE_JSON = {};
var PROCESS_NAME = '';
if(require.main === module){
	PROCESS_NAME = 'application-log-winston-interface';
} else{
	PROCESS_NAME = process.argv0;
}*/

const ApplicationLogStandard = { //RFC 5424
	levels: {
		emerg: 0,
		alert: 1,
		crit: 2,
		error: 3,
		warn: 4,
		note: 5,
		info: 6,
		debug: 7
	},
	colors: {
		emerg: 'bold underline red',
		alert: 'bold underline red',
		crit: 'bold red',
		error: 'red',
		warn: 'yellow',
		note: 'magenta',
		info: 'blue',
		debug: 'green'
	}
};
const WinstonLogFormFormats = {
	file: LogForm.format.combine(
		LogForm.format.timestamp(),
		LogForm.format.splat(),
		LogForm.format.printf((info) => /* c8 ignore start */{
			return `${info.timestamp} ${info.process?info.process+':':''}${info.module?info.module+':':''}${info.file?info.file+':':""}${info.function?info.function+':':''}${info.level}: ${info.message}${(info.meta)?' '+info.meta:''}`;
		}/* c8 ignore stop */),
	),
	console: LogForm.format.combine(
		LogForm.format.colorize({
			all: true,
			colors: ApplicationLogStandard.colors
		}),
		LogForm.format.splat(),
		LogForm.format.printf((info) => /* c8 ignore start */{
			return `${info.level}: ${info.function?info.function+':':''} ${info.message}`;
		}/* c8 ignore stop */)
	)
};
const NullLogger = { 
	log: () => {
		return null;
	},
	setConsoleLogLevel: () => {
		return null;
	}
};

//## Errors

//# Global Variables
/**
## Functions
*/
/**
### initWinstonLogger
> Creates a new Winston logger instance configured with Application Log standards.

Parametres:
| name | type | description |
| --- | --- | --- |
| basename | {String} | The basename for all logging files.  |
| directory | {String} | The directory to store the log files in.  |
| console_level | {String} | The logging level for the console transport. \[default: \] |
| max_size | {Number} | The maximum size, in bytes, for each log file. [default: 1 MiB] \[default: \] |
| max_files | {Number} | The maximum number of log files before old ones start getting overwritten. [default: 4] \[default: \] |

Throws:
| code | type | condition |
| --- | --- | --- |
| 'ERR_INVALID_ARG_TYPE' | {TypeError} | Thrown if a given argument isn't of the correct type. |
| 'ERR_INVALID_ARG_VALUE' | {Error} | Thrown if a given argument has an invalid value. |

History:
| version | change |
| --- | --- |
| 2.0.0 | WIP |
*/
export default function initWinstonLogger( basename, directory, console_level = 'info', max_size = 1048576, max_files = 4 ){
	var arguments_array = Array.from(arguments);
	var return_error;
	const FUNCTION_NAME = 'initWinstonLogger';
	//Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'debug', message: `received: ${arguments_array}`});
	//console.log( `${FUNCTION_NAME}: ${arguments_array.toString()}` );
	//Variables
	var logger = null;
	var transports_object = {};
	var transports_options = {
		file_debug: {
			level: 'debug',
			format:	WinstonLogFormFormats.file,
			eol: '\n',
			filename: 'log_debug.log',
			maxsize: 1048576, //1 MiB
			maxFiles: 4
		},
		console_stderr: {
			level: 'info',
			format: WinstonLogFormFormats.console,
			stderrLevels: ['emerg','alert','crit','error','warn','note','info','debug'],
			warnLevels: ['warn','note']
		}
	};
	//Parametre checks
	if( typeof(basename) !== 'string' ){
		return_error = new TypeError('Param "basename" is not String.');
		return_error.code = 'ERR_INVALID_ARG_TYPE';
		throw return_error;
	}
	if( typeof(directory) !== 'string' ){
		return_error = new TypeError('Param "directory" is not String.');
		return_error.code = 'ERR_INVALID_ARG_TYPE';
		throw return_error;
	}
	if( typeof(console_level) !== 'string' ){
		return_error = new TypeError('Param "console_level" is not String.');
		return_error.code = 'ERR_INVALID_ARG_TYPE';
		throw return_error;
	}
	if( typeof(max_size) !== 'number' ){
		return_error = new TypeError('Param "max_size" is not Number.');
		return_error.code = 'ERR_INVALID_ARG_TYPE';
		throw return_error;
	}
	if( typeof(max_files) !== 'number' ){
		return_error = new TypeError('Param "max_files" is not Number.');
		return_error.code = 'ERR_INVALID_ARG_TYPE';
		throw return_error;
	}

	//Function
	if( basename != '' && typeof(basename) === 'string' ){
		transports_options.file_debug.filename = basename;
		transports_options.file_debug._basename = basename;
	} else{
		return_error = new Error('Param `basename` is an empty string.');
		return_error.code = 'ERR_INVALID_ARG_VALUE';
		throw return_error;
	}
	if( directory != '' && typeof(directory) === 'string' ){
		transports_options.file_debug.dirname = directory;
		//transports_options.file_debug._dest.path = Path.join( directory, basename );
	} else{
		return_error = new Error('Param `directory` is an empty string.');
		return_error.code = 'ERR_INVALID_ARG_VALUE';
		throw return_error;
	}
	if( console_level != null && typeof(console_level) === 'string' ){
		transports_options.console_stderr.level = console_level;
	}
	if( max_size != null && typeof(max_size) === 'number' ){
		transports_options.file_debug.maxsize = max_size;
	}
	if( max_files != null && typeof(max_files) === 'number' ){
		transports_options.file_debug.maxFiles = max_files;
	}
	transports_object.file_debug = new Winston.transports.File( transports_options.file_debug );
	transports_object.console_stderr = new Winston.transports.Console( transports_options.console_stderr );
	logger = Winston.createLogger({
		level: 'debug',
		levels: ApplicationLogStandard.levels,
		transports: [
			transports_object.file_debug,
			transports_object.console_stderr
		]
	});
	logger.real_transports = transports_object;
	logger.transports_options = transports_options;
	logger.setConsoleLogLevel = function( new_level = 'debug' ){
		var return_error = null;
		if( typeof(new_level) === 'string' && new_level != '' ){
			this.real_transports.console_stderr.level = new_level;
		} else{
			return_error = new TypeError('Param `new_level` is either `null` or not a string.');
			return_error.code = 'ERR_INVALID_ARG_TYPE';
			throw return_error;
		}
	}
	//Return
	return logger;
}
//# Exports and Execution
export { initWinstonLogger, ApplicationLogStandard as standard, WinstonLogFormFormats as formats, NullLogger as nullLogger };
