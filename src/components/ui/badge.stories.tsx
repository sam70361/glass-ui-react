import type { Meta, StoryObj } from '@storybook/react-vite';

import { Badge } from './badge';

const meta: Meta<typeof Badge> = {
  title: 'UI/Badge',
  component: Badge,
  args: { children: '标签' },
};
export default meta;

type Story = StoryObj<typeof Badge>;

export const All: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge>Default</Badge>
      <Badge variant="cyan">Cyan</Badge>
      <Badge variant="magenta">Magenta</Badge>
      <Badge variant="amber">Amber</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="danger">Danger</Badge>
      <Badge variant="solid">Solid</Badge>
    </div>
  ),
};
