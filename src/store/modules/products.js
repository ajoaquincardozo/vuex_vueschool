import shop from "@/api/shop"

export default {
  namespaced: true,

  state: {
    items: []
  },

  getters: {
    availableProducts(state, getters) {
      //Productos disponibles
      return state.items.filter(product => product.inventory > 0);
    },

    productInStock() {
      return (product) => product.inventory > 0
    }
  },

  actions: {
    //fecthProducts recibe el context, que es el store involucrado.
    fetchProducts({ commit }) {      
      return new Promise((resolve, reject) => {
        //Hace el llamado a la api. | No se deberia alterar el state(estado) en las acciones sino mas bien en la mutaciones.
        shop.getProducts(products => {
          commit("setProducts", products);
          resolve()
        });
      })
    }
  },

  mutations: {
    setProducts(state, products) {
      //productis == payload
      state.items = products; //update products
    },

    decrementProductInventory(state, product) {
      product.inventory--
    }
  }
}