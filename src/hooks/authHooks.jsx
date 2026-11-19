
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import {
  registerUser,
  loginUser,
} from "../features/auth/authSlice";

// REGISTER HOOK
export const useRegisterAuth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const users = useSelector((state) => state.auth.users);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      role: "organizer",
      password: "",
      confirmPassword: "",
      agreeTerms: false,
    },
  });

  const password = watch("password");

  const onSubmit = (data) => {
    setMessage("");

    // Check if email already exists
    const existingUser = users.find(
      (user) =>
        user.email.toLowerCase() === data.email.toLowerCase()
    );

    if (existingUser) {
      setMessage("Email is already registered!");
      return;
    }

    // Create new user
    const newUser = {
      fullName: data.fullName,
      email: data.email.toLowerCase(),
      role: data.role,
      password: data.password,
    };

    // Save user through Redux
    dispatch(registerUser(newUser));

    setMessage("Registration successful! You can now login.");

    console.log("Registered user:", newUser);
  };

  return {
    register,
    handleSubmit,
    errors,
    password,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    message,
    isSubmitting,
    onSubmit,
    navigate,
  };
};


// LOGIN HOOK
export const useLoginAuth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const users = useSelector((state) => state.auth.users);

  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = (data) => {
    setMessage("");

    // Find user using email and password
    const existingUser = users.find(
      (user) =>
        user.email.toLowerCase() === data.email.toLowerCase() &&
        user.password === data.password
    );

    // Check credentials
    if (!existingUser) {
      setMessage("Invalid email or password!");
      return;
    }

    // Save login details
    dispatch(
      loginUser({
        user: {
          fullName: existingUser.fullName,
          email: existingUser.email,
          role: existingUser.role,
        },
        rememberMe: data.rememberMe,
      })
    );

    setMessage("Login successful!");

    // Navigate after successful login
    navigate("/main");
  };

  return {
    register,
    handleSubmit,
    errors,
    showPassword,
    setShowPassword,
    message,
    isSubmitting,
    onSubmit,
    navigate,
  };
};
