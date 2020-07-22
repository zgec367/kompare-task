import React, { useState } from "react";
import "./form.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function DataForm(props) {
  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    firstNameError: "",
    lastNameError: "",
    emailError: "",
  });
  const validate = () => {
    let isError = false;
    const emailRegex = /.+@.+\.[A-Za-z]+$/.test(state.email); //false = invalid

    const existingEmail = props.employees.find(
      (employee) => employee.email === state.email
    );

    const errors = {
      firstNameError: "",
      lastNameError: "",
      emailError: "",
    };

    if (existingEmail) {
      errors.emailError = "Email already exist";
      isError = true;
    }

    if (!emailRegex) {
      errors.emailError = "Invalid email";
      isError = true;
    }

    if (!state.email) {
      errors.emailError = "Email cannot be empty";
      isError = true;
    }
    if (!state.firstName) {
      errors.firstNameError = "First name cannot be empty";
      isError = true;
    }
    if (!state.lastName) {
      errors.lastNameError = "Last name cannot be empty";
      isError = true;
    }

    setState({ ...state, ...errors });

    return isError;
  };
  const handleFormSubmit = () => {
    console.log(state);
    const isError = validate();
    if (!isError) {
      props.onSubmit(state);
      setState({ firstName: "", lastName: "", email: "" });
    }
  };

  const onInputChange = (e, key) => {
    const newState = {
      ...state,
      [key]: e.target.value,
    };
    setState(newState);
  };

  return (
    <Modal
      className="modal"
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          <h2>Add employee</h2>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form variant="primary" autoComplete="off">
          <Form.Group className="form-group">
            <Form.Control
              required={true}
              placeholder="First name"
              type="text"
              className="form-control"
              value={state.firstName}
              onChange={(e) => onInputChange(e, "firstName")}
            />
            {state.firstNameError ? (
              <div style={{ fontSize: 12, color: "red" }}>
                {state.firstNameError}
              </div>
            ) : null}
          </Form.Group>
          <Form.Group className="form-group">
            <Form.Control
              required={true}
              type="text"
              placeholder="Last name"
              className="form-control"
              value={state.lastName}
              onChange={(e) => onInputChange(e, "lastName")}
            />
            {state.lastNameError ? (
              <div style={{ fontSize: 12, color: "red" }}>
                {state.lastNameError}
              </div>
            ) : null}
          </Form.Group>
          <Form.Group className="form-group">
            <Form.Control
              required={true}
              placeholder="Email"
              type="text"
              className="form-control"
              value={state.email}
              onChange={(e) => onInputChange(e, "email")}
            />
            {state.emailError ? (
              <div style={{ fontSize: 12, color: "red" }}>
                {state.emailError}
              </div>
            ) : null}
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button className="button" variant="primary" onClick={props.onHide}>
          Cancel
        </Button>
        <Button variant="primary" className="button" onClick={handleFormSubmit}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
export default DataForm;
