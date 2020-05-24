import * as fb from 'firebase'

class Product {
  constructor (title, vendor, color, material, price, description, ownerId, imageSrc = '', promo = false, id = null) {
    this.title = title
    this.vendor = vendor
    this.color = color
    this.material = material
    this.price = price
    this.description = description
    this.ownerId = ownerId
    this.imageSrc = imageSrc
    this.promo = promo
    this.id = id
  }
}

export default {
  state: {
    products: []
  },
  mutations: {
    async createProduct (state, payload) {
      state.products.push(payload)
    },
    loadProducts (state, payload) {
      state.products = payload // в эту мутацию передаю массив товаров
    },
    updateProduct (state, {title, description, id}) {
      const product = state.products.find(a => {
        return a.id === id
      })
      product.title = title
      product.description = description
    }
  },
  actions: {
    async createProduct ({ commit }, payload) {
      commit('clearError')
      commit('setLoading', true)
      const image = payload.image
      try {
        const newProduct = new Product(
          payload.title,
          payload.vendor,
          payload.color,
          payload.material,
          payload.price,
          payload.description,
          fb.auth().currentUser.uid,
          '',
          payload.promo)

        const product = await fb.database().ref('products').push(newProduct)
        const imageExt = image.name.slice(image.name.lastIndexOf('.'))
        const fileData = await fb.storage().ref(`product/${product.key}.${imageExt}`).put(image)
        const imageSrc = await fb.storage().ref().child(fileData.ref.fullPath).getDownloadURL()
        await fb.database().ref('products').child(product.key).update({ imageSrc })
        // console.log(product)
        commit('setLoading', false)
        commit('createProduct', {
          ...newProduct,
          id: product.key,
          imageSrc
        })
      } catch (error) {
        commit('setError', error.massage)
        commit('setLoading', false)
        throw error
      }
    },
    async fetchProducts ({commit}) {
      commit('clearError')
      commit('setLoading', true)
      const resultProducts = []
      try {
        const productsVal = await fb.database().ref('products').once('value')
        const products = productsVal.val()
        Object.keys(products).forEach(key => {
          const product = products[key]
          resultProducts.push(
            new Product(
              product.title,
              product.vendor,
              product.color,
              product.material,
              product.price,
              product.description,
              product.ownerId,
              product.imageSrc,
              product.promo,
              key
            )
          )
          commit('loadProducts', resultProducts)
          commit('setLoading', false)
        })
      } catch (error) {
        commit('setError', error.massage)
        commit('setLoading', false)
        throw error
      }
    },
    async updateProduct ({commit}, {title, description, id}) {
      commit('clearError')
      commit('setLoading', true)
      try {
        await fb.database().ref('products').child(id).update({
          title,
          description
        })
        commit('updateProduct', {
          title,
          description,
          id
        })
        commit('setLoading', false)
      } catch (error) {
        commit('setError', error.massage)
        commit('setLoading', false)
        throw error
      }
    }
  },
  getters: {
    products (state) {
      return state.products
    },
    promoProducts (state) {
      return state.products.filter(product => {
        return product.promo
      })
    },
    myProducts (state) {
      return state.products.filter(product => {
        return product.ownerId === fb.auth().currentUser.uid
      })
    },
    productById (state) {
      return productId => {
        return state.products.find(product => product.id === productId)
      }
    }
  }
}
