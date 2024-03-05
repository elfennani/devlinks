import { Icon } from "@iconify/react";
import {
  KeyboardEventHandler,
  ReactElement,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { twJoin, twMerge } from "tailwind-merge";

const DropdownContext = createContext({
  selected: null as string | null,
  onSelect: (_value: string) => {},
});

type OptionComponent = ReactElement<OptionProps, typeof Option>;

type DropdownProps = {
  error?: string;
  onChange?: (value: string) => void;
  children: OptionComponent | OptionComponent[];
};

const Dropdown = ({ error, children, onChange }: DropdownProps) => {
  const [collapsed, setCollapsed] = useState(true);
  const [selected, setSelected] = useState<string>(getDefault());
  const containerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleDocInteraction = (ev: MouseEvent) => {
      if (!containerRef.current?.contains(ev.target as Node)) {
        setCollapsed(true);
      }
    };

    document.addEventListener("click", handleDocInteraction);
    return () => document.removeEventListener("click", handleDocInteraction);
  }, []);

  function getDefault() {
    if (Array.isArray(children)) {
      const defaultOption = children.find(
        ({ props: { default: defaultOption } }) => defaultOption
      );

      if (defaultOption) {
        return defaultOption.props.value || defaultOption.props.label;
      }

      return children[0].props.value || children[0].props.label;
    }

    return children.props.value || children.props.label;
  }

  const findSelected = () => {
    if (Array.isArray(children)) {
      return children.find(({ props: { label, value } }) => {
        if (!!value) {
          return value == selected;
        }

        return label == selected;
      }) as OptionComponent;
    }

    return children;
  };

  const handleKeyPress: KeyboardEventHandler<HTMLButtonElement> = (ev) => {
    ev.preventDefault();
    const { key } = ev;

    if (
      (collapsed && ["Enter", " "].includes(key)) ||
      (!collapsed && key == "Escape")
    ) {
      setCollapsed((c) => !c);
    }
  };

  const selectedOption = findSelected().props;

  const onSelect = (value: string) => {
    setSelected(value);
    onChange?.(value);
    setCollapsed(true);
  };

  return (
    <DropdownContext.Provider value={{ selected, onSelect }}>
      <div className="relative">
        <button
          ref={containerRef}
          onClick={() => setCollapsed((c) => !c)}
          onKeyDown={handleKeyPress}
          className={twMerge(
            "flex gap-3 items-center w-96 relative select-none z-10 bg-white px-4 rounded-lg border-graphite-normal border focus-within:border-primary-bold focus-within:shadow-focused",
            error && "!border-error focus-within:!shadow-none",
            "outline-none py-3 w-full min-w-32 text-graphite-bolder text-base-m",
            !collapsed && "border-primary-bold shadow-focused"
          )}
        >
          <Icon icon={selectedOption.icon} className="text-graphite-bold" />
          <span className="flex-1 text-left text-graphite-bolder">
            {selectedOption.label}
          </span>
          <Icon
            icon="ph:caret-down-bold"
            color="#633CFF"
            fontSize={18}
            className={twJoin(
              "transition-transform",
              collapsed ? "rotate-0" : "rotate-180"
            )}
          />
        </button>
        {!collapsed && (
          <ul className="absolute animate-fade bg-white z-20 top-full mt-2 rounded-lg border-graphite-normal border w-full shadow-list">
            {children}
          </ul>
        )}
      </div>
    </DropdownContext.Provider>
  );
};

type OptionProps = {
  icon: string;
  label: string;
  value?: string;
  default?: boolean;
};

const Option = ({ label, icon, value }: OptionProps) => {
  const { selected, onSelect } = useContext(DropdownContext);

  const isSelected = () => {
    if (!!value) {
      return selected == value;
    }

    return selected == label;
  };

  return (
    <li
      className={twMerge(
        "flex relative items-center select-none gap-3 px-4 py-3 text-graphite-bolder cursor-pointer",
        isSelected() && "text-primary-bold",
        "after:h-[1px] after:left-4 after:right-4 last:after:hidden after:bg-graphite-normal after:absolute after:bottom-0"
      )}
      onClick={() => onSelect(value || label)}
    >
      <Icon
        icon={icon}
        className={twMerge(
          "text-graphite-bold",
          isSelected() && "text-primary-bold"
        )}
      />{" "}
      {label} {isSelected() && "(Selected)"}
    </li>
  );
};

Dropdown.Option = Option;

export default Dropdown;
