import shop from "@/api/shop"

export default {
  namespaced: true,

  // = data
  state: {
    //{id, quantity}
    items: [],
    checkoutStatus: null
  },

  // = computed properties
  getters: {
    cartProducts(state, getters, rootState, rootGetters) {
      return state.items.map(cartItem => {
        const product = rootState.products.items.find(product => product.id === cartItem.id)
        return {
          title: product.title,
          price: product.price,
          quantity: cartItem.quantity
        }
      })
    },

    cartTotal(state, getters) {
      return getters
        .cartProducts
        .reduce((total, cartProduct) => total + cartProduct.price * cartProduct.quantity, 0)
    },
  },

  actions: {
    addProductToCart({ state, getters, commit, rootState, rootGetters }, product) {
      const productInStock = rootGetters["products/productInStock"]
      if (!productInStock(product)) return

      //Buscamos el producto en el carrito
      const cartItem = state.items.find(item => item.id === product.id)
      if (!cartItem) {
        commit("pushProductToCart", product.id)
      } else {
        commit("incrementItemQuantity", cartItem)
      }

      commit("products/decrementProductInventory", product, { root: true })
    },

    checkout({ state, commit }) {
      shop.buyProducts(state.items,
        () => {
          commit("emptyCart")
          commit("setCheckoutStatus", "success")
        },
        () => {
          commit("setCheckoutStatus", "fail")
        })
    }
  },

  //Plantear mutaciones requiere que el codigo a implementaciones requiera algo de dienio. Atenti !!
  mutations: {
    //Realizar el mapeo de item en la mutacion es una decision de disenio. Se podria solo haber mapeo en la action. Las 2 estan bien. 
    pushProductToCart(state, productId) {
      state.items.push({
        id: productId,
        quantity: 1
      })
    },

    incrementItemQuantity(state, cartItem) {
      cartItem.quantity++
    },

    setCheckoutStatus(state, status) {
      state.checkoutStatus = status
    },

    emptyCart(state) {
      state.items = []
    }
  }
}