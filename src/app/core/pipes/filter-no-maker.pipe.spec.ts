import {FilterNoMakerPipe} from './filter-no-maker.pipe';

describe('FilterNoUserPipe', () => {
    it('create an instance', () => {
        const pipe = new FilterNoMakerPipe();
        expect(pipe).toBeTruthy();
    });
});
