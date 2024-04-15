import {appReducer, InitialStateType, setAppErrorAC, setAppStatusAC} from './app-reducer';

let startState: InitialStateType

beforeEach(() =>
    startState = {
        status: 'idle',
        error: null,
        iSInitialized:false
    })

test('correct error message should be set', () => {
    const errorMessage="test some message"

    const endState = appReducer(startState, setAppErrorAC(errorMessage))

    expect(endState.status).toBe('idle');
    expect(endState.error).toBe(errorMessage);
});


test('correct status should be set', () => {

    const endState = appReducer(startState, setAppStatusAC('loading'))

    expect(endState.status).toBe('loading');
    expect(endState.error).toBe(null);
});