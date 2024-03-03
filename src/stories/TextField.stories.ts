import type { Meta, StoryObj } from '@storybook/react';
import TextField from '../components/UI/TextField';



const meta: Meta<typeof TextField> = {
  title: 'UI/TextField',
  component: TextField,
  parameters: {
    layout: 'centered',
  },
  args: {
    icon: "ph:link-bold"
  },
  argTypes: {
    icon: { type: "string" },
    error: { type: "string" }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  args: {
    placeholder: "Text Field Empty",
  }
};

export const Filled: Story = {
  args: {
    value: "Text Field Filled"
  },
};

export const Active: Story = {
  args: {
    autoFocus: true,
    value: "Text Field Active"
  },
};

export const Error: Story = {
  args: {
    value: "Text Field Error",
    error: "Please check again!"
  },
};