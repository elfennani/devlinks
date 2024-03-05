import type { Meta, StoryObj } from "@storybook/react";
import ImageUpload from "../components/UI/ImageUpload";
import { useState } from "react";

const meta: Meta<typeof ImageUpload> = {
  title: "UI/ImageUpload",
  component: ImageUpload,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
  render: () => {
    const [value, setValue] = useState<File | null | undefined>(null);
    return <ImageUpload onChange={setValue} value={value} />;
  },
};
