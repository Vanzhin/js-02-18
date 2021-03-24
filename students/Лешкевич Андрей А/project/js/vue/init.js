"use strict";
const { createStore, mapGetters, mapActions } = Vuex;
const { createApp, ref, onMounted, computed } = Vue;
function getURLs() {
  const regex = /(?<=\/)([^\/]*)(\.ht\w+)$/gm;
  let m,
    url = {
      Cart: "api/cart/get/index.json",
      CatalogCashed: "api/catalog/elements/get/all.json",
      CatalogDisplayed: "api/catalog/displayed/get/index.json",
    };
  if ((m = regex.exec(window.location.href)) !== null) {
    switch (m[1]) {
      case "":
      case "index":
        url.Cart = "api/cart/get/index.json";
        url.CatalogCashed = "api/catalog/elements/get/all.json";
        url.CatalogDisplayed = "api/catalog/displayed/get/index.json";
        break;
      case "Checkout":
        url.Cart = "api/cart/get/checkout.json";
        url.CatalogCashed = "api/catalog/elements/get/all.json";
        url.CatalogDisplayed = "api/catalog/displayed/get/checkout.json";
        break;
      case "Product":
        url.Cart = "api/cart/get/Product.json";
        url.CatalogCashed = "api/catalog/elements/get/Product.json";
        url.CatalogDisplayed = "api/catalog/displayed/get/Product.json";
        break;
      case "Shopping Cart":
        case "Shopping%20Cart":
        url.Cart = "api/cart/get/Shopping Cart.jso";
        url.CatalogCashed = "api/catalog/elements/get/Shopping Cart.jso";
        url.CatalogDisplayed = "api/catalog/displayed/get/Shopping Cart.jso";
        break;
      case "Single Page":
        case "Single%20Page":
        url.Cart = "api/cart/get/Single Page.json";
        url.CatalogCashed = "api/catalog/elements/get/Single Page.json";
        url.CatalogDisplayed = "api/catalog/displayed/get/Single Page.json";
        break;
    }
  }
  return url;
}
const store = createStore({
  state() {
    return {
      CatalogChashed: {
        isLoaded: false,
        value: [],
      },
      CatalogDisplayedItems: {
        isLoaded: false,
        value: [],
      },
      Cart: {
        isLoaded: false,
        value: [],
      },
    };
  },
  getters: {
    CatalogDisplayed: (state) => {
      if (
        state.CatalogChashed.isLoaded &&
        state.CatalogDisplayedItems.isLoaded
      ) {
        return state.CatalogDisplayedItems.value.map((item) => {
          let elem = state.CatalogChashed.value.find((obj) => {
            return obj.id === item.id;
          });
          if (elem.type[item.type] !== undefined) {
            return {
              id: item.id,
              name: elem.name,
              type: item.type,
              img: elem.type[item.type].img,
              price: elem.type[item.type].price,
              star: elem.type[item.type].star,
              color: elem.type[item.type].color,
              size: elem.type[item.type].size,
            };
          } else return {};
        });
      }
      return [];
    },
    CartDisplayed: (state) => {
      const regex = /(\..+$)/gm;
      if (state.CatalogChashed.isLoaded && state.Cart.isLoaded) {
        return state.Cart.value.map((item) => {
          let elem = state.CatalogChashed.value.find((obj) => {
            return obj.id === item.id;
          });
          if (elem.type[item.type] !== undefined) {
            return {
              id: item.id,
              name: elem.name,
              type: item.type,
              quantity: item.quantity,
              img: elem.type[item.type].img.replace(regex, "_small.png"),
              price: elem.type[item.type].price,
              star: elem.type[item.type].star,
              color: elem.type[item.type].color,
              size: elem.type[item.type].size,
            };
          } else return {};
        });
      }
      return [];
    },
    CartCount: (state) => {
      let stat = {
        products: 0,
        count: 0,
        grand_total: 0,
      };
      if (state.CatalogChashed.isLoaded && state.Cart.isLoaded) {
        for (let item of Object.values(state.Cart.value)) {
          let cat = state.CatalogChashed.value.find((obj) => {
            return obj.id === item.id;
          });
          if (cat) {
            stat.grand_total += cat.type[item.type].price * item.quantity;
            stat.count += item.quantity;
            stat.products++;
          }
        }
      }
      return stat;
    },
  },
  mutations: {
    UpdateCatalogChashed(state, catalog) {
      state.CatalogChashed.value = catalog;
      state.CatalogChashed.isLoaded = true;
    },
    UpdateCatalogDisplayedItems(state, displayed) {
      state.CatalogDisplayedItems.value = displayed;
      state.CatalogDisplayedItems.isLoaded = true;
    },
    UpdateCart(state, cart) {
      state.Cart.value = cart;
      state.Cart.isLoaded = true;
    },
    CartInc(state, index) {
      state.Cart.value[index].quantity++;
    },
    CartDec(state, index) {
      state.Cart.value[index].quantity--;
    },
    CartDel(state, index) {
      state.Cart.value.splice(index, 1);
    },
    CartAdd(state, item) {
      state.Cart.value.push(item);
    }
  },
  actions: {
    async GetCatalogChashed(context) {
      let response = await fetch(getURLs().CatalogCashed);
      if (!response.ok) {
        throw Error(response.statusText);
      }
      let json = await response.json();
      if (json.status === 200) {
        context.commit("UpdateCatalogChashed", json.catalog);
      } else {
        throw Error("Catalog load error");
      }
    },
    async GetCatalogDisplayedItems(context) {
      let response = await fetch(getURLs().CatalogDisplayed);
      if (!response.ok) {
        throw Error(response.statusText);
      }
      let json = await response.json();
      if (json.status === 200) {
        context.commit("UpdateCatalogDisplayedItems", json.displayed);
      } else {
        throw Error("Displayed Catalog load error");
      }
    },
    async GetCart(context) {
      let response = await fetch(getURLs().Cart);
      if (!response.ok) {
        throw Error(response.statusText);
      }
      let json = await response.json();
      if (json.status === 200) {
        context.commit("UpdateCart", json.cart);
      } else {
        throw Error("Cart load error");
      }
    },
    CartInc(context, item) {
      return new Promise((resolve, reject) => {
        let index = context.state.Cart.value.findIndex(obj => { return (obj.id === item.id && obj.type === item.type) });
        if (index !== -1) {
            context.commit('CartInc', index);
          resolve();
        }else{
          reject();
        }
      })
    },
    CartDec(context, item) {
      return new Promise((resolve, reject) => {
        let index = context.state.Cart.value.findIndex(obj => { return (obj.id === item.id && obj.type === item.type) });
        if (index !== -1) {
          if (1 < context.state.Cart.value[index].quantity) {
            context.commit('CartDec', index);
          } else {
            context.commit('CartDel', index);
          }
          resolve();
        }else{
          reject();
        }
      })
    },
    CartDel(context, item) {
      return new Promise((resolve, reject) => {
        let index = context.state.Cart.value.findIndex(obj => { return (obj.id === item.id && obj.type === item.type) });
        if (index !== -1) {
          context.commit('CartDel', index);
          resolve();
        }else{
          reject();
        }
      })
    },
    CartAdd(context, item) {
      return new Promise((resolve, reject) => {
        context.dispatch('CartInc', item).catch(() => {
          context.commit('CartAdd', {
            "id": item.id,
            "type": item.type,
            "quantity": 1
          });
          resolve();
        })
      })
    }
  },
});
const RootComponent = {
  methods: {
    float2str(int, fract = 2) {
      let arr = int.toString().split(".");
      if (arr[1] === undefined) {
        arr[1] = "0";
      }
      arr[1] = arr[1].substring(0, fract).padStart(fract, "0");
      return arr.join(".");
    },
    CartEventDispatcher(event) {
      let target = event.path.find(obj => { return (obj.name === 'btn-inc-item' || obj.name === 'btn-remove-item' || obj.name === 'btn-dec-item') });
      if (target) {
        let item;
        if ((item = this.GetCartData(target)) !== null) {
          if (target.name === 'btn-inc-item') {
            this.CartInc(item);
          } else if (target.name === 'btn-remove-item') {
            this.CartDel(item);
          } else if (target.name === 'btn-dec-item') {
            this.CartDec(item);
          }
        }
      }
    },
    CatalogEventDispatcher(event) {
      let target = event.path.find(obj => { return (obj.name === 'btn-add-item') });
      if (target) {
        let item;
        if ((item = this.GetCatalogData(target)) !== null) {
          if (target.name === 'btn-add-item') {
            this.CartAdd(item);
          }
        }
      }
    },
    GetCartData(_obj) {
      let item = _obj.closest('[data-cart-item][data-cart-item-t]');
      if (item) {
        return { id: parseInt(item.getAttribute('data-cart-item')), type: parseInt(item.getAttribute('data-cart-item-t')) }
      }
      return undefined;
    },
    GetCatalogData(_obj) {
      let item = _obj.closest('[data-catalog-item][data-catalog-item-t]');
      if (item) {
        return { id: parseInt(item.getAttribute('data-catalog-item')), type: parseInt(item.getAttribute('data-catalog-item-t')) }
      }
      return undefined;
    },
    CartInc(item) {
      return this.$store.dispatch('CartInc', item);
    },
    CartDec(item) {
      return this.$store.dispatch('CartDec', item);
    },
    CartAdd(item) {
      return this.$store.dispatch('CartAdd', item);
    },
    CartDel(item) {
      return this.$store.dispatch('CartDel', item);
    }
  },
  computed: {
    ...mapGetters([
      "CartCount",
      "CartDisplayed"
      // ...
    ]),
  },
};
const app = Vue.createApp(RootComponent);
app.use(store);
store.dispatch("GetCatalogChashed");
store.dispatch("GetCatalogDisplayedItems");
store.dispatch("GetCart");
const vm = app.mount("#app-brand-shop");
