import { BookOpen, Clock, GraduationCap, PlayCircle, Users } from 'lucide-react';

import { ScenarioFrame, ScenarioGate } from 'src/scenarios/_kit';
import { StatCard } from 'src/components/shared/stat-card';
import { DATA_PALETTE } from 'src/theme/palette';
import { Card, CardContent } from 'src/components/ui/card';
import { Badge } from 'src/components/ui/badge';
import { Progress } from 'src/components/ui/progress';
import { useScenarioData } from 'src/api';
import { type Course } from './lms.mock';

export default function LmsScenario() {
  const q = useScenarioData<{ COURSES: Course[] }>('lms');
  return (
    <ScenarioFrame id="lms" surface="outline">
      <ScenarioGate query={q}>
        {({ COURSES }) => (
          <>
            <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
              <StatCard label="课程" value={4} icon={BookOpen} color={DATA_PALETTE.cyan} />
              <StatCard label="学员" value="1.2k" icon={Users} color={DATA_PALETTE.magenta} />
              <StatCard label="总时长" value="24h" icon={Clock} color={DATA_PALETTE.amber} />
              <StatCard label="完课率" value="68%" change={6} icon={GraduationCap} color={DATA_PALETTE.emerald} />
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {COURSES.map((c) => {
                const pct = Math.round((c.done / c.lessons) * 100);
                return (
                  <Card key={c.id} interactive className="overflow-hidden p-0">
                    <div className="relative flex h-32 items-center justify-center" style={{ background: `linear-gradient(135deg, ${c.g[0]}, ${c.g[1]})` }}>
                      <PlayCircle className="size-10 text-foreground/90" />
                      <Badge variant="default" className="absolute end-2 top-2 border-[var(--color-glass-border)] bg-[var(--color-scrim)] text-foreground">{c.dur}</Badge>
                    </div>
                    <CardContent className="p-4">
                      <p className="font-display font-semibold">{c.name}</p>
                      <p className="mt-0.5 text-xs text-text-tertiary">{c.lessons} 节 · {c.students} 学员</p>
                      <div className="mt-3 flex items-center gap-2">
                        <Progress value={pct} className="flex-1" />
                        <span className="text-xs tabular-nums text-text-tertiary">{pct}%</span>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </>
        )}
      </ScenarioGate>
    </ScenarioFrame>
  );
}
