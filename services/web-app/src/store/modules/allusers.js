import {
  ALL_USERS_REQUEST,
  ALL_USERS_SUCCESS,
  ALL_USERS_ERROR
} from '../actions/user'
import apiCall from 'utils/api'
import Vue from 'vue'

// User state has status and the profile object
const state = { users: [] }

/**
 * Getters for
 * - the profile object
 * - isProfileLoaded
 */
const getters = {
  getAllUsers: (state) => state.users,
  isProfileLoaded: (state) => !!state.profile.name
}

/**
 *
 */
const actions = {
  [ALL_USERS_REQUEST]: ({ commit, dispatch }) => {
    commit(ALL_USERS_REQUEST)
    apiCall({ url: 'user/me' })
      .then((resp) => {
        commit(ALL_USERS_SUCCESS, resp)
      })
      .catch((resp) => {
        commit(ALL_USERS_ERROR)
      })
  }
}

const mutations = {
  [ALL_USERS_REQUEST]: (state) => {
    state.status = 'loading'
  },
  [ALL_USERS_SUCCESS]: (state, resp) => {
    state.status = 'success'
    Vue.set(state, 'profile', resp)
  },
  [USER_ERROR]: (state) => {
    state.status = 'error'
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
