import {appReducer, InitialStateType, setErrorAC, setStatusAC} from './app-reducer';

let startState: InitialStateType

beforeEach(() =>
    startState = {
        status: 'idle',
        error: null
    })

test('correct error message should be set', () => {
    const errorMessage="test some message"

    const endState = appReducer(startState, setErrorAC(errorMessage))

    expect(endState.status).toBe('idle');
    expect(endState.error).toBe(errorMessage);
});


test('correct status should be set', () => {

    const endState = appReducer(startState, setStatusAC('loading'))

    expect(endState.status).toBe('loading');
    expect(endState.error).toBe(null);
});