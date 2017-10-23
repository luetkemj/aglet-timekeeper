import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as types from '../../constants/action-types';
import * as appActions from './app.actions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
let store;

describe('app actions', () => {
  beforeEach(() => {
    store = mockStore({
      historyState: {
        time: [0],
      },
    });
  });

  it('should exist', () => {
    expect(appActions).toBeDefined();
  });

  describe('bootstrap', () => {
    it('should dispatch properly', () => {
      store.dispatch(appActions.bootstrap());
      const actions = store.getActions();
      expect(actions).toEqual([
        {
          timers: [],
          type: types.SET_TIMERS,
        },
        {
          ms: 0,
          type: types.UPDATE_TIMEKEEPER,
        },
        {
          lastMs: 0,
          ms: 0,
          type: types.UPDATE_TIMERS,
        },
      ]);
    });
  });
});
