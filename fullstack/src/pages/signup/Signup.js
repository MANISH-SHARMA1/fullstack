import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import "./Signup.scss";
import { Link, useNavigate } from "react-router-dom";
import { axiosClient } from "../../utils/axiosClient";
import { toast } from "react-hot-toast";

function Signup() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  watch("confirmPassword");
  const navigate = useNavigate();

  function passwordVisibility() {
    setPasswordVisible(!passwordVisible);
  }

  function confirmPasswordVisibility() {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  }

  const onSubmit = async (data) => {
    try {
      console.log(data);
      await axiosClient.post("/auth/signup", {
        name: data.name,
        email: data.email,
        password: data.confirmPassword,
      });
      toast.success("Sign Up successfully");
      navigate("/login");
    } catch (e) {
      toast.error(e);
    }
  };

  const handleError = () => {
    if (errors) {
      if (errors.name) {
        toast.error(errors?.name?.message);
      } else if (errors.email) {
        toast.error(errors?.email?.message);
      } else if (errors.password) {
        toast.error(errors?.password?.message);
      } else if (errors.confirmPassword) {
        toast.error(errors?.confirmPassword?.message);
      } else if (errors.termsAccepted) {
        toast.error(errors?.termsAccepted?.message);
      } else {
        console.log("errors", errors);
      }
    }
  };

  return (
    <div className="signup">
      <div className="signupBox">
        <h2 id="heading">Sign Up</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label id="input">Name</label>
            <input
              id="input"
              type="text"
              {...register("name", { required: "Name is required" })}
              placeholder="Name"
            />
          </div>
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

          <div>
            <label id="input">Confirm Password</label>
            <div className="passwords">
              <input
                id="input"
                type={confirmPasswordVisible ? "text" : "password"}
                placeholder="Confirm Password"
                {...register("confirmPassword", {
                  required: "Confirm Password is required",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
              />
              <div onClick={confirmPasswordVisibility} id="passwordEye">
                {confirmPasswordVisible ? <FaRegEye /> : <FaRegEyeSlash />}
              </div>
            </div>
          </div>

          <div className="checkbox">
            <input
              type="checkbox"
              {...register("termsAccepted", {
                required: "You must accept the terms & conditions",
              })}
            />
            <label>I agree to the Terms&Coditions</label>
          </div>

          <button type="submit" onClick={handleError}>
            Sign Up
          </button>
        </form>
        <p>
          Already have an account?{" "}
          <Link to="/login" id="link">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
