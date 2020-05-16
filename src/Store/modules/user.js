import * as fb from 'firebase'
/* eslint-disable */
class User {
    constructor (id) {
        this.id = id
    }
}

export default {
    state: {
        user: null
    },
    mutations: {
        setUser (state, payload) {
            state.user = payload
        }
    },
    actions: {
        async registerUser ({commit}, {email, password}) {
            commit ('clearError')
            commit ('setLoading', true)
            try {
            const user = await fb.auth().createUserWithEmailAndPassword(email, password)
            commit('setUser', new User(user.uid))
            commit('setLoading', false)
            } catch (error) {
                commit('setLoading', false)
                commit('setError', error.massage)
                throw  error
            }
        },
        async loginUser ({commit}, {email, password}) {
            commit ('clearError')
            commit ('setLoading', true)
            try {
            const user = await fb.auth().signInWithEmailAndPassword(email, password)
            commit('setUser', new User(user.uid))
            commit('setLoading', false)
            } catch (error) {
                commit('setLoading', false)
                commit('setError', error.massage)
                throw  error
            }
        }
    },
    getters: {
        user (state) {
            return state.user
        }
    },
}