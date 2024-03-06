import { Link } from "react-router-dom";
import Button from "../../components/UI/Button";
import useTitle from "../../hooks/useTitle";
import { SubmitHandler, useForm } from "react-hook-form";
import supabase from "../../services/supabase";
import LabeledTextField from "../../components/UI/LabeledTextField";
import { useState } from "react";

interface FormData {
  email: string;
  password: string;
}

const LoginPage = () => {
  useTitle("DevLinks - Login");
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit: SubmitHandler<FormData> = async ({ email, password }) => {
    setIsLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      if (error.name == "AuthApiError") {
        const message = "Please check again!";
        setError("email", { message });
        setError("password", { message });
        return;
      }

      const { message } = error;
      setError("root", { message });
    }
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col gap-10">
      <header className="flex flex-col gap-2">
        <h1 className="text-heading-m">Login</h1>
        <p className="text-graphite-bold text-base-m">
          Add your details below to get back into the app
        </p>
      </header>
      <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
        <LabeledTextField
          label="Email address"
          type="email"
          icon="ph:envelope-simple-fill"
          placeholder="e.g. alex@email.com"
          error={errors.email?.message}
          {...register("email", { required: "Can’t be empty" })}
        />
        <LabeledTextField
          label="Password"
          type="password"
          icon="ph:lock-key-fill"
          placeholder="Enter your password"
          error={errors.password?.message}
          {...register("password", { required: "Can’t be empty" })}
        />
        {errors.root?.message && (
          <p className="text-error text-base-s">{errors.root?.message}</p>
        )}
        <Button disabled={isLoading} label="Login" primary />
        <p className="text-center text-graphite-bold">
          Don't have an account?{" "}
          <Link to="/auth/create" className="text-primary-bold">
            Create account
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
