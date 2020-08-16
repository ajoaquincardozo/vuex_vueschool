<template>
  <div>
    <h1>Product List</h1>

    <img
      v-if="loading"
      src="https://i.imgur.com/JfPpwOA.gif"
    >

    <ul v-else>
      <li v-for="product in products" :key="product.id">
        {{product.title}} - {{product.price | currency }} - {{product.inventory}}
        <button 
          :disabled="!productIsInStock(product)"
          @click="addProductToCart(product)"
        >Add to cart</button>
      </li>
    </ul>
  </div>
</template>
 
<script>
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
  data () {
    return {
      loading: false,
      productIndex: 1 
    }
  },

  computed: {
    ...mapState('products', {
        //Ejemplos de uso de mapState.
        // specificProduct (state) { return state.product[this.productIndex]}
        products: state => state.items
    }),

    ...mapGetters('products', {
      productIsInStock: "productInStock"
    })
  },

  // computed: {
  //   products () {
  //     return this.$store.state.products
  //   },

  //   productIsInStock () {
  //     return this.$store.getters.productInStock
  //   }
  // },

  methods: {
    ...mapActions({
      fetchProducts: "products/fetchProducts",
      addProductToCart: "cart/addProductToCart"
    })

    //Se reeemplazo por medio del mapActions
    // addProductToCart (product) {
    //   this.$store.dispatch("addProductToCart", product)
    // }
  },

  //dispatch es analogo a hacer el commit, pero este esta vinculado a actions
  //De esta manera se desacopla la logica de la Api del componente en si.
  created () {
    this.loading = true
    this.fetchProducts().then(() => this.loading = false)
  }
}
</script>

<style>

</style>