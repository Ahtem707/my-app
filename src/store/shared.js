export default {
    state: {
        loading: false,
        error: null
    },
    mutations: {
        setLoading (state,payload) {
            state.loading = payload
        },
        setError (state,payload) {
            state.error = payload
        },
        clearError (state) {
            state.error = null
        }
    },
    actions: {
        setLoading({commit},payload) {
            commit('setLoading',payload)        // call setLoading from mutations
        },
        setError({commit},payload) {
            commit('setError',payload)          // call setError from mutations
        },
        clearError({commit}) {
            commit('setError')          // call clearError from mutations
        }
    },
    getters: {
        loading (state) {
            return state.loading
        },
        error (state) {
            return state.error
        },
    }
}