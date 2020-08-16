import Vuex from 'vuex'
import Vue from "vue"
import actions from './actions'
import cart from './modules/cart'
import products from './modules/products'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    cart,
    products
  },

  // = data
  state: {
  },

  // = computed properties
  getters: {

  },

  //=methods
  actions: {

  },

  //Plantear mutaciones requiere que el codigo a implementaciones requiera algo de dienio. Atenti !!
  mutations: {

  }
})