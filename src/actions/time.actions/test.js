import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as types from '../../constants/action-types';
import * as timeActions from './index';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
let store;

describe('time actions', () => {
  beforeEach(() => {
    store = mockStore({
      timeState: {
        ms: 2,
        history: [],
      },
    });
  });

  describe('updateTime', () => {
    it('should dispatch properly', () => {
      store.dispatch(timeActions.updateTime(1000));
      const actions = store.getActions();
      expect(actions.length).toBe(2);
      expect(actions[0].type).toBe(types.UPDATE_TIME);
      expect(actions[1].type).toBe(types.UPDATE_TIMERS);
    });
  });

  describe('undoUpdateTime', () => {
    it('should dispatch properly', () => {
      store.dispatch(timeActions.undoUpdateTime(1000));
      const actions = store.getActions();
      expect(actions.length).toBe(2);
      expect(actions[0].type).toBe(types.UNDO_UPDATE_TIME);
      expect(actions[1].type).toBe(types.UPDATE_TIMERS);
    });
  });

  describe('resetTime', () => {
    it('should dispatch properly', () => {
      store.dispatch(timeActions.resetTime());
      const actions = store.getActions();
      expect(actions.length).toBe(1);
      expect(actions[0].type).toBe(types.RESET_TIME);
    });
  });
});
