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
  const [forgotPassword, setForgotPassword] = useState(false)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const { login, logInWithGoogle, resetPassword } = useAuth();

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      await logInWithGoogle();
      toast.success("A successfull log in with Google!");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleRecoverPassword = async (e) => {
    e.preventDefault();
    try {
      if (!user.email || !emailRegex.test(user.email)){
        setError("Please write a valid email");
      } else {
        await resetPassword(user.email);
        toast.success("If your account exists, you will receive an email to reset your password.");
        setForgotPassword(false);
        setUser({
          email: "",
          password: "",
        });
      }
    } catch (error) {
      toast.error(error.mesage);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(user.email, user.password);

      toast.success("Successful Log in");
      navigate("/");
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        toast.error("User not found");
        navigate("/signup");
      }
      if (error.code === "auth/wrong-password") {
        toast.error("Wrong password");
      } else{
        toast.error(error.message);
      }
    }
  };

  const handleUser = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    setError("");
  };

  const handleForgotPassword = () => {
    setForgotPassword(true);
  }

  return (
    <div className="container-login">
      <form className="login-form" >
        <h2 className="title">Log In</h2>
        <label htmlFor="user_name" className="label">
          Email
        </label>
        <input
          className="login-form-inputs"
          type="email"
          name="email"
          id="email"
          value={user.email}
          onChange={handleUser}
          placeholder="yourname@company.com"/>

        {error && <h6 className="error">{error}</h6>}
        {forgotPassword && <button className="login-button" onClick={handleRecoverPassword}>Send</button>}

        <label htmlFor="password" className={`label ${forgotPassword && "login-disabled"}`}>
          Password
        </label>

        <input
          className={`login-form-inputs ${forgotPassword && "login-disabled"}`}
          type="password"
          name="password"
          email="email"
          value={user.password}
          onChange={handleUser}
          placeholder="******"
          disabled={forgotPassword}/>

        <button className={`login-button ${forgotPassword && "login-disabled"}`} disabled={forgotPassword} onClick={handleSubmit}>
          Log in
        </button>
      </form>
      <div className="form-body">
        <button className={`login-button ${forgotPassword && "login-disabled"}`} onClick={handleGoogleSignIn} disabled={forgotPassword}>
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
