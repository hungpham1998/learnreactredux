import {ADD_PRODUCT_TO_CART,REMOVE_PRODUCT_ID,REMOVE_PRODUCT_FROM_CART,SEARCH_PRODUCT, ADD_PRODUCT, UPDATE_PRODUCT} from './typeaction';

const initialState = {
  products: [
    { id: 1, title: 'Gaming Mouse', price: 29.99 },
    { id: 2, title: 'Harry Potter 3', price: 9.99 },
    { id: 3, title: 'Used plastic bottle', price: 0.99 },
    { id: 4, title: 'Half-dried plant', price: 2.99 },
    { id: 5, title: 'Gaming Mouse', price: 19.99 },
  ],
  cart: [],
  cartSum: 0,
  filter: ''
};

const shopReducer = (state = initialState, action) => {
  let updatedCart;
  let updatedItemIndex;
  let products = [...state.products];
  switch (action.type) {
    case ADD_PRODUCT_TO_CART:
      updatedCart = [...state.cart];
      updatedItemIndex = updatedCart.findIndex(
        item => item.id === action.payload.id
      );

      if (updatedItemIndex < 0) {
        updatedCart.push({ ...action.payload, quantity: 1 });
        localStorage.setItem("updatedCart", JSON.stringify(updatedCart))
      } else {
        const updatedItem = {
          ...updatedCart[updatedItemIndex]
        };
        updatedItem.quantity++;
        updatedCart[updatedItemIndex] = updatedItem;
        localStorage.setItem("updatedCart", JSON.stringify(updatedCart))
      }
      return { ...state, cart: updatedCart };

    case REMOVE_PRODUCT_FROM_CART:
      updatedCart = [...state.cart];
      updatedItemIndex = updatedCart.findIndex(
        item => item.id === action.payload
      );

      const updatedItem = {
        ...updatedCart[updatedItemIndex]
      };
      updatedItem.quantity--;
      if (updatedItem.quantity <= 0) {
        updatedCart.splice(updatedItemIndex, 1);
        localStorage.setItem("updatedCart", JSON.stringify(updatedCart))
      } else {
        updatedCart[updatedItemIndex] = updatedItem;
        localStorage.setItem("updatedCart", JSON.stringify(updatedCart))
      }
      return { ...state, cart: updatedCart };

    case REMOVE_PRODUCT_ID:
      let  data = products.findIndex(item =>
        item.id === action.payload.id
      )
      products.splice(data,1)
      localStorage.setItem("updatedCart", JSON.stringify(updatedCart))
      return {...state , products: [...products]};

    case SEARCH_PRODUCT:
      const filter = action.payload.toLowerCase()
        return {
          ...state,
          filter: filter,
          products: filter
              ? products.filter(
                products =>
                products.title.toLowerCase().indexOf(filter) > -1,
              )
              : products,
        };
      
    case ADD_PRODUCT:
       let newproduct = action.payload
       products = products.concat(newproduct);
       localStorage.setItem("products", JSON.stringify(products))
       return {
         ...state,
         products: products
       }
    case UPDATE_PRODUCT: 
     let product = products.map((item) => item.id ===  action.payload.id ? {...item, ...action.payload}: item)
       localStorage.setItem("products", JSON.stringify(product))
       return { 
        ...state, 
        products: product
     }
    default:
      return state;
  }
};

export default shopReducer;
