import {
  FETCH_EMPLOYEE_DATA_REQUEST,
  FETCH_EMPLOYEE_DATA_SUCCESS,
  FETCH_EMPLOYEE_DATA_FAILURE,
  ADD_EMPLOYEE_DATA,
  ADD_EMPLOYEE_DATA_SUCCESS,
  ADD_EMPLOYEE_DATA_FAILURE,
  DELETE_EMPLOYEE_DATA,
  DELETE_EMPLOYEE_DATA_SUCCESS,
  DELETE_EMPLOYEE_DATA_FAILURE,
} from "../Employee/employeeDataTypes";

const initialState = {
  data: [],
  errorMsg: "",
  error: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_EMPLOYEE_DATA_REQUEST:
      return {
        ...state,
        loading: action.payload,
      };
    case FETCH_EMPLOYEE_DATA_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: action.loading,
      };

    case FETCH_EMPLOYEE_DATA_FAILURE:
      return {
        loading: action.loading,
        data: [],
        errorMsg: action.payload,
        error: true,
      };
    case ADD_EMPLOYEE_DATA:
      return {
        ...state,
        saving: action.saving,
      };
    case ADD_EMPLOYEE_DATA_SUCCESS:
      return {
        ...state,
        data: [...state.data, action.payload],
        saving: action.saving,
      };
    case ADD_EMPLOYEE_DATA_FAILURE:
      return {
        ...state,
        errorMsg: action.payload,
        error: true,
        saving: action.saving,
      };

    case DELETE_EMPLOYEE_DATA:
      return {
        ...state,
        deleting: action.payload,
      };
    case DELETE_EMPLOYEE_DATA_SUCCESS:
      return {
        ...state,
        data: state.data.filter((employee) => employee._id !== action.id),
        deleting: action.deleting,
      };
    case DELETE_EMPLOYEE_DATA_FAILURE:
      return {
        loading: false,
        data: [],
        errorMsg: action.payload,
        error: true,
      };

    default:
      return state;
  }
};

export default reducer;
