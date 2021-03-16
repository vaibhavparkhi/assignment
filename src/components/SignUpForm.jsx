import React, { useState } from "react";
import { sendData, getData } from "../services";
import "./form.css";
import { validation } from "../utils/validation";

const SignUpForm = () => {
  const [fields, setFields] = useState({
    firstname: "",
    lastname: "",
    emailid: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const [disable, setDisable] = useState(false);

  const [errors, setErrors] = useState({
    firstname: "",
    lastname: "",
    emailid: "",
    password: "",
  });

  /**
   *
   * @param {*} evt
   */
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const validationErrors = validation(fields);
    const noErrors = Object.keys(validationErrors).length === 0;
    setErrors(validationErrors);
    //console.log(validationErrors);

    if (noErrors) {
      setMessage("Fetching...");
      const postResponse = await sendData(fields);
      if (postResponse && postResponse.status === 200) {
        setTimeout(async () => {
          const response = await getData();
          if (response.status === 200) {
            setMessage("Success");
            setDisable(true);
          } else {
            setMessage("Error");
            setDisable(false);
          }
        }, 3000);
      }
    } else {
      //setmessage("All Field(s) are reuired!");
      setDisable(false);
    }
  };

  /**
   *
   * @param {*} event
   */
  const handleChange = (event) => {
    setFields((values) => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
  };
  return (
    <div className="App">
      <div id="signup">
        <p className="sucessMsg">{message}</p>
        <h3 className="form-title">Sign Up Form</h3>
        <form name="signupform" onSubmit={handleSubmit}>
          <label htmlFor="firstname">First Name</label>
          <input
            type="text"
            name="firstname"
            id="firstname"
            value={fields.firstname}
            onChange={handleChange}
          />
          <div className="errorMsg">{errors.firstname}</div>
          <label htmlFor="lastname">Last Name</label>
          <input
            type="text"
            name="lastname"
            id="lastname"
            value={fields.lastname}
            onChange={handleChange}
          />
          <div className="errorMsg">{errors.lastname}</div>
          <label htmlFor="emailid">Email ID</label>
          <input
            type="text"
            name="emailid"
            id="emailid"
            value={fields.emailid}
            onChange={handleChange}
          />
          <div className="errorMsg" data-testid="error_email">
            {errors.emailid}
          </div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={fields.password}
            onChange={handleChange}
          />
          <div className="errorMsg" data-testid="error_password">
            {errors.password}
          </div>
          <input
            type="submit"
            className={disable ? "button-disabled" : "button"}
            value="Sign Up"
            data-testid="signup"
            disabled={disable}
          />
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
