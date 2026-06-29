import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { TooltipProvider } from 'src/components/ui/tooltip';
import { Toaster } from 'src/components/ui/sonner';
import { LoadingScreen } from 'src/components/system/loading-screen';
import { QueryStoreBridge } from 'src/components/system/query-store-bridge';
import { DashboardLayout } from 'src/layouts';
import { SettingsProvider, useSettingsStore } from 'src/theme/settings';
import { applyInitialLocale, changeLocale } from 'src/i18n';
import { paths } from 'src/routes/paths';
import { fixedRoutes, ScenarioRouter } from 'src/scenarios/registry';

const queryClient = new QueryClient({ defaultOptions: { queries: { staleTime: 60_000 } } });

// 场景库 hub（其余路由由 registry.fixedRoutes 派生）
const ScenariosHubPage = lazy(() => import('src/scenarios/_hub'));

function LocaleSync() {
  const locale = useSettingsStore((s) => s.locale);
  useEffect(() => {
    applyInitialLocale(locale);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    void changeLocale(locale);
  }, [locale]);
  return null;
}

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SettingsProvider>
        <TooltipProvider delayDuration={300}>
          <LocaleSync />
          <QueryStoreBridge />
          <BrowserRouter>
            <Suspense fallback={<LoadingScreen />}>
              <Routes>
                <Route element={<DashboardLayout />}>
                  <Route index element={<Navigate to={paths.dashboard} replace />} />
                  {fixedRoutes.map(({ path, Comp }) => (
                    <Route key={path} path={path} element={<Comp />} />
                  ))}
                  <Route path={paths.scenarios} element={<ScenariosHubPage />} />
                  <Route path="/scenarios/:id" element={<ScenarioRouter />} />
                  <Route path="*" element={<Navigate to={paths.dashboard} replace />} />
                </Route>
              </Routes>
            </Suspense>
          </BrowserRouter>
          <Toaster />
        </TooltipProvider>
      </SettingsProvider>
    </QueryClientProvider>
  );
}
