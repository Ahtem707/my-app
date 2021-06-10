import fb from 'firebase/app';
import 'firebase/auth'

class User {
    constructor (id, displayName, phoneNumber) {
        this.id = id
        this.displayName = displayName
        this.phoneNumber = phoneNumber
    }
}

export default {
    state: {
        user: null
    },
    mutations: {
        setUser(state,payload) {
            state.user = payload
        },      
    },
    actions: {
        async registerUser({commit},{email,password,name,phoneNumber}) {
            commit('clearError')
            commit('setLoading',true)
            try {
                indexedDB.deleteDatabase('firebaseLocalStorageDb')
                await fb.auth().createUserWithEmailAndPassword(email,password)
                .then((res) => {
                    res.user
                    .updateProfile({
                        displayName: name,
                        phoneNumber: phoneNumber
                    })
                })
                await fb.auth().signInWithEmailAndPassword(email,password)
                .then((res) => {
                    commit('setUser', new User(res.user.uid, res.user.displayName, res.user.phoneNumber))
                    commit('setLoading', false)
                })
            } catch (error) {
                commit('setLoading', false)
                commit('setError', error.message)
                throw error
            }
        },
        async loginUser({commit},{email,password,shouldStayLoggedIn}) {
            commit('clearError')
            commit('setLoading',true)
            try {
                await fb.auth().signInWithEmailAndPassword(email, password)
                .then((res) => {
                    console.log("shouldStayLoggedIn> ",shouldStayLoggedIn)
                    if(!shouldStayLoggedIn) {
                        console.log("shouldStayLoggedIn> ",shouldStayLoggedIn)
                        indexedDB.deleteDatabase('firebaseLocalStorageDb')
                    }
                    commit('setUser', new User(res.user.uid, res.user.displayName, res.user.phoneNumber))
                    commit('setLoading', false)
                })
            } catch (error) {
                commit('setLoading', false)
                commit('setError', error.message)
                throw error
            }
        },
        autoLoginUser({commit},user) {
            commit('setUser', new User(user.uid,user.displayName, user.phoneNumber))
        },
        logoutUser ({commit}) {
            fb.auth().signOut()
            commit('setUser', null)
        }            
    },
    getters: {
        user(state) {
            return state.user
        },
        isUserLoggedIn (state) {
            return state.user !== null
        }
    }
}