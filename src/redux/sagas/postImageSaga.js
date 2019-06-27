import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* postImage(action) {
  try {
    // console.log('postImage:', action.payload)
    yield axios.post('/api/shelf', action.payload);
   //yield for get Images
  } catch (error) {
      console.log('Error with image post:', error);
  }
}

function* postImageSaga() {
  yield takeLatest('POST_IMAGE', postImage);
}

export default postImageSaga;
