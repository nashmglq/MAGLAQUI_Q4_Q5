import {
    PRODUCT_PATCH_REQUEST,
    PRODUCT_PATCH_SUCCESS,
    PRODUCT_PATCH_FAIL,
  } from '../constants/patchConstants';
  
  export const productPatchReducer = (state = {}, action) => {
    switch (action.type) {
      case PRODUCT_PATCH_REQUEST:
        return { loading: true };
      case PRODUCT_PATCH_SUCCESS:
        return { loading: false, success: true, product: action.payload };
      case PRODUCT_PATCH_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  