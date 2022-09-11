#!/usr/bin/env node

import AVA from 'ava';
import * as ALWI from './main.js'; 

AVA( 'initWinstonLogger:InvalidArg:basename', function( t ){
	t.log( t.title );
	const expected = {
		instanceOf: TypeError,
		code: 'ERR_INVALID_ARG_TYPE'
	};
	const input_function = ALWI.initWinstonLogger.bind( null, true );
	t.throws( input_function, expected );
} );
AVA( 'initWinstonLogger:InvalidArg:directory', function( t ){
	t.log( t.title );
	const expected = {
		instanceOf: TypeError,
		code: 'ERR_INVALID_ARG_TYPE'
	};
	const input_function = ALWI.initWinstonLogger.bind( null, 'debug.log', true );
	t.throws( input_function, expected );
} );
AVA( 'initWinstonLogger:InvalidArg:console_level', function( t ){
	t.log( t.title );
	const expected = {
		instanceOf: TypeError,
		code: 'ERR_INVALID_ARG_TYPE'
	};
	const input_function = ALWI.initWinstonLogger.bind( null, 'debug.log', './test_log_dir', true );
	t.throws( input_function, expected );
} );
AVA( 'initWinstonLogger:InvalidArg:max_size', function( t ){
	t.log( t.title );
	const expected = {
		instanceOf: TypeError,
		code: 'ERR_INVALID_ARG_TYPE'
	};
	const input_function = ALWI.initWinstonLogger.bind( null, 'debug.log', './test_log_dir', 'debug', true );
	t.throws( input_function, expected );
} );
AVA( 'initWinstonLogger:InvalidArg:max_files', function( t ){
	t.log( t.title );
	const expected = {
		instanceOf: TypeError,
		code: 'ERR_INVALID_ARG_TYPE'
	};
	const input_function = ALWI.initWinstonLogger.bind( null, 'debug.log', './test_log_dir', 'debug', 4096, true );
	t.throws( input_function, expected );
} );
AVA( 'initWinstonLogger:InvalidArgValue:basename', function( t ){
	t.log( t.title );
	const expected = {
		instanceOf: Error,
		code: 'ERR_INVALID_ARG_VALUE'
	};
	const input_function = ALWI.initWinstonLogger.bind( null, '', './test_log_dir' );
	t.throws( input_function, expected );
} );
AVA( 'initWinstonLogger:InvalidArgValue:directory', function( t ){
	t.log( t.title );
	const expected = {
		instanceOf: Error,
		code: 'ERR_INVALID_ARG_VALUE'
	};
	const input_function = ALWI.initWinstonLogger.bind( null, 'debug.log', '' );
	t.throws( input_function, expected );
} );
AVA( 'setConsoleLogLevel:InvalidArgType:new_level', function( t ){
	t.log( t.title );
	var return_error = null;
	const expected = {
		instanceOf: TypeError,
		code: 'ERR_INVALID_ARG_TYPE'
	};
	var Logger = null;
	try{
		Logger = ALWI.initWinstonLogger( 'debug.log', './test_log_dir' );
	} catch(error){
		return_error = new Error(`initWinstonLogger threw an error: ${error}`);
		throw return_error;
	}
	const input_function = Logger.setConsoleLogLevel.bind( null, '' );
	t.throws( input_function, expected );
} );
AVA( 'Success', function( t ){
	t.log( t.title );
	const PROCESS_NAME = 'application-log-winston-interface';
	const MODULE_NAME = 'test';
	const FILENAME = 'source/main.test.js';
	const FUNCTION_NAME = t.title;
	var return_error = null;
	var Logger = null;
	//t.log(`WinstonLogger_Transports: ${ALWI.transports}`);
	try{
		Logger = ALWI.initWinstonLogger( 'debug.log', './test_log_dir' );
	} catch(error){
		return_error = new Error(`initWinstonLogger threw an error: ${error}`);
		//throw return_error;
	}
	if( return_error === null ){
		Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'crit', message: 'Test.'});
		Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'error', message: 'Test.'});
		Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'warn', message: 'Test.'});
		Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'note', message: 'Test.'});
		Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'info', message: 'Test.'});
		Logger.setConsoleLogLevel( 'debug' );
		Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'debug', message: 'Test.'});
		t.pass();
	} else{
		t.fail( return_error );
	}
} );
