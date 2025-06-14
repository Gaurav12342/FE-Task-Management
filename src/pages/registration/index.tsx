/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { CustomLabel } from "../../components/ui/label";
import { CustomInput } from "../../components/ui/input";
import { CustomButton } from "../../components/ui/button";
import { useNavigate } from "react-router";
import { signUpAPI } from "../../redux/Auth/SignUp";
import { useDispatch, useSelector } from "react-redux";

export const Registration = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const signUpStore = useSelector((state: any) => state.signUp);

  const onSubmit = async (data: any) => {
    try {
      const response = await dispatch(signUpAPI(data));
      if (response) {
        navigate("/");
      }
    } catch (error: any) {
      console.log("error", error);
    }
  };

  const handleLogin = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign Up
          </h2>
        </div>
        <form className="mt-4 space-y-8" onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-md space-y-4">
            <div>
              <CustomLabel htmlFor="fname" className="text-black">
                First Name
              </CustomLabel>
              <CustomInput
                id="lname"
                placeholder="First Name"
                label="First Name"
                {...register("fname", { required: true })}
              />
              <span className="text-sm block text-red-500">
                {errors.fname ? "First name field is required" : ""}
              </span>
            </div>
            <div>
              <CustomLabel htmlFor="lname" className="text-black">
                Last Name
              </CustomLabel>
              <CustomInput
                id="lname"
                placeholder="Last Name"
                label="lname"
                {...register("lname", { required: true })}
              />
              <span className="text-sm block text-red-500">
                {errors.lname ? "Last name field is required" : ""}
              </span>
            </div>
            <div>
              <CustomLabel htmlFor="email" className="text-black">
                Email address
              </CustomLabel>
              <CustomInput
                id="email-address"
                type="email"
                autoComplete="email"
                placeholder="Email address"
                label="Email"
                {...register("email", { required: true })}
              />
              <span className="text-sm block text-red-500">
                {errors.email ? "Email field is required" : ""}
              </span>
            </div>
            <div className="relative">
              <CustomLabel htmlFor="password" className="text-black">
                Password
              </CustomLabel>
              <CustomInput
                id="password"
                type={"password"}
                autoComplete="current-password"
                placeholder="Password"
                {...register("password", { required: true })}
              />
              <span className="text-sm block text-red-500">
                {errors.password ? "Password field is required" : ""}
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <CustomButton
              type="submit"
              isLoading={signUpStore?.loading ?? false}
            >
              Sign Up
            </CustomButton>

            <CustomButton variant="outline" type="submit" onClick={handleLogin}>
              Sign In
            </CustomButton>
          </div>
        </form>
      </div>
    </div>
  );
};
