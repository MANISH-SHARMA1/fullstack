import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { axiosClient } from "../../utils/axiosClient";
import toast from "react-hot-toast";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import "./Login.scss";
import { KEY_ACCESS_TOKEN, setItem } from "../../utils/localStorageManager";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  function passwordVisibility() {
    setPasswordVisible(!passwordVisible);
  }

  const onLogin = async (data) => {
    try {
      console.log(data);
      const response = await axiosClient.post("/auth/login", {
        email: data.email,
        password: data.password,
      });
      setItem(KEY_ACCESS_TOKEN, response.result.accessToken);
      toast.success("Log in successfully");
      navigate("/home");
    } catch (e) {
      console.log(e);
    }
  };

  const handleError = () => {
    if (errors) {
      if (errors.email) {
        toast.error(errors?.email?.message);
      } else if (errors.password) {
        toast.error(errors?.password?.message);
      } else {
        console.log("errors", errors);
      }
    }
  };
  return (
    <div>
      <div className="login">
        <div className="loginBox">
          <h2 id="heading">Log In</h2>
          <form onSubmit={handleSubmit(onLogin)}>
            <div>
              <label id="input">Email</label>
              <input
                id="input"
                type="email"
                {...register("email", {
                  required: "Email is required",
                })}
                placeholder="Email"
              />
            </div>

            <div>
              <label id="input">Password</label>
              <div className="passwords">
                <input
                  id="input"
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters long",
                    },
                    pattern: {
                      value:
                        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/,
                      message:
                        "Password must contain at least one letter, one number, and one special character",
                    },
                  })}
                />
                <div onClick={passwordVisibility} id="passwordEye">
                  {passwordVisible ? <FaRegEye /> : <FaRegEyeSlash />}
                </div>
              </div>
            </div>

            <button type="submit" onClick={handleError}>
              Log In
            </button>
          </form>

          <p>
            Don't have an account?{" "}
            <Link to="/" id="link">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
