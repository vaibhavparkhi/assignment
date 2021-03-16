import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";

import SignUpForm from "../SignUpForm";
import { validation } from "../../utils/validation";

test("on Submit with valid input ", async () => {
  const { getByLabelText, findByText, getByTestId } = render(<SignUpForm />);
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
  const { getByLabelText, getByTestId } = render(<SignUpForm />);
  fireEvent.change(getByLabelText(/Email ID/i), {
    target: { value: "parkhivaibhavgmailcom" },
  });

  fireEvent.click(getByTestId("signup"));
  expect(getByTestId("error_email")).toHaveTextContent(
    "Invalid email address!"
  );
});

test("invalid passwaord -> length less than 8 characters --> ", () => {
  const { getByLabelText, getByTestId } = render(<SignUpForm />);
  fireEvent.change(getByLabelText(/Password/i), {
    target: { value: "123456" },
  });

  fireEvent.click(getByTestId("signup"));
  expect(getByTestId("error_password")).toHaveTextContent(
    "Password should be greater than 8 characters!"
  );
});

test("invalid passwaord -> Should contain lower and uppercase letters--> ", () => {
  const { getByLabelText, getByTestId } = render(<SignUpForm />);
  fireEvent.change(getByLabelText(/Password/i), {
    target: { value: "we1234556666" },
  });

  fireEvent.click(getByTestId("signup"));
  expect(getByTestId("error_password")).toHaveTextContent(
    "Should contain lower and uppercase letters!"
  );
});

test("invalid passwaord --> contain first name", () => {
  const { getByLabelText, findByText, getByTestId } = render(<SignUpForm />);

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

  waitFor(async () => {
    expect(
      await findByText(/Password should not contains first name or last name!/i)
    ).toBeInTheDocument();
  });
});
