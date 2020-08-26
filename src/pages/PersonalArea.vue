<template>
    <v-data-table :headers="headers" :items="contacts" :search="search" class="elevation-1">
        <template v-slot:top>
            <v-toolbar flat color="white">
                <v-toolbar-title>My contacts</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer></v-spacer>
                <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog" max-width="500px">
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">New contact</v-btn>
                    </template>
                    <v-card>
                        <v-card-title>
                            <span class="headline">{{ formTitle }}</span>
                        </v-card-title>

                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field v-model="editedItem.fullname" label="Full name"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field v-model="editedItem.address" label="Address"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field v-model="editedItem.telephone" label="Telephone"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field v-model="editedItem.email" label="E-mail"></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card-text>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                            <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
            <v-icon small class="mr-2" @click="editItem(item)">
                mdi-pencil
            </v-icon>
            <v-icon small @click="deleteItem(item)">
                mdi-delete
            </v-icon>
        </template>
    </v-data-table>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex';
    
    export default {
        name: 'PersonalArea',

        data: () => ({
            dialog: false,
            search: '',
            headers: [{
                    text: 'Full name',
                    align: 'start',
                    value: 'fullname',
                },
                {
                    text: 'Address',
                    sortable: false,
                    align: 'center',
                    value: 'address'
                },
                {
                    text: 'Telephone',
                    sortable: false,
                    align: 'center',
                    value: 'telephone'
                },
                {
                    text: 'E-mail',
                    sortable: false,
                    align: 'center',
                    value: 'email'
                },
                {
                    text: 'Actions',
                    value: 'actions',
                    sortable: false
                },
            ],
            editedIndex: -1,
            editedItem: {
                fullname: '',
                address: '',
                telephone: '',
                email: ''
            },
            defaultItem: {
                fullname: '',
                address: '',
                telephone: '+7',
                email: ''
            },
        }),

        computed: {
            ...mapGetters({
				contacts: 'contacts/getContacts'
			}),
            formTitle() {
                return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
            },
        },

        watch: {
            dialog(val) {
                val || this.close()
            },
        },

        created() {
            
        },

        methods: {
            ...mapActions({
                addContact: 'contacts/addContact',
				deleteContact: 'contacts/deleteContact',
                editContact: 'contacts/editContact'
			}),
            editItem(item) {
                this.editedIndex = this.contacts.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.dialog = true
            },

            deleteItem(item) {
                confirm('Are you sure you want to delete this item?') && this.deleteContact(item)
            },

            close() {
                this.dialog = false
                this.$nextTick(() => {
                    this.editedItem = Object.assign({}, this.defaultItem)
                    this.editedIndex = -1
                })
            },
            save() {
                if (this.editedIndex > -1) {
                    this.editContact({
                        index: this.editedIndex, 
                        editedItem: this.editedItem})
                } else {
                    this.addContact(this.editedItem)
                }
                this.close()
            }
        },
    }

</script>

<style scoped>


</style>
