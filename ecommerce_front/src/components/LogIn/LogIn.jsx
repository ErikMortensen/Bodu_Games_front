import React, { useState } from "react";
import { useAuth } from "../Auth/authContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "./login.css";
import { FcGoogle } from "react-icons/fc";

export const LogIn = () => {
  const navigate = useNavigate();
  const [error, setError] = useState();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { login, logInWithGoogle, resetPassword } = useAuth();

  const handleGoogleSignIn = async () => {
    try {
      await logInWithGoogle();
      toast.success("A successfull log in with Google!");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("Oh! no! Something went wrong! Try again!");
    }
  };
  const handleForgotPassword = async () => {
    if (!user.email) return setError("Please write your email");
    try {
      await resetPassword(user.email);
      toast.success("We sent you an email to reset your password!");
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(user.email, user.password);
      toast.success("Successful Log in");
      navigate("/");
    } catch (error) {
      console.log(error.code);
      if (error.code === "auth/user-not-found") {
        toast.error("User not found");
        navigate("/signup");
      } else if (error.code === "auth/wrong-password") {
        toast.error("Wrong password");
      }
    }
  };
  const handleUser = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  return (
    <div className="container-login">
      <form className="login-form" onSubmit={(e) => handleSubmit(e)}>
        <h2 className="title">Log In</h2>
        <label htmlFor="user_name" className="label">
          Username
        </label>
        <input
          className="login-form-inputs"
          type="email"
          name="email"
          id="email"
          value={user.email}
          onChange={handleUser}
          placeholder="yourname@company.com"
        ></input>
        {error && <h6 className="error">{error}</h6>}
        <label htmlFor="password" className="label">
          Password
        </label>
        <input
          className="login-form-inputs"
          type="password"
          name="password"
          email="email"
          value={user.password}
          onChange={handleUser}
          placeholder="******"
        ></input>

        <button type="submit" className="login-button">
          Log in
        </button>
      </form>
      <div className="form-body">
        <button className="login-button" onClick={handleGoogleSignIn}>
          Log in with <FcGoogle />
        </button>
        <h6 className="forgot-p" onClick={handleForgotPassword}>
          Forgot your password?
        </h6>
        <span>
          Don't have an account? <Link to="/signup">Create one now</Link>
        </span>
      </div>
    </div>
  );
};