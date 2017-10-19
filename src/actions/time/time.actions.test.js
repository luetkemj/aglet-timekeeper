import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as types from '../../constants/action-types';
import * as timeActions from './time.actions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
let store;

describe('time actions', () => {
  beforeEach(() => {
    store = mockStore({
      historyState: {
        time: [0],
      },
    });
  });

  describe('updateTime', () => {
    it('should dispatch properly', () => {
      store.dispatch(timeActions.updateTime(1000));
      const actions = store.getActions();
      expect(actions).toEqual([
        {
          type: types.UPDATE_TIMEKEEPER,
          ms: 1000,
        },
        {
          type: types.UPDATE_TIME_HISTORY,
          ms: 1000,
        },
        {
          type: types.UPDATE_TIMERS,
          lastMs: 0,
          ms: 1000,
        },
      ]);
    });
  });

  describe('undoUpdateTime', () => {
    describe('when history.time.length === 1', () => {
      beforeEach(() => {
        store = mockStore({
          historyState: {
            time: [0],
          },
        });
      });

      it('should dispatch properly', () => {
        store.dispatch(timeActions.undoUpdateTime(1000));
        const actions = store.getActions();
        expect(actions).toEqual([
          {
            type: types.UPDATE_TIMEKEEPER,
            ms: 1000,
          },
          {
            type: types.UNDO_UPDATE_TIME_HISTORY,
          },
          {
            type: types.UPDATE_TIMERS,
            lastMs: 0,
            ms: 1000,
          },
        ]);
      });
    });

    describe('when history.time.length === 2', () => {
      beforeEach(() => {
        store = mockStore({
          historyState: {
            time: [0, 1],
          },
        });
      });

      it('should dispatch properly', () => {
        store.dispatch(timeActions.undoUpdateTime(1000));
        const actions = store.getActions();
        expect(actions).toEqual([
          {
            type: types.UPDATE_TIMEKEEPER,
            ms: 1000,
          },
          {
            type: types.UNDO_UPDATE_TIME_HISTORY,
          },
          {
            type: types.UPDATE_TIMERS,
            lastMs: 0,
            ms: 1000,
          },
        ]);
      });
    });

    describe('when history.time.length === 3', () => {
      beforeEach(() => {
        store = mockStore({
          historyState: {
            time: [0, 1, 2],
          },
        });
      });

      it('should dispatch properly', () => {
        store.dispatch(timeActions.undoUpdateTime(1000));
        const actions = store.getActions();
        expect(actions).toEqual([
          {
            type: types.UPDATE_TIMEKEEPER,
            ms: 1000,
          },
          {
            type: types.UNDO_UPDATE_TIME_HISTORY,
          },
          {
            type: types.UPDATE_TIMERS,
            lastMs: 0,
            ms: 1000,
          },
        ]);
      });
    });

    describe('when history.time.length === 4', () => {
      beforeEach(() => {
        store = mockStore({
          historyState: {
            time: [0, 1, 2, 3, 4, 5, 6, 7, 8],
          },
        });
      });

      it('should dispatch properly', () => {
        store.dispatch(timeActions.undoUpdateTime(1000));
        const actions = store.getActions();
        expect(actions).toEqual([
          {
            type: types.UPDATE_TIMEKEEPER,
            ms: 1000,
          },
          {
            type: types.UNDO_UPDATE_TIME_HISTORY,
          },
          {
            type: types.UPDATE_TIMERS,
            lastMs: 6,
            ms: 1000,
          },
        ]);
      });
    });
  });
});
