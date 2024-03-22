import {
  PRODUCT_PATCH_REQUEST,
  PRODUCT_PATCH_SUCCESS,
  PRODUCT_PATCH_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
} from "../constants/patchConstants";

import axios from "axios";
const instance = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

export const patchProduct = (productId, productData) => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_PATCH_REQUEST,
    });

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const token = userInfo ? userInfo.access : null;

    if (!token) {
      dispatch({
        type: PRODUCT_PATCH_FAIL,
        payload: "Authentication token not found",
      });
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await instance.patch(
      `/api/crud/update/${productId}/`,
      productData,
      config
    );

    dispatch({
      type: PRODUCT_PATCH_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_PATCH_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};


