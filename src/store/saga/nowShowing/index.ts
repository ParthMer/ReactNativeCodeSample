import {call, put, takeLatest} from 'redux-saga/effects';
import axios from 'axios';
import {GET_DATA_WATCHER} from '../../constant';
import {getDataFaliure, getDataSuccess} from '../../action';

function* onGetData(action: any) {
  async function callApi() {
    try {
      const data = await axios.get(
        'https://jsonplaceholder.typicode.com/users',
      );
      return {response: data.data};
    } catch (error) {
      return {error};
    }
  }

  const {response, error} = yield call(callApi);

  if (response) {
    yield put(getDataSuccess(response));
  } else {
    yield put(getDataFaliure(error));
  }
}

export function* getDataActionWatcher() {
  yield takeLatest(GET_DATA_WATCHER, onGetData);
}
