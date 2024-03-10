import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";
import links, { AppLink } from "../links";
import supabase from "../services/supabase";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export interface DraftLink {
  id: number;
  appLink: AppLink;
  value: string;
}

export interface Profile {
  firstName?: string;
  lastName?: string;
  email?: string | null;
}

type DraftContextProps = [DraftState, React.Dispatch<DraftAction>];

interface DraftState {
  links: DraftLink[];
  photo?: string;
  profile: Profile;
  isLoadingLinks: boolean;
  isLoadingProfile: boolean;
  error?: string;
  file?: File;
  modified: boolean;
}

type DraftAction =
  | { type: "ADD_LINK"; payload?: undefined }
  | { type: "LOAD_LINKS"; payload: DraftLink[] }
  | { type: "LOAD_DATA"; payload: { links: DraftLink[]; profile: Profile } }
  | { type: "REMOVE_LINK"; payload: { id: number } }
  | { type: "EDIT_LINK_LINK"; payload: { id: number; appLink: AppLink } }
  | { type: "EDIT_LINK_VALUE"; payload: { id: number; value: string } }
  | { type: "GLOBAL_ERROR"; payload: string }
  | { type: "LOAD_PROFILE"; payload: Profile }
  | { type: "EDIT_PROFILE"; payload: { key: keyof Profile; value: string } }
  | { type: "SELECT_FILE"; payload: File | undefined };

const initialState: DraftState = {
  links: [],
  isLoadingLinks: true,
  isLoadingProfile: true,
  profile: {},
  modified: false,
};

const DraftContext = createContext<DraftContextProps>([initialState, () => {}]);

function draftReducer(state: DraftState, action: DraftAction): DraftState {
  const { type, payload } = action;
  if (type == "LOAD_DATA") {
    return {
      ...state,
      ...payload,
      isLoadingLinks: false,
      isLoadingProfile: false,
    };
  }
  if (type == "EDIT_LINK_VALUE") {
    const { id, value } = payload;
    return {
      ...state,
      modified: true,
      links: state.links.map((link) => {
        if (link.id == id) {
          return {
            ...link,
            value: value,
          };
        }

        return link;
      }),
    };
  }
  if (type == "EDIT_LINK_LINK") {
    const { appLink, id } = payload;

    return {
      ...state,
      modified: true,
      links: state.links.map((link) => {
        if (link.id == id) {
          return {
            ...link,
            appLink,
            value: link.appLink.name == appLink.name ? link.value : "",
          };
        }

        return link;
      }),
    };
  }
  if (type == "ADD_LINK") {
    const firstUnusedLink = links.find(
      (link) => !state.links.some(({ appLink }) => appLink.name == link.name)
    )!!;
    const id =
      state.links.reduce((prev, curr) => {
        return prev <= curr.id ? curr.id : prev;
      }, -1) + 1;
    const newLink = {
      appLink: firstUnusedLink,
      id,
      value: "",
    };

    return {
      ...state,
      modified: true,
      links: [...state.links, newLink],
    };
  }
  if (type == "REMOVE_LINK") {
    const { id } = payload;
    return {
      ...state,
      modified: true,
      links: state.links
        .filter((l) => l.id != id)
        .map((l) => ({ ...l, id: l.id <= id ? l.id : l.id - 1 })),
    };
  }
  if (type == "GLOBAL_ERROR") {
    return {
      ...state,
      error: payload,
    };
  }

  if (type == "EDIT_PROFILE") {
    const { key, value } = payload;
    return {
      ...state,
      modified: true,
      profile: {
        ...state.profile,
        [key]: value,
      },
    };
  }

  if (type == "SELECT_FILE") {
    return {
      ...state,
      modified: true,
      file: payload,
    };
  }

  return state;
}

export const DraftProvider = ({
  children,
}: {
  children: ReactNode | ReactNode[];
}) => {
  const [state, dispatch] = useReducer(draftReducer, initialState);
  const { data, isSuccess, isError, error } = useQuery({
    queryKey: ["links", "profile"],
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

      const { data: profileData, error: profileError } = await supabase
        .from("profile")
        .select()
        .eq("id", user.id);
      if (profileError) throw new Error(profileError.message);
      const profile = profileData?.[0];

      return {
        links: data
          .sort((a, b) => a.order - b.order)
          .map((link) => ({
            appLink: links.find((l) => l.name == link.name)!!,
            id: link.order,
            value: link.link,
          })),
        profile: {
          email: profile?.email,
          firstName: profile?.first_name,
          lastName: profile?.last_name,
        },
      };
    },
  });

  useEffect(() => {
    if (isSuccess) {
      dispatch({
        type: "LOAD_DATA",
        payload: data,
      });
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (isError) {
      toast.error(error.message);
      toast.error("Failed to load data, refresh page!");
    }
  }, [isError, error]);

  return (
    <DraftContext.Provider value={[state, dispatch]} children={children} />
  );
};

DraftProvider.Consumer = DraftContext.Consumer;

export const useDraftContext = () => useContext(DraftContext);
export const useDraftState = () => useContext(DraftContext)[0];
export const useDraftDispatch = () => useContext(DraftContext)[1];
