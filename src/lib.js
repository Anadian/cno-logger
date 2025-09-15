#!/usr/bin/env node
/**
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

*/

//# Dependencies
	//## Internal
	//## Standard
	//## External
	import LogForm from 'logform';
	import Winston from 'winston';
//# Constants
const FILENAME = 'lib.js';
const ApplicationLogStandard = { // RFC 5424 Severity Levels
	levels: {
		emerg: 0, // Emergency: system is unusable
		alert: 1, // Alert: action must be taken immediately
		crit: 2, // Critical: critical conditions
		error: 3, // Error: error conditions
		warn: 4, // Warning: warning conditions
		note: 5, // Notice: normal but significant condition
		info: 6, // Informational: informational messages
		debug: 7 // Debug: debug-level messages
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
const WINSTON_TRANSPORTS_OPTIONS_DEFAULT = {
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
/* c8 ignore start */
const NullLogger = { 
	log: () => {
		return null;
	},
	setConsoleLogLevel: () => {
		return null;
	}
};
/* c8 ignore stop */
//## Errors

//# Global Variables

/**
## Functions
*/
/**
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
*/
function initWinstonLogger( basename, directory, console_level = 'info', max_size = 1048576, max_files = 4 ){
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
/**
### initLogger
> Creates a new logger from the given options.

#### Parametres
| name | type | description |
| --- | --- | --- |
| options | object? | [Reserved] Additional run-time options. \[default: {}\] |

##### Options
| directory | {String} | The directory to store the log files in. \[dynamically defaults to `process.cwd()`\]  |
| basename | {String} | The basename for all logging files. \[default: 'log_debug.log'\] |
| console_level | {String} | The logging level for the console transport. \[default: 'info' \] |
| max_size | {Number} | The maximum size, in bytes, for each log file. [default: 1 MiB] \[default: 1048576\] |
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
| 5.0.0 | WIP |
*/
function initLogger( options = {} ){
	const FUNCTION_NAME = 'initLogger';
	const DEFAULT_OPTIONS = {
		directory: process.cwd(),
		basename: 'log_debug.log',
		consoleLevel: 'info',
		maxSize: 1048576,
		maxFiles: 4,
		transportsOptions: WINSTON_TRANSPORTS_OPTIONS_DEFAULT
	};
	//Variables
	//var arguments_array = Array.from(arguments);
	var _return;
	var return_error = null;
	var logger = null;
	var final_options = {};
	// Parametre checks
	if( typeof(options) !== 'object' ){
		return_error = new TypeError('Param "options" is not an object.');
		return_error.code = 'ERR_INVALID_ARG_TYPE';
		throw return_error;
	}
	if( options.noDefaults === true ){
		final_options = Object.assign( final_options, options );
	} else{
		final_options = Object.assign( final_options, DEFAULT_OPTIONS, options );
	}
	if( typeof(final_options.logOptions) === 'function' ){
		try{
			final_options.logOptions( final_options );
		} catch(error){
			return_error = new Error(`final_options.logOptions threw an error: ${error}`);
			throw return_error;
		}
	}
	if( typeof(final_options.validator) === 'function' ){
		try{
			final_options.validator( final_options );
		} catch(error){
			return_error = new Error(`final_options.validator threw an error: ${error}`);
			throw return_error;
		}
	} else{
		if( typeof( final_options.directory ) !== 'string' ){
			return_error = new TypeError('options.directory is not a string.');
			return_error.code = 'ERR_INVALID_ARG_TYPE';
			throw return_error;
		}
		if( typeof( final_options.basename ) !== 'string' ){
			return_error = new TypeError('options.basename is not a string.');
			return_error.code = 'ERR_INVALID_ARG_TYPE';
			throw return_error;
		}
		if( typeof( final_options.consoleLevel ) !== 'string' ){
			return_error = new TypeError('options.consoleLevel is not a string.');
			return_error.code = 'ERR_INVALID_ARG_TYPE';
			throw return_error;
		} else{
			if( Object.keys( ApplicationLogStandard.levels ).includes( final_options.consoleLevel ) !== true ){
				return_error = new Error(`options.consoleLevel is not a recognized log level: ${final_options.consoleLevel}`);
				return_error.code = 'ERR_INVALID_ARG_VALUE';
				throw return_error;
			}
		}
		if( typeof( final_options.maxSize ) !== 'number' ){
			return_error = new TypeError('options.maxSize is not a number.');
			return_error.code = 'ERR_INVALID_ARG_TYPE';
			throw return_error;
		}
		if( typeof( final_options.maxFiles ) !== 'number' ){
			return_error = new TypeError('options.maxFiles is not a number.');
			return_error.code = 'ERR_INVALID_ARG_TYPE';
			throw return_error;
		}
	} // validator

	var transports_object = final_options?.transportsObject ?? {};
	//var transports_options = Object.assign( {}, WINSTON_TRANSPORTS_OPTIONS_DEFAULT, ( options.transportsOptions ?? {} ) );
	//this.logger.log({file: FILENAME, function: FUNCTION_NAME, level: 'debug', message: `received: ${arguments_array}`});
	//Function
	if( final_options.directory ){
		final_options.transportsOptions.file_debug.dirname = final_options.directory;
	}
	if( final_options.basename ){ 
		final_options.transportsOptions.file_debug.filename = final_options.basename;
		final_options.transportsOptions.file_debug._basename = final_options.basename;
	}
	if( final_options.consoleLevel ){
		final_options.transportsOptions.console_stderr.level = final_options.consoleLevel;
	}
	if( final_options.maxSize ){
		final_options.transportsOptions.file_debug.maxsize = final_options.maxSize;
	}
	if( final_options.maxFiles ){
		final_options.transportsOptions.file_debug.maxFiles = final_options.maxFiles;
	}
	try{
		transports_object.file_debug = new Winston.transports.File( final_options.transportsOptions.file_debug );
	} catch(error){ /* c8 ignore start */
		return_error = new Error(`new Winston.transports.File threw an error: ${error}`);
		throw return_error;
	} /* c8 ignore stop */
	try{
		transports_object.console_stderr = new Winston.transports.Console( final_options.transportsOptions.console_stderr );
	} catch(error){ /* c8 ignore start */
		return_error = new Error(`new Winston.transports.Console threw an error: ${error}`);
		throw return_error;
	} /* c8 ignore stop */
	try{
		logger = Winston.createLogger({
			level: 'debug',
			levels: ApplicationLogStandard.levels,
			transports: [
				transports_object.file_debug,
				transports_object.console_stderr
			]
		});
	} catch( error ){ /* c8 ignore start */
		return_error = new Error(`Winston.createLogger threw an error: ${error}`);
		throw return_error;
	} /* c8 ignore stop */
	logger.real_transports = transports_object;
	logger.transportsOptions = final_options.transportsOptions;
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
	_return = logger;

	//Return
	//this.logger.log({file: FILENAME, function: FUNCTION_NAME, level: 'debug', message: `returned: ${_return}`});
	return _return;
}
//# Exports and Execution
const NAMESPACE = {
	initLogger: initLogger,
	standard: ApplicationLogStandard,
	formats: WinstonLogFormFormats,
	nullLogger: NullLogger,
	initWinstonLogger: initWinstonLogger
};
export { NAMESPACE as default, initLogger, ApplicationLogStandard as standard, WinstonLogFormFormats as formats, NullLogger as nullLogger, initWinstonLogger  };
