import axios from "axios";
import { apiCallBegan, apiCallFailed, apiCallSuccess } from "../api";

const api =
  ({ dispatch, getState }) =>
  (next) =>
  async (action) => {
    if (action.type !== apiCallBegan.type) {
      return next(action);
    }

    const { url, method, data, onSuccess, onError, onStart } = action.payload;

    if (onStart) {
      dispatch({ type: onStart });
    }

    next(action);

    try {
      const response = await axios.request({
        baseURL: "http://localhost:9001/api",
        url,
        method,
        data,
      });

      dispatch(apiCallSuccess(response.data));

      if (onSuccess) {
        dispatch({ type: onSuccess, payload: response.data });
      }
    } catch (err) {
      // generic error dispatch
      dispatch(apiCallFailed(err.message));
      // specific error dispatch
      if (onError) {
        dispatch({ type: onError, payload: err.message });
      }
    }
  };

export default api;
