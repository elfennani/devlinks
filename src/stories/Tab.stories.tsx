import type { Meta, StoryObj } from "@storybook/react";
import Tab from "../components/UI/Tab";
import { useState } from "react";

const meta: Meta<typeof Tab> = {
  title: "UI/Tab",
  component: Tab,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    active: { type: "boolean", defaultValue: false },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Default",
    icon: "ph:link-bold",
  },
};

export const Active: Story = {
  args: {
    label: "Active",
    icon: "ph:link-bold",
    active: true,
  },
};

export const Multiple: Story = {
  render: () => {
    const [active, _setActive] = useState(0);
    return (
      <div className="flex gap-2">
        <Tab icon="ph:link-bold" label="Links" href="#" active={active == 0} />
        <Tab
          icon="ph:user-circle-bold"
          label="Profile Details"
          active={active == 1}
          href="#"
        />
        <Tab
          icon="teenyicons:github-solid"
          label="GitHub"
          active={active == 2}
          href="#"
        />
      </div>
    );
  },
};
