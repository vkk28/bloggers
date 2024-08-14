import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import authService from "../appwrite/auth";
import { Button, Input, Logo } from "./index";
import { useForm } from "react-hook-form";
import { login } from "../store/authSlice";

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const { register, handleSubmit, formState: { errors } } = useForm();

  const create = async (data) => {
    setError("");
    try {
      const session = await authService.createAccount(data);

      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(login(userData));
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="w-full h-auto bg-bgcolor">
      <div className="flex items-center justify-center py-2">
        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
          <div className="mb-2 flex justify-center">
            <span className="inline-block w-full max-w-[100px]">
              <Logo width="100%" />
            </span>
          </div>
          <p className="mt-2 text-center text-base text-black/60">
            Already have an account?&nbsp;
            <Link to="/login" className="font-medium text-primary transition-all duration-200 hover:underline">
              Sign In
            </Link>
          </p>

          {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

          <form onSubmit={handleSubmit(create)}>
            <div className="space-y-5">
              <Input
                label="Full Name :"
                type="text"
                placeholder="Enter full name"
                {...register("name", {
                  required: "Full Name is required",
                })}
              />
              {errors.name && <p className="text-red-600">{errors.name.message}</p>}

              <Input
                label="Email :"
                type="email"
                placeholder="Enter your email : "
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                    message: "Email address must be a valid address"
                  }
                })}
              />
              {errors.email && <p className="text-red-600">{errors.email.message}</p>}

              <Input
                label="Password :"
                type="password"
                placeholder="Enter your Password : "
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters"
                  }
                })}
              />
              {errors.password && <p className="text-red-600">{errors.password.message}</p>}

              <Button type="submit" className="w-full">
                Create Account
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
