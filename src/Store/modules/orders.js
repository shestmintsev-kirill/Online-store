import * as fb from 'firebase'

class Order {
  constructor (name, phone, productId, done = false, id = null) {
    this.name = name
    this.phone = phone
    this.productId = productId
    this.done = done
    this.id = id
  }
}
export default {
  state: {
    orders: []
  },
  mutations: {
    loadOrders (state, payload) {
      state.orders = payload
    }
  },
  actions: {
    async createOrder ({commit}, {name, phone, productId, ownerId}) {
      const order = new Order(name, phone, productId)
      commit('clearError')
      try {
        await fb.database().ref(`/users/${ownerId}/orders`).push(order)
      } catch (error) {
        commit('setError', error.message)
        throw error
      }
    },
    async fetchOrders ({commit}) {
      commit('setLoading', true)
      commit('clearError')
      const resultOrders = []
      try {
        const fbVal = await fb.database().ref(`/users/${fb.auth().currentUser.uid}/orders`).once('value')
        const orders = fbVal.val()
        Object.keys(orders).forEach(key => {
          const order = orders[key]
          resultOrders.push(new Order(order.name, order.phone, order.productId, order.done, key))
        })
        commit('loadOrders', resultOrders)
        commit('setLoading', false)
      } catch (error) {
        commit('setError', error.message)
        commit('setLoading', false)
      }
    },
    async markOrderDone ({commit}, payload) {
      commit('clearError')
      try {
        await fb.database().ref(`/users/${fb.auth().currentUser.uid}/orders`).child(payload).update({
          done: true
        })
      } catch (error) {
        commit('setError', error.message)
        throw error
      }
    }
  },
  getters: {
    doneOrders (state) {
      return state.orders.filter(order => order.done)
    },
    undoneOrders (state) {
      return state.orders.filter(order => !order.done)
    },
    orders (state, getters) {
      return getters.undoneOrders.concat(getters.doneOrders)
    }
  }
}
