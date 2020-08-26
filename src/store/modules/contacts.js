export default {

    namespaced: true,
    state: {
        contacts: [
            {
                fullname: 'Ivan Ivanov',
                address: 'Lesnaya str., 16',
                telephone: '+7-999-16-48',
                email: 'ivan@mail.ru'
            },
            {
                fullname: 'Petr Sidorov',
                address: 'Central str., 24, 48',
                telephone: '+7-916-45-14',
                email: 'petr99@mail.ru'
                    },
            {
                fullname: 'Maksim Perepelica',
                address: 'Western str., 56, 128',
                telephone: '+7-124-97-97',
                email: 'maks@mail.ru'
                    },
            {
                fullname: 'Zahar Petrov',
                address: 'Narodnaya str., 99, 101',
                telephone: '+7-899-23-51',
                email: 'zahar@mail.ru'
                    },
            {
                fullname: 'Василий Федоров',
                address: 'Загородная улица, 15б, 46',
                telephone: '+7-567-45-54',
                email: 'vasya@mail.ru'
            }
        ]
    },
    getters: {
        getContacts(state) {
            return state.contacts
        }
    },
    mutations: {
        addContact(state, addItem) {
            state.contacts.push(addItem)
        },
        deleteContact(state, item){
            let index = state.contacts.indexOf(item)
            state.contacts.splice(index, 1)
        },
        editContact(state, item){
            Object.assign(state.contacts[item.index], item.editedItem)
        }
    },
    actions: {
        addContact(store, addItem) {
            return new Promise(function (resolve, reject) {
                store.commit('addContact', addItem);
                resolve();
            });
        },
        deleteContact(store, item) {
            return new Promise(function (resolve, reject) {
                store.commit('deleteContact', item);
                resolve();
            });
        },
        editContact(store, item) {
            return new Promise(function (resolve, reject) {
                store.commit('editContact', item);
                resolve();
            });
        }
    }
}
