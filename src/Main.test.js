import { initializeTimes, updateTimes } from './Main';

describe('Main - availableTimes reducer', () => {
  beforeEach(() => {
    global.fetchAPI = jest.fn(() => ['17:00', '18:00', '19:00']);
  });

  afterEach(() => {
    delete global.fetchAPI;
  });

  test('initializeTimes returns a non-empty array of available times', () => {
    const times = initializeTimes();

    expect(Array.isArray(times)).toBe(true);
    expect(times.length).toBeGreaterThan(0);
  });

  test('updateTimes returns a non-empty array of available times for the dispatched date', () => {
    const action = { type: 'UPDATE_TIMES', date: '2026-07-20' };

    const updatedState = updateTimes([], action);

    expect(Array.isArray(updatedState)).toBe(true);
    expect(updatedState.length).toBeGreaterThan(0);

    expect(global.fetchAPI).toHaveBeenCalledTimes(1);
    const calledWithDate = global.fetchAPI.mock.calls[0][0];
    expect(calledWithDate).toBeInstanceOf(Date);
    expect(calledWithDate.getFullYear()).toBe(2026);
    expect(calledWithDate.getMonth()).toBe(6);
    expect(calledWithDate.getDate()).toBe(20);
  });

  test('updateTimes returns the unchanged state for an unrecognized action', () => {
    const state = ['17:00'];

    const result = updateTimes(state, { type: 'UNKNOWN' });

    expect(result).toBe(state);
    expect(global.fetchAPI).not.toHaveBeenCalled();
  });
});
