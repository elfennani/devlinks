import type { Meta, StoryObj } from "@storybook/react";
import Dropdown from "../components/UI/Dropdown";

const meta: Meta<typeof Dropdown> = {
  title: "UI/Dropdown",
  component: Dropdown,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    onChange: { type: "function" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: (props) => (
    <div className="w-96">
      <Dropdown {...props}>
        <Dropdown.Option label="GitHub" icon="teenyicons:github-solid" />
        <Dropdown.Option default label="YouTube" icon="ri:youtube-fill" />
        <Dropdown.Option label="LinkedIn" icon="mdi:linkedin" />
      </Dropdown>
    </div>
  ),
};
