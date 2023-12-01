import * as actionType from '../constants/actionTypes';

const authReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case actionType.AUTH:
      //sending all the data for login to local storage so that the browser knows we're still logged in
      localStorage.setItem('profile', JSON.stringify({ ...action?.data }));
      
      return { ...state, authData: action.data, loading: false, errors: null };
    
    case actionType.LOGOUT:
      localStorage.clear();

      return { ...state, authData: null, loading: false, errors: null };
    
    default:
      return state;
  }
};

export default authReducer;
