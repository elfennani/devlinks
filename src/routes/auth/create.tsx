import { Link } from "react-router-dom";
import Button from "../../components/UI/Button";
import useTitle from "../../hooks/useTitle";
import { SubmitHandler, Validate, useForm } from "react-hook-form";
import LabeledTextField from "../../components/UI/LabeledTextField";
import supabase from "../../services/supabase";
import { useState } from "react";

interface FormData {
  email: string;
  password: string;
  repeat: string;
}

const CreatePage = () => {
  useTitle("DevLinks - Create Account");
  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
  } = useForm<FormData>();
  const [isLoading, setIsLoading] = useState(false);

  const validateRepeat: Validate<string, FormData> = (value, { password }) => {
    if (value != password) {
      return "Passwords do no match";
    }
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);
    try {
      const { error, data: info } = await supabase.auth.signUp(data);

      if (error) {
        setError("root", { message: error.message });
        return;
      }

      if (info.user?.identities?.length == 0) {
        setError(
          "email",
          { message: "Email already taken" },
          { shouldFocus: true }
        );
      }
    } catch (error) {
      setError("root", { message: (error as Error).message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-10">
      <header className="flex flex-col gap-2">
        <h1 className="text-heading-m">Create account</h1>
        <p className="text-graphite-bold text-base-m">
          Let’s get you started sharing your links!
        </p>
      </header>
      <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
        <LabeledTextField
          label="Email address"
          icon="ph:envelope-simple-fill"
          placeholder="e.g. alex@email.com"
          type="email"
          error={errors.email?.message}
          {...register("email", { required: "Can’t be empty" })}
        />

        <LabeledTextField
          label="Create password"
          icon="ph:lock-key-fill"
          placeholder="At least .8 characters"
          type="password"
          error={errors.password?.message}
          {...register("password", {
            required: "Can’t be empty",
            minLength: { value: 8, message: "At least 8 characters" },
          })}
        />
        <LabeledTextField
          label="Confirm password"
          icon="ph:lock-key-fill"
          placeholder="At least .8 characters"
          type="password"
          error={errors.repeat?.message}
          {...register("repeat", {
            required: "Can’t be empty",
            validate: validateRepeat,
          })}
        />
        <p className="text-graphite-bold text-base-s">
          Password must contain at least 8 characters
        </p>
        {errors.root?.message && (
          <p className="text-error text-base-s">{errors.root?.message}</p>
        )}
        <Button disabled={isLoading} label="Create new account" primary />
        <p className="text-center text-graphite-bold">
          Already have an account?{" "}
          <Link to="/auth/login" className="text-primary-bold">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default CreatePage;
