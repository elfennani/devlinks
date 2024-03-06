import { useQuery, useQueryClient } from "@tanstack/react-query";
import supabase from "../services/supabase";
import { useEffect } from "react";

const useUser = () => {
  const query = useQuery({
    queryKey: ["supabase", "user"],
    queryFn: () => supabase.auth.getUser(),
  });

  const client = useQueryClient();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      client.invalidateQueries({ queryKey: ["supabase", "user"] });
    });

    return () => subscription.unsubscribe();
  }, []);

  return query
};

export default useUser