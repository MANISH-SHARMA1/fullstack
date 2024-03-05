import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { axiosClient } from "../../utils/axiosClient";
import toast from "react-hot-toast";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import "../login/Login.scss";

function ChangePassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [currentPasswordVisible, setCurrentPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const navigate = useNavigate();

  function currentPasswordVisibility() {
    setCurrentPasswordVisible(!currentPasswordVisible);
  }
  function newPasswordVisibility() {
    setNewPasswordVisible(!newPasswordVisible);
  }

  const onChangePassword = async (data) => {
    try {
      await axiosClient.post("/auth/changePassword", {
        email: data.email,
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });

      toast.success("Password changed successfully");
    } catch (e) {
      toast.error(e);
    }
  };

  const handleError = () => {
    if (errors) {
      if (errors.email) {
        toast.error(errors?.email?.message);
      } else if (errors.currentPassword) {
        toast.error(errors?.currentPassword?.message);
      } else if (errors?.newPassword) {
        toast.error(errors?.newPassword.message);
      } else {
        console.log("errors", errors);
      }
    }
  };
  return (
    <div>
      <div className="login">
        <div className="loginBox">
          <h2 id="heading">Change Password</h2>
          <form onSubmit={handleSubmit(onChangePassword)}>
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
              <label id="input">Current Password</label>
              <div className="passwords">
                <input
                  id="input"
                  type={currentPasswordVisible ? "text" : "password"}
                  placeholder="Password"
                  {...register("currentPassword", {
                    required: "Current Password is required",
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
                <div onClick={currentPasswordVisibility} id="passwordEye">
                  {currentPasswordVisible ? <FaRegEye /> : <FaRegEyeSlash />}
                </div>
              </div>
            </div>

            <div>
              <label id="input">New Password</label>
              <div className="passwords">
                <input
                  id="input"
                  type={newPasswordVisible ? "text" : "password"}
                  placeholder="Password"
                  {...register("newPassword", {
                    required: "New Password is required",
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
                <div onClick={newPasswordVisibility} id="passwordEye">
                  {newPasswordVisible ? <FaRegEye /> : <FaRegEyeSlash />}
                </div>
              </div>
            </div>

            <button type="submit" onClick={handleError}>
              Submit
            </button>
          </form>

          <p>
            {" "}
            <Link to="/login" id="link">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
