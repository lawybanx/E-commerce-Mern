import axios from 'axios';
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_DETAILS_REQUEST,
  USER_DETAILS_FAIL,
  USER_DETAILS_SUCCESS,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_DETAILS_RESET,
} from '../constants/userConstants';

// Login User
export const loginUser = formData => async dispatch => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const { data } = await axios.post('/api/users/login', formData);

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (err) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.response.data.errors,
    });
  }
};

// Register User
export const registerUser = formData => async dispatch => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });

    const { data } = await axios.post('/api/users', formData);

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    });

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (err) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.response.data.errors,
    });
  }
};

// Logout User
export const logout = () => dispatch => {
  localStorage.removeItem('userInfo');
  // localStorage.removeItem('cartItems');
  dispatch({ type: USER_DETAILS_RESET });
  dispatch({ type: USER_LOGOUT });
  // document.location.href = '/login';
};

// Get User Profile
export const getUserDetails = id => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });

    const { data } = await axios.get(`api/users/${id}`, tokenConfig(getState));

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.response.data.errors,
    });
  }
};

// Update User Profile
export const updateUserProfile = formData => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_UPDATE_PROFILE_REQUEST });

    const { data } = await axios.put(
      'api/users/profile',
      formData,
      tokenConfig(getState)
    );

    dispatch({
      type: USER_UPDATE_PROFILE_SUCCESS,
      payload: data,
    });

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (err) {
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.response.data.errors,
    });
  }
};

export const tokenConfig = getState => {
  // Get token from localstorage
  const { token } = getState().user.userInfo;

  // Headers
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return config;
};
