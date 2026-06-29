import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from './button';

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  args: { children: '按钮' },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'outline', 'ghost', 'danger', 'link'],
    },
    size: { control: 'select', options: ['sm', 'default', 'lg', 'icon'] },
  },
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = { args: { variant: 'primary' } };
export const Default: Story = {};
export const Secondary: Story = { args: { variant: 'secondary' } };
export const Danger: Story = { args: { variant: 'danger' } };

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Button variant="primary">Primary</Button>
      <Button>Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="danger">Danger</Button>
    </div>
  ),
};
