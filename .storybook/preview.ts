import type { Preview } from '@storybook/react-vite';

import '../src/theme/tokens.css';
import '../src/theme/base.css';
import '../src/theme/glass.css';

const preview: Preview = {
  parameters: {
    backgrounds: { disable: true },
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
  },
  decorators: [
    (Story) => {
      document.documentElement.setAttribute('data-theme', 'aurora');
      document.documentElement.setAttribute('data-mode', 'dark');
      return Story();
    },
  ],
};

export default preview;
