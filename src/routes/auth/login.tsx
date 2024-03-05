import { Link } from "react-router-dom";
import Button from "../../components/UI/Button";
import TextField from "../../components/UI/TextField";
import useTitle from "../../hooks/useTitle";

type Props = {};

const LoginPage = ({}: Props) => {
  useTitle("DevLinks - Login");

  return (
    <div className="flex flex-col gap-10">
      <header className="flex flex-col gap-2">
        <h1 className="text-heading-m">Login</h1>
        <p className="text-graphite-bold text-base-m">
          Add your details below to get back into the app
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
          Password
          <TextField
            icon="ph:lock-key-fill"
            placeholder="Enter your password"
          />
        </label>
        <Button label="Login" primary />
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
