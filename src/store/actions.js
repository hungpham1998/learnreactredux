import {ADD_PRODUCT_TO_CART,REMOVE_PRODUCT_FROM_CART,REMOVE_PRODUCT_ID,SEARCH_PRODUCT, ADD_PRODUCT,UPDATE_PRODUCT}  from './typeaction';
export const addProductToCart = product => {
  return dispatch => {
    setTimeout(() => {
      dispatch({
        type: ADD_PRODUCT_TO_CART,
        payload: product
      });
    }, 700);
  };
};

export const removeProductFromCart = productId => {
    return dispatch => {
      setTimeout(() => {
        dispatch({
          type: REMOVE_PRODUCT_FROM_CART,
          payload: productId
        });
      }, 700);
    };
  };

  export const removeProduct = productId =>{
    return dispatch =>{
      setTimeout(()=>
      {
        dispatch({
          type: REMOVE_PRODUCT_ID,
          payload:productId
        });
      },700);
    };
  };
  export const searchProduct = product =>{
    return dispatch=>{
      setTimeout(()=>{
        dispatch({
          type:SEARCH_PRODUCT,
          payload: product
        })
      },200);
    };
  };
  export const addProduct = product => {
    return dispatch =>{
    setTimeout(()=> dispatch({
        type:ADD_PRODUCT,
        payload: product
      }),500);
    };
  };
  export const updateProduct = product =>{
    return dispatch =>{
      setTimeout(()=> dispatch({
          type:UPDATE_PRODUCT,
          payload: product
        }),500);
      };
  }