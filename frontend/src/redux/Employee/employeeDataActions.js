import axios from "axios";
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

export const fetchEmployee = (loading) => {
  return {
    type: FETCH_EMPLOYEE_DATA_REQUEST,
    payload: loading,
  };
};

export const fetchEmployeeSuccess = (data, loading) => {
  return {
    type: FETCH_EMPLOYEE_DATA_SUCCESS,
    payload: data,
    loading: loading,
  };
};

export const fetchEmployeeFailure = (error, loading) => {
  return {
    type: FETCH_EMPLOYEE_DATA_FAILURE,
    payload: error,
    loading: loading,
  };
};

export const addEmployee = (saving) => {
  return {
    type: ADD_EMPLOYEE_DATA,
    saving: saving,
  };
};
export const addEmployeeSuccess = (data, saving) => {
  return {
    type: ADD_EMPLOYEE_DATA_SUCCESS,
    payload: data,
    saving: saving,
  };
};
export const addEmployeeFailure = (error, saving) => {
  return {
    type: ADD_EMPLOYEE_DATA_FAILURE,
    payload: error,
    saving: saving,
  };
};
export const deleteEmployee = (deleting) => {
  return {
    type: DELETE_EMPLOYEE_DATA,
    payload: deleting,
  };
};
export const deleteEmployeeSuccess = (id, deleting) => {
  return {
    type: DELETE_EMPLOYEE_DATA_SUCCESS,
    id: id,
    deleting: deleting,
  };
};
export const deleteEmployeeFailure = (error) => {
  return {
    type: DELETE_EMPLOYEE_DATA_FAILURE,
    payload: error,
  };
};

export const fetchEmployeeData = () => {
  let loading = true;
  return (dispatch) => {
    dispatch(fetchEmployee(loading));
    axios
      .get("http://localhost:5000/employees/")
      .then((response) => {
        loading = false;
        const data = response.data;
        dispatch(fetchEmployeeSuccess(data, loading));
      })
      .catch((error) => {
        loading = false;
        const errorMsg = error.message;
        dispatch(fetchEmployeeFailure(errorMsg, loading));
      });
  };
};

export const addEmployeeData = (employee) => {
  let saving = true;
  return (dispatch) => {
    dispatch(addEmployee(saving));

    axios
      .post("http://localhost:5000/employees/add", employee)
      .then((response) => {
        saving = false;
        const data = response.data;
        dispatch(addEmployeeSuccess(data, saving));
      })
      .catch((error) => {
        saving = false;
        const errorMsg = error.message;
        dispatch(addEmployeeFailure(errorMsg, saving));
      });
  };
};

export const deleteEmployeeData = (id) => {
  let deleting = true;
  return (dispatch) => {
    dispatch(deleteEmployee(deleting));
    axios
      .delete("http://localhost:5000/employees/" + id)
      .then((response) => {
        deleting = false;
        dispatch(deleteEmployeeSuccess(id, deleting));
      })
      .catch((error) => {
        deleting = false;
        const errorMsg = error.message;
        dispatch(deleteEmployeeFailure(errorMsg, deleting));
      });
  };
};
