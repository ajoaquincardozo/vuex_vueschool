import shop from "@/api/shop"

//Actions == methods
export default {
  //fecthProducts recibe el context, que es el store involucrado.
  fetchProducts({ commit }) {
    //Hace el llamado a la api.
    //No se deberia alterar el state(estado) en las acciones sino mas bien en la mutaciones.
    return new Promise((resolve, reject) => {
      shop.getProducts(products => {
        commit("setProducts", products);
        resolve()
      });
    })
  }
}