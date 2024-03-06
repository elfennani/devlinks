import Button from "../components/UI/Button";
import supabase from "../services/supabase";

const HomePage = () => {
  return (
    <>
      <div>HomePage</div>
      <Button label="Logout" primary onClick={() => supabase.auth.signOut()} />
    </>
  );
};

export default HomePage;
