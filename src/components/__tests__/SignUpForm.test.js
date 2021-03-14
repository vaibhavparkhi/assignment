import React from "react";
import {
  act,
  fireEvent,
  getByTestId,
  render,
  waitFor,
} from "@testing-library/react";
import "@testing-library/jest-dom";

import SignUpForm from "../SignUpForm";
import { validation } from "../../utils/validation";

test("on Submit with valid input ", async () => {
  const {
    container,
    getByLabelText,
    getByText,
    findByText,
    getByTestId,
  } = render(<SignUpForm />);
  fireEvent.change(getByLabelText(/First Name/i), {
    target: { value: "Vaibhav" },
  });
  fireEvent.change(getByLabelText(/Last Name/i), {
    target: { value: "Parkhi" },
  });
  fireEvent.change(getByLabelText(/Email ID/i), {
    target: { value: "parkhi.vaibhav@gmail.com" },
  });
  fireEvent.change(getByLabelText(/Password/i), {
    target: { value: "123456788" },
  });

  fireEvent.click(getByTestId("signup"));
  waitFor(async () => {
    expect(await findByText(/Fetching/i)).toBeInTheDocument();
  });

  waitFor(async () => {
    expect(await findByText(/Success/i)).toBeInTheDocument();
  });
});

test("invalid email --> ", () => {
  const {
    container,
    getByLabelText,
    getByText,
    findByText,
    getByTestId,
    findByTestId,
  } = render(<SignUpForm />);
  fireEvent.change(getByLabelText(/Email ID/i), {
    target: { value: "parkhivaibhavgmailcom" },
  });

  fireEvent.click(getByTestId("signup"));
  expect(getByTestId("error_email")).toHaveTextContent(
    "Invalid email address!"
  );
});

test("invalid passwaord -> length less than 8 characters --> ", () => {
  const {
    container,
    getByLabelText,
    getByText,
    findByText,
    getByTestId,
  } = render(<SignUpForm />);
  fireEvent.change(getByLabelText(/Password/i), {
    target: { value: "123456" },
  });

  fireEvent.click(getByTestId("signup"));
  expect(getByTestId("error_password")).toHaveTextContent(
    "Password should be greater than 8 characters!"
  );
});

test("invalid passwaord --> contain first name", () => {
  const {
    container,
    getByLabelText,
    getByText,
    findByText,
    getByTestId,
    findByLabelText,
  } = render(<SignUpForm />);

  fireEvent.change(getByLabelText(/Password/i), {
    target: { value: "vaibhav123456" },
  });

  const error = validation({
    firstname: "vaibhav",
    lastname: "",
    emailid: "",
    password: "vaibhav123456",
  });
  fireEvent.click(getByTestId("signup"));
  console.log(getByLabelText(/Password/i));

  // expect(getByTestId("error_password")).toHaveTextContent(
  //   "Password should not contains first name or last name!"
  // );
  waitFor(async () => {
    console.log("_____________________________________________");
    console.log(
      await findByText(/Password should not contains first name or last name!/i)
    );
    expect(
      await findByText(/Password should not contains first name or last name!/i)
    ).toBeInTheDocument();
  });
});
