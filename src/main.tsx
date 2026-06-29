import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './theme/tokens.css';
import './theme/base.css';
import './theme/glass.css';

import './i18n';
import { App } from './app';

function render() {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}

/**
 * 仅在 dev/演示态启用 MSW 拦截 `/api/*`；动态 import 保证生产构建不打包 worker、零开销。
 * worker 就绪后再渲染，避免首屏请求漏过拦截。
 */
async function bootstrap() {
  if (import.meta.env.DEV) {
    const { worker } = await import('./mocks/browser');
    await worker.start({ onUnhandledRequest: 'bypass' });
  }
  render();
}

void bootstrap();
