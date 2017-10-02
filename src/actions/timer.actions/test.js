import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as types from '../../constants/action-types';
import * as timerActions from './index';


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
    it('should dispatch properly', () => {
      store.dispatch(timerActions.addTimer({
        ms: 1, text: 'foo' }));
      const actions = store.getActions();
      expect(actions.length).toBe(2);
      expect(actions[0].type).toBe(types.ADD_TIMER);
      expect(actions[1].type).toBe(types.UPDATE_TIMERS);
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

  describe('updateTimers', () => {
    it('should dispatch properly', () => {
      store.dispatch(dispatch => timerActions.updateTimers(dispatch, 1));
      const actions = store.getActions();
      expect(actions.length).toBe(1);
      expect(actions[0].type).toBe(types.UPDATE_TIMERS);
    });
  });
});
