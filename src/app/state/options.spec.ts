import { Options, copyOptions } from './options';

describe('Options', () => {
    describe('copyOptions', () => {

        describe('copy of non-null, empty options object', () => {
            let source: Options;

            beforeEach(() => {
                source = {};
            });

            it('should not be null or undefined', () => {
                expect(copyOptions(source)).toBeTruthy();
            })
        });

    });
});