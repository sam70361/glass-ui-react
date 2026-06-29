import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const MAX_RECENT = 5;

interface UIState {
  navExpanded: boolean;
  commandOpen: boolean;
  settingsOpen: boolean;
  notifOpen: boolean;
  copilotOpen: boolean;
  recentPaths: string[];
}

interface UIActions {
  toggleNavExpand: () => void;
  setCommandOpen: (v: boolean) => void;
  setSettingsOpen: (v: boolean) => void;
  setNotifOpen: (v: boolean) => void;
  setCopilotOpen: (v: boolean) => void;
  addRecentPath: (path: string) => void;
}

export const useUIStore = create<UIState & UIActions>()(
  persist(
    (set) => ({
      navExpanded: false,
      commandOpen: false,
      settingsOpen: false,
      notifOpen: false,
      copilotOpen: false,
      recentPaths: [],
      toggleNavExpand: () => set((s) => ({ navExpanded: !s.navExpanded })),
      setCommandOpen: (v) => set({ commandOpen: v }),
      setSettingsOpen: (v) => set({ settingsOpen: v }),
      setNotifOpen: (v) => set({ notifOpen: v }),
      setCopilotOpen: (v) => set({ copilotOpen: v }),
      addRecentPath: (path) =>
        set((s) => ({
          recentPaths: [path, ...s.recentPaths.filter((p) => p !== path)].slice(0, MAX_RECENT),
        })),
    }),
    {
      name: 'glass-ui',
      partialize: (s) => ({ navExpanded: s.navExpanded, recentPaths: s.recentPaths }),
    }
  )
);
