import { JsonLogger } from '../src';
import { Writable } from 'stream';

describe('JsonLogger', () => {
    it('should use logger', () => {
        const stdout = new Writable({
            write(chunk, encoding, callback) {
                const str = chunk.toString().replace(/\n$/, '');
                expect(str).toBeTruthy();
                const data = JSON.parse(str);
                expect(data).toBeInstanceOf(Array);
                return callback();
            }
        });
        const logger = new JsonLogger({
            stdout: stdout,
            stderr: stdout
        });
        logger.log('use json logger');
    });

    it('should use logger with raw format', () => {
        const stdout = new Writable({
            write(chunk, encoding, callback) {
                const str = chunk.toString().replace(/\n$/, '');
                expect(str).toBeTruthy();
                expect(() => JSON.parse(str)).toThrow();
                return callback();
            }
        });
        const logger = new JsonLogger({
            stdout: stdout,
            stderr: stdout,
            format: 'raw'
        });
        logger.log('use json logger');
    });

    it('should use error level', () => {
        let stdout;
        let stderr;
        stdout = stderr = new Writable({
            write(chunk, encoding, callback) {
                return callback();
            }
        });
        const logger = new JsonLogger({
            stdout: stdout,
            stderr: stderr
        });
        // noinspection JSCheckFunctionSignatures
        spyOn(stderr, 'write');
        logger.error('an error occurred');
        expect(stderr.write).toHaveBeenCalledTimes(1);
    });

    it('should use info level', () => {
        let stdout;
        let stderr;
        stdout = stderr = new Writable({
            write(chunk, encoding, callback) {
                return callback();
            }
        });
        const logger = new JsonLogger({
            stdout: stdout,
            stderr: stderr
        });
        // noinspection JSCheckFunctionSignatures
        spyOn(stdout, 'write');
        logger.error('write info');
        logger.debug('do not log debug');
        expect(stdout.write).toHaveBeenCalledTimes(1);
    });

    it('should use warn level', () => {
        let stdout;
        let stderr;
        stdout = stderr = new Writable({
            write(chunk, encoding, callback) {
                return callback();
            }
        });
        const logger = new JsonLogger({
            stdout: stdout,
            stderr: stderr,
            logLevel: 'warn'
        });
        // noinspection JSCheckFunctionSignatures
        spyOn(stdout, 'write');
        logger.warn('log warning');
        logger.debug('log debug');
        expect(stdout.write).toHaveBeenCalledTimes(1);
    });

});
