import { receive, requestSuccess } from '../Page/duck';

describe('>>>  Test Page duck.ts  <<<', () => {
    test('test receive function', () => {
        expect(receive()).toEqual({type: 'app/RECEIVE_INFO'})
    });
    test('test receive function', () => {
        const body = {}
        expect(requestSuccess(body)).toEqual({type: 'app/REQUEST_INFO_SUCCESS', payload: body})
    })
})