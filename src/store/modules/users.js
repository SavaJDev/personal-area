export default {

    namespaced: true,
    state: {
        user: []
    },
    getters: {
        getUser(state) {
            return state.user
        }
    },
    mutations: {
        addUser(state, user) {
            state.user = user;
        }
    },
    actions: {
        addUser(store, user) {
            return new Promise(function (resolve, reject) {
                store.commit('addUser', user);
                resolve();
            });
        }
    }
}
