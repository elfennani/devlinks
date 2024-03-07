import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import links, { AppLink } from "../links";
import { useQuery } from "@tanstack/react-query";
import supabase from "../services/supabase";

export interface DraftLink {
  id: number;
  appLink: AppLink;
  value: string;
}

type DraftContextProps = {
  draftLinks: DraftLink[];
  setDraftLinks: React.Dispatch<React.SetStateAction<DraftLink[]>>;
  isLoading: boolean;
  refetch: () => void;
};

const DraftContext = createContext<DraftContextProps>({
  isLoading: false,
  draftLinks: [],
  setDraftLinks: () => {},
  refetch: () => {},
});

export const DraftProvider = ({
  children,
}: {
  children: ReactNode | ReactNode[];
}) => {
  const [draftLinks, setDraftLinks] = useState<DraftLink[]>([]);
  const { data, isLoading, refetch, isSuccess } = useQuery({
    queryKey: ["links"],
    queryFn: async () => {
      await supabase.auth.initialize();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) throw new Error("User not logged in");

      const { data, error } = await supabase
        .from("links")
        .select()
        .eq("user_id", user.id);
      if (error) throw new Error(error.message);

      return data;
    },
    refetchOnMount: false,
    refetchInterval: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (isSuccess) {
      setDraftLinks(
        data
          .sort((a, b) => a.order - b.order)
          .map((link) => ({
            appLink: links.find((l) => l.name == link.name)!!,
            id: link.order,
            value: link.link,
          }))
      );
    }
  }, [isSuccess, data]);

  return (
    <DraftContext.Provider
      value={{
        draftLinks,
        setDraftLinks,
        isLoading,
        refetch,
      }}
      children={children}
    />
  );
};

export const useDraftState = () => useContext(DraftContext);
