import Vue from 'vue'
import Vuex from 'vuex'
import global from './modules/global.js'
import schedule from './modules/schedule.js'


Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    modules: {
        global,
        schedule
    },
    strict: debug,
    // mutations: {
    //     updateVal(state, name) {
    //         state.global.name = name;
    //     }
    // }
})
