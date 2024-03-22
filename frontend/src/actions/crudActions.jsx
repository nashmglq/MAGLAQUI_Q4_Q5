import axios from "axios";
import {
  PRODUCT_POST_REQUEST,
  PRODUCT_POST_SUCCESS,
  PRODUCT_POST_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
} from "../constants/crudConstants";

const instance = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

export const postProduct = (productData) => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_POST_REQUEST,
    });

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const token = userInfo ? userInfo.access : null;

    if (!token) {
      dispatch({
        type: PRODUCT_POST_FAIL,
        payload: "Authentication token not found",
      });
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await instance.post(
      "/api/crud/post/",
      productData,
      config
    );

    dispatch({
      type: PRODUCT_POST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_POST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const deleteProduct = (productId) => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_DELETE_REQUEST,
    });

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const token = userInfo ? userInfo.access : null;

    if (!token) {
      dispatch({
        type: PRODUCT_DELETE_FAIL,
        payload: "Authentication token not found",
      });
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    await instance.delete(`/api/crud/delete/${productId}/`, config);

    dispatch({
      type: PRODUCT_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
