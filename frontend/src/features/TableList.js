import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  fetchEmployeeData,
  addEmployeeData,
  deleteEmployeeData,
} from "../redux";
import "./table.css";
import Table from "react-bootstrap/Table";
import { Card } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import DataForm from "./Form";
import Spinner from "react-bootstrap/Spinner";
function TableList({
  employees,
  fetchEmployeeData,
  addEmployeeData,
  deleteEmployeeData,
}) {
  const [eData, setEData] = useState();
  const [openDialog, setDialogShow] = React.useState(false);
  useEffect(() => {
    if (!employees.employeeData) {
      fetchEmployeeData();
    }
  }, [fetchEmployeeData, employees.employeeData]);

  useEffect(() => {
    if (employees.employeeData) {
      setEData(employees);
    }
  }, [employees]);

  const handleSubmit = (data) => {
    setEData(eData, data);
    addEmployeeData(data);
    setDialogShow(false);
  };

  const deleteEmployee = (id) => {
    deleteEmployeeData(id);
  };

  return (
    <div className="container">
      <h2 className="title">Employees</h2>
      <Card className="card">
        <div className="inline">
          <Button
            variant="primary"
            className="addBtn"
            onClick={() => {
              setDialogShow(true);
            }}
          >
            + Add
          </Button>
          {employees.loading && !employees.error && (
            <div className="position">
              <Spinner
                size="large"
                animation="border"
                role="status"
                className="spinner"
              ></Spinner>
              <h3>Loading data</h3>
            </div>
          )}
          {employees.deleting && !employees.error && (
            <div className="position">
              <Spinner
                size="large"
                animation="border"
                role="status"
                className="spinner"
              ></Spinner>
              <h3>Deleting data</h3>
            </div>
          )}
          {employees.saving && !employees.error && (
            <div className="position">
              <Spinner
                size="large"
                animation="border"
                role="status"
                className="spinner"
              ></Spinner>
              <h3>Saving data</h3>
            </div>
          )}
        </div>
        {employees.error && <h3>{employees.errorMsg}</h3>}

        <Card.Body className="card-body">
          <Table className="table">
            <thead className="thead-dark">
              <tr>
                <th>First name</th>
                <th>Last name</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {employees.data.map((employee) => {
                return (
                  <tr key={employee._id}>
                    <td>{employee.firstName}</td>
                    <td>{employee.lastName}</td>
                    <td>{employee.email}</td>

                    <td>
                      <Button
                        className="btn tableBtn"
                        onClick={() => {
                          deleteEmployee(employee._id);
                        }}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>

          {employees.data.lenght === 0 && <h2>No data</h2>}
        </Card.Body>
      </Card>

      <DataForm
        backdrop="static"
        show={openDialog}
        onHide={() => setDialogShow(false)}
        onSubmit={handleSubmit}
        employees={employees.data}
      />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    employees: state.employeeData,
  };
};

const mapDispatchToProps = {
  fetchEmployeeData,
  addEmployeeData,
  deleteEmployeeData,
};

export default connect(mapStateToProps, mapDispatchToProps)(TableList);
