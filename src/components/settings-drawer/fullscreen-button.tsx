import { useState } from 'react';
import { Maximize, Minimize } from 'lucide-react';

import { Button } from 'src/components/ui/button';
import { SimpleTooltip } from 'src/components/ui/tooltip';

/** 全屏切换 */
export function FullscreenButton() {
  const [full, setFull] = useState(false);

  const toggle = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.().then(() => setFull(true)).catch(() => {});
    } else {
      document.exitFullscreen?.().then(() => setFull(false)).catch(() => {});
    }
  };

  return (
    <SimpleTooltip content={full ? '退出全屏' : '全屏'}>
      <Button variant="ghost" size="icon-sm" onClick={toggle} aria-label="全屏">
        {full ? <Minimize className="size-4" /> : <Maximize className="size-4" />}
      </Button>
    </SimpleTooltip>
  );
}
