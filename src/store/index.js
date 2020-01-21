import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import state from './state'

import getters from './getters'

import * as actions from './actions'

import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'
export default new Vuex.Store({
  mutations,state,getters,actions,
  strict: debug,
  plugins: debug ? [createLogger()] : []
})