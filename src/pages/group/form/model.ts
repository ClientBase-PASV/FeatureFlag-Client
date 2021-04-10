import { Effect, history, Reducer } from 'umi';

import { queryGroupCreate, queryGroupGetById, queryGroupUpdateById } from '@/pages/group/queries';
import defaultReducers from '@/utils/defaultReducers';

export interface IState {}

export interface GroupModelType {
  namespace: string;
  state: IState;
  effects: {
    create: Effect;
    getById: Effect;
    updateById: Effect;
    reset: Effect;
  };
  reducers: {
    save: Reducer<IState>;
  };
}

const initialState = {};

const GroupModel: GroupModelType = {
  namespace: 'GroupForm',

  state: initialState,

  effects: {
    *create({ payload }, { call, put }) {
      yield call(queryGroupCreate, payload);
      yield put({ type: 'GroupDashboard/groupSearch' });
      yield put({ type: 'Sidepanel/close' });
      history.push('/group');
    },

    *getById({ payload }, { call, put }) {
      yield put({ type: 'save', payload: { groupInfo: {} } });
      const data = yield call(queryGroupGetById, payload);
      yield put({ type: 'save', payload: { groupInfo: data.payload } });
    },

    *updateById({ payload }, { call, put }) {
      yield call(queryGroupUpdateById, payload);
      yield put({ type: 'Sidepanel/close' });
      yield put({ type: 'GroupDashboard/groupSearch', payload: payload.queryParams });
    },

    *reset(_, { put }) {
      yield put({ type: 'save', payload: initialState });
    },
  },

  reducers: {
    ...defaultReducers,
  },
};

export default GroupModel;
