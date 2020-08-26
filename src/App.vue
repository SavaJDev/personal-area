<template>
    <v-app>
        <v-app-bar app color="primary" dark>
            <div>
                <h1>Personal area</h1>
            </div>

            <v-spacer></v-spacer>
            <v-btn v-if="flagLogin" text @click="logout">
                <span class="mr-2">Log out</span>
                <v-icon>mdi-logout-variant</v-icon>
            </v-btn>
        </v-app-bar>

        <v-main>
            <div class="main-view">
                <transition name="slide" mode="out-in">
                    <router-view></router-view>
                </transition>
            </div>
        </v-main>
    </v-app>
</template>

<script>
    export default {
        name: 'App',

        components: {

        },

        data: () => ({
            flagLogin: false
        }),
        methods: {
            logout(){
                this.$router.push("/login")
            }
        },
        computed: {

        },
        watch: {
            $route(to, from) {
                if(to.name == 'personal-area') this.flagLogin = true
                else this.flagLogin = false
            }
        }
    }

</script>

<style scoped>
    .main-view {
        height: 100%;
    }
    
    .slide-enter-active{
		animation: slideIn 0.5s;
	}

	.slide-leave-active{
		animation: slideOut 0.5s;
	}
    
    @keyframes slideIn{
		from{transform: rotateY(90deg);}
		to{transform: rotateY(0deg);}
	}

	@keyframes slideOut{
		from{transform: rotateY(0deg);}
		to{transform: rotateY(90deg);}
	}

</style>
