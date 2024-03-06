import { useQuery } from "@tanstack/react-query";
import { Outlet } from "react-router-dom";
import supabase from "../services/supabase";
import AuthSkeleton from "../components/Skeleton/AuthSkeleton";

const RootLayout = () => {
  const { isLoading } = useQuery({
    queryKey: ["supabase", "user"],
    queryFn: () => supabase.auth.getUser(),
  });

  if (isLoading) {
    const isAlreadyLoggedIn = !!localStorage.getItem(
      "sb-jbzqxselhobgznzpnijn-auth-token"
    );

    if (isAlreadyLoggedIn) {
      return <div>Loading dashboard...</div>;
    }

    return <AuthSkeleton />;
  }

  return <Outlet />;
};

export default RootLayout;
