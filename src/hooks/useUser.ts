import { useQuery, useQueryClient } from "@tanstack/react-query";
import supabase from "../services/supabase";
import { useEffect } from "react";

const useUser = (enabled: boolean = true) => {
  const query = useQuery({
    queryKey: ["supabase", "user"],
    queryFn: () => supabase.auth.getUser(),
    enabled
  });

  const client = useQueryClient();

  useEffect(() => {
    if (!enabled) return;
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