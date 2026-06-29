import type { Meta, StoryObj } from '@storybook/react-vite';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './card';
import { Button } from './button';

const meta: Meta<typeof Card> = {
  title: 'UI/Card',
  component: Card,
};
export default meta;

type Story = StoryObj<typeof Card>;

export const Glass: Story = {
  render: () => (
    <Card interactive className="max-w-sm">
      <CardHeader>
        <CardTitle>毛玻璃卡片</CardTitle>
        <CardDescription>backdrop-filter + 高光描边</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">悬停查看上浮与发光效果。</p>
        <Button variant="primary" className="mt-4">
          操作
        </Button>
      </CardContent>
    </Card>
  ),
};
