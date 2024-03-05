import { Link } from "react-router-dom";
import Button from "../../components/UI/Button";
import TextField from "../../components/UI/TextField";
import useTitle from "../../hooks/useTitle";

type Props = {};

const CreatePage = ({}: Props) => {
  useTitle("DevLinks - Create Account");

  return (
    <div className="flex flex-col gap-10">
      <header className="flex flex-col gap-2">
        <h1 className="text-heading-m">Create account</h1>
        <p className="text-graphite-bold text-base-m">
          Let’s get you started sharing your links!
        </p>
      </header>
      <form className="flex flex-col gap-6">
        <label className="flex flex-col gap-1 text-base-s text-graphite-bolder">
          Email address
          <TextField
            icon="ph:envelope-simple-fill"
            placeholder="e.g. alex@email.com"
          />
        </label>
        <label className="flex flex-col gap-1 text-base-s text-graphite-bolder">
          Create password
          <TextField
            icon="ph:lock-key-fill"
            placeholder="At least .8 characters"
          />
        </label>
        <label className="flex flex-col gap-1 text-base-s text-graphite-bolder">
          Confirm password
          <TextField
            icon="ph:lock-key-fill"
            placeholder="At least .8 characters"
          />
        </label>
        <p className="text-graphite-bold text-base-s">
          Password must contain at least 8 characters
        </p>
        <Button label="Create new account" primary />
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
