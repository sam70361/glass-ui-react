import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { paths } from 'src/routes/paths';
import { useUIStore } from 'src/store';

/**
 * 全局键盘快捷键：
 * ⌘/Ctrl+K 命令面板 · g 后接字母快速跳转
 */
export function useKeyboardShortcuts() {
  const navigate = useNavigate();
  const { setCommandOpen } = useUIStore();

  useEffect(() => {
    let goMode = false;
    let goTimer: ReturnType<typeof setTimeout> | undefined;

    function isTyping(el: EventTarget | null) {
      const t = el as HTMLElement | null;
      return !!t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable);
    }

    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandOpen(true);
        return;
      }
      if (isTyping(e.target)) return;

      if (goMode) {
        const map: Record<string, string> = {
          d: paths.dashboard,
          b: paths.board,
          a: paths.assets,
          t: paths.team,
          c: paths.calendar,
          i: paths.inbox,
        };
        if (map[e.key]) navigate(map[e.key]);
        goMode = false;
        return;
      }
      if (e.key === 'g') {
        goMode = true;
        clearTimeout(goTimer);
        goTimer = setTimeout(() => (goMode = false), 1200);
      }
    }

    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      clearTimeout(goTimer);
    };
  }, [navigate, setCommandOpen]);
}
