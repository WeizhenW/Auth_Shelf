import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchItems() {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };
    // the config includes credentials which
    // allow the server session to recognize the user
    // If a user is logged in, this will return their information
    // from the server session (req.user)
    const response = yield axios.get('/api/shelf', config);

    // now that the session has given us a user object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in
    yield put({ type: 'SET_ITEMS', payload: response.data });
  } catch (error) {
    console.log('User get request failed', error);
  }
}

function* deleteItem(action) {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    // the config includes credentials which
    // allow the server session to recognize the user
    // If a user is logged in, this will return their information
    // from the server session (req.user)
    const response = yield axios.delete(`/api/shelf/${action.payload.id}`, config);

    // now that the session has given us a user object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in
    yield put({ type: 'FETCH_ITEMS'});
  } catch (error) {
    console.log('User get request failed', error);
  }
}

function* postImage(action) {
  try {
    // console.log('postImage:', action.payload)
    yield axios.post('/api/shelf', action.payload);
   //yield for get Images
    yield put({type: 'FETCH_ITEMS'});
  } catch (error) {
      console.log('Error with image post:', error);
  }
}

function* itemsSaga() {
  yield takeLatest('FETCH_ITEMS', fetchItems);
  yield takeLatest('DELETE_ITEM', deleteItem);
  yield takeLatest('POST_IMAGE', postImage);

}

export default itemsSaga;
