import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as types from '../../constants/action-types';
import * as timerActions from './timers.actions';


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
let store;

describe('timer actions', () => {
  beforeEach(() => {
    store = mockStore({
      timeState: {
        ms: 2,
      },
    });
  });
  describe('addTimer', () => {
    it('should dispatch properly when no error is thrown', () => {
      store.dispatch(timerActions.addTimer('1h: test timer'));
      expect(store.getActions()).toEqual([
        {
          type: types.ADD_TIMER,
          timer: {
            ms: 3600000,
            text: 'test timer',
          },
          ms: 2,
        },
        {
          type: types.UPDATE_TIMERS,
          ms: 2,
          lastMs: undefined,
        },
      ]);
    });

    it('should dispatch properly when an error is thrown', () => {
      store.dispatch(timerActions.addTimer('foo'));
      const actions = store.getActions();
      expect(actions.length).toBe(1);
      expect(actions[0].type).toBe(types.ADD_TIMER_ERROR);
    });
  });

  describe('clearAddTimerError', () => {
    it('should dispatch properly', () => {
      store.dispatch(timerActions.clearAddTimerError());
      expect(store.getActions()).toEqual([{
        type: types.CLEAR_ADD_TIMER_ERROR,
      }]);
    });
  });

  describe('removeTimer', () => {
    it('should dispatch properly', () => {
      store.dispatch(timerActions.removeTimer({ index: 1 }));
      const actions = store.getActions();
      expect(actions.length).toBe(2);
      expect(actions[0].type).toBe(types.REMOVE_TIMER);
      expect(actions[1].type).toBe(types.UPDATE_TIMERS);
    });
  });

  describe('removeAllTimers', () => {
    it('should dispatch properly', () => {
      store.dispatch(timerActions.removeAllTimers());
      const actions = store.getActions();
      expect(actions.length).toBe(1);
      expect(actions[0].type).toBe(types.REMOVE_ALL_TIMERS);
    });
  });

  describe('setTimers', () => {
    it('should dispatch properly', () => {
      store.dispatch(timerActions.setTimers());
      const actions = store.getActions();
      expect(actions.length).toBe(1);
      expect(actions[0].type).toBe(types.SET_TIMERS);
    });
  });

  describe('updateTimers', () => {
    it('should dispatch properly', () => {
      store.dispatch(dispatch => timerActions.updateTimers(dispatch, 1));
      const actions = store.getActions();
      expect(actions.length).toBe(1);
      expect(actions[0].type).toBe(types.UPDATE_TIMERS);
    });
  });
});
