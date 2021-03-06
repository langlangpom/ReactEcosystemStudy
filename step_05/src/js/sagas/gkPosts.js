import {
  put,
  call,
  take,
  fork
} from 'redux-saga/effects'

import fetch from 'isomorphic-fetch'
import {
  RECEIVE_POSTS,
  GK_REQUEST_POSTS
} from '../actions/actionsTypes'

// 异步获取数据，开始！
function fetchPostsApi() {
  return fetch(`http://localhost:9001/geek`)
    .then(response => response.json() )
    .then(json => json )
}

/*function* fetchPosts() {
 const posts = yield call(fetchPostsApi)
 yield put({type: RECEIVE_POSTS, posts})
 }*/

// /*为什么会出错误？？*/
// function* fetchPosts() {
//  const posts = yield call(fetchPostsApi)
//  yield put(onttReceivePosts(posts))
// }

function* fetchPosts() {
  const posts = yield call(fetchPostsApi)
  yield put({type: RECEIVE_POSTS, posts})
}

export function* gkPosts() {
  while( yield take(GK_REQUEST_POSTS) ){
    yield fork(fetchPosts)
  }
}