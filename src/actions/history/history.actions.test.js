import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as types from '../../constants/action-types';
import * as historyActions from './history.actions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
let store;

describe('history actions', () => {
  beforeEach(() => {
    store = mockStore();
  });

  it('should exist', () => {
    expect(historyActions).toBeDefined();
  });

  describe('resetTimeHistory', () => {
    it('should dispatch properly', () => {
      store.dispatch(historyActions.resetTimeHistory());
      const actions = store.getActions();
      expect(actions.length).toBe(1);
      expect(actions[0].type).toBe(types.RESET_TIME_HISTORY);
    });
  });
});
