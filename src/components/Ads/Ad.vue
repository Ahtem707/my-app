<template>
    <v-container>
        <v-layout row>
            <v-flex xs12>
                <v-card class="my-5" v-if="!loading">
                    <v-img
                    :src="ad.src"
                    height="500px"
                    ></v-img>
                    <v-card-text>
                        <h1 class="text--primary">{{ad.title}}</h1>
                        <p>{{ad.desc}}</p>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <modal-dialog :ad="ad" v-if="isOwner" class="m-2"></modal-dialog>
                        <check-deleted :ad="ad" v-if="isOwner" class="m-2"></check-deleted>
                        <app-vue-modal :ad="ad" class="m-2"></app-vue-modal>
                    </v-card-actions>
                </v-card>
                <div v-else>
                    <v-container>
                    <v-layout row>
                    <v-flex xs12 sm2 offset-sm6 class="mt-5">
                        <v-progress-circular 
                            :size="70"
                            :width="7"
                            color="primary"
                            indeterminate
                        ></v-progress-circular>
                    </v-flex>
                    </v-layout>
                    </v-container>
                </div>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import EditAdModal from './EditAdModal'
import DeleteAdModal from './DeleteAdModal'
export default {
    computed: {
        ad() {
            return this.$store.getters.adById(this.$route.params.id)
        },
        loading() {
            return this.$store.getters.loading
        },
        isOwner () {
            return this.ad.ownerId === this.$store.getters.user.id
        }
    },
    components: {
        'modal-dialog': EditAdModal,
        'check-deleted': DeleteAdModal
	},
    watch: {
        loading: function(val) {
            if(this.ad === undefined && !val) {
                this.$store.commit('setError', "No ad")
                this.$router.push("/")
            }
        }
    }
}
</script>