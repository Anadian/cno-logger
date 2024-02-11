#!/usr/bin/env node
/**
# [lib.test.js](source/lib.test.js)
> Tests for `cno-logger` (formerly `application-log-winston-interface`).

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
	import * as LoggerNS from './lib.js'; 
	//## Standard
	import Test from 'node:test';
	import { strict as Assert } from 'node:assert';
	//## External
//# Constants
const FILENAME = 'lib.test.js';
function errorExpected( expected, received ){
	if( received instanceof expected.instanceOf ){
		if( received.code === expected.code ){
			return true;
		}
	}
	return Assert.fail(`received: ${received}\nexpected:${expected}\n`);
}
//## Errors

//# Global Variables
/**## Functions*/

Test( 'initWinstonLogger:InvalidArg:basename', function( t ){
	t.diagnostic( t.name );
	const expected = {
		instanceOf: TypeError,
		code: 'ERR_INVALID_ARG_TYPE'
	};
	const input_function = LoggerNS.initWinstonLogger.bind( null, true );
	const validator_function = errorExpected.bind( null, expected );
	Assert.throws( input_function, validator_function );
} );
Test( 'initWinstonLogger:InvalidArg:directory', function( t ){
	t.diagnostic( t.name );
	const expected = {
		instanceOf: TypeError,
		code: 'ERR_INVALID_ARG_TYPE'
	};
	const input_function = LoggerNS.initWinstonLogger.bind( null, 'debug.log', true );
	const validator_function = errorExpected.bind( null, expected );
	Assert.throws( input_function, validator_function );
} );
Test( 'initWinstonLogger:InvalidArg:console_level', function( t ){
	t.diagnostic( t.name );
	const expected = {
		instanceOf: TypeError,
		code: 'ERR_INVALID_ARG_TYPE'
	};
	const input_function = LoggerNS.initWinstonLogger.bind( null, 'debug.log', './test_log_dir', true );
	const validator_function = errorExpected.bind( null, expected );
	Assert.throws( input_function, validator_function );
} );
Test( 'initWinstonLogger:InvalidArg:max_size', function( t ){
	t.diagnostic( t.name );
	const expected = {
		instanceOf: TypeError,
		code: 'ERR_INVALID_ARG_TYPE'
	};
	const input_function = LoggerNS.initWinstonLogger.bind( null, 'debug.log', './test_log_dir', 'debug', true );
	const validator_function = errorExpected.bind( null, expected );
	Assert.throws( input_function, validator_function );
} );
Test( 'initWinstonLogger:InvalidArg:max_files', function( t ){
	t.diagnostic( t.name );
	const expected = {
		instanceOf: TypeError,
		code: 'ERR_INVALID_ARG_TYPE'
	};
	const input_function = LoggerNS.initWinstonLogger.bind( null, 'debug.log', './test_log_dir', 'debug', 4096, true );
	const validator_function = errorExpected.bind( null, expected );
	Assert.throws( input_function, validator_function );
} );
Test( 'initWinstonLogger:InvalidArgValue:basename', function( t ){
	t.diagnostic( t.name );
	const expected = {
		instanceOf: Error,
		code: 'ERR_INVALID_ARG_VALUE'
	};
	const input_function = LoggerNS.initWinstonLogger.bind( null, '', './test_log_dir' );
	const validator_function = errorExpected.bind( null, expected );
	Assert.throws( input_function, validator_function );
} );
Test( 'initWinstonLogger:InvalidArgValue:directory', function( t ){
	t.diagnostic( t.name );
	const expected = {
		instanceOf: Error,
		code: 'ERR_INVALID_ARG_VALUE'
	};
	const input_function = LoggerNS.initWinstonLogger.bind( null, 'debug.log', '' );
	const validator_function = errorExpected.bind( null, expected );
	Assert.throws( input_function, validator_function );
} );
Test( 'setConsoleLogLevel:InvalidArgType:new_level', function( t ){
	t.diagnostic( t.name );
	var return_error = null;
	const expected = {
		instanceOf: TypeError,
		code: 'ERR_INVALID_ARG_TYPE'
	};
	var logger = null;
	try{
		logger = LoggerNS.initWinstonLogger( 'debug.log', './test_log_dir' );
	} catch(error){
		return_error = new Error(`initWinstonLogger threw an error: ${error}`);
		throw return_error;
	}
	const input_function = logger.setConsoleLogLevel.bind( null, '' );
	const validator_function = errorExpected.bind( null, expected );
	Assert.throws( input_function, validator_function );
} );
Test( 'Success', function( t ){
	t.diagnostic( t.name );
	const PROCESS_NAME = 'application-log-winston-interface';
	const MODULE_NAME = 'test';
	const FILENAME = 'source/main.test.js';
	const FUNCTION_NAME = t.name;
	var return_error = null;
	var logger = null;
	//t.diagnostic(`WinstonLogger_Transports: ${LoggerNS.transports}`);
	try{
		logger = LoggerNS.initWinstonLogger( 'debug.log', './test_log_dir' );
	} catch(error){
		return_error = new Error(`initWinstonLogger threw an error: ${error}`);
		//throw return_error;
	}
	if( return_error === null ){
		logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'crit', message: 'Test.'});
		logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'error', message: 'Test.'});
		logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'warn', message: 'Test.'});
		logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'note', message: 'Test.'});
		logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'info', message: 'Test.'});
		logger.setConsoleLogLevel( 'debug' );
		logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'debug', message: 'Test.'});
		Assert( true );
	} else{
		Assert.fail( return_error );
	}
} );
