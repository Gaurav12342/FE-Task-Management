/* eslint-disable @typescript-eslint/no-explicit-any */
import { Label } from "@radix-ui/react-label";
import { CustomLabel } from "../../components/ui/label";
import { CustomInput } from "../../components/ui/input";
import { CustomButton } from "../../components/ui/button";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { signInAPI } from "../../redux/Auth/SignIn";
import { useNavigate } from "react-router";

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const signInStoredata = useSelector((state: any) => state?.signIn);

  const onSubmit = async (data: any) => {
    try {
      localStorage.removeItem("user-token");
      const response = await dispatch(signInAPI(data));
      if (response) {
        localStorage.setItem(
          "user-token",
          JSON.stringify(response?.payload?.accessToken)
        );
        navigate("/dashboard");
      }
    } catch (error: any) {
      console.log("error", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign In
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{" "}
            <a
              href="/registration"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              create a new account
            </a>
          </p>
        </div>
        <form className="mt-4 space-y-8" onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-md space-y-4">
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
                {errors.email ? "This field is required" : ""}
              </span>
            </div>
            <div className="relative">
              <CustomLabel htmlFor="email" className="text-black">
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
                {errors.password ? "This field is required" : ""}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 focus:ring-indigo-500 border-gray-300 rounded text-indigo-600"
              />
              <Label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900"
              >
                Remember me
              </Label>
            </div>

            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <CustomButton
              type="submit"
              isLoading={signInStoredata?.loading ?? false}
            >
              Sign in
            </CustomButton>
          </div>
        </form>
      </div>
    </div>
  );
};
