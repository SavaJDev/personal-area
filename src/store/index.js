import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import users from './modules/users.js'
import contacts from './modules/contacts.js'

export const store = new Vuex.Store({
	modules: {
		users,
        contacts
	},
	strict: process.env.NODE_ENV !== 'production'
})