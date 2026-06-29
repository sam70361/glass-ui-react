import { useState } from 'react';
import { Clock, Database, Play, Table as TableIcon } from 'lucide-react';

import { MOD_KEY } from 'src/lib/platform';
import { ScenarioEmpty, ScenarioFrame, ScenarioGate, ScenarioSkeleton, notify } from 'src/scenarios/_kit';
import { Card, CardHeader, CardTitle } from 'src/components/ui/card';
import { Button } from 'src/components/ui/button';
import { Badge } from 'src/components/ui/badge';
import { Spinner } from 'src/components/ui/spinner';
import { CodeEditor } from 'src/components/ui/code-editor';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from 'src/components/ui/table';
import { useScenarioData } from 'src/api';
import { SAMPLE, type Row, type State } from './sql-console.mock';

type SqlData = { TABLES: string[]; RESULT: Row[] };

export default function SqlConsoleScenario() {
  const q = useScenarioData<SqlData>('sql-console');
  return (
    <ScenarioGate query={q} skeleton={<ScenarioFrame id="sql-console" surface="flat"><ScenarioSkeleton /></ScenarioFrame>}>
      {(d) => <SqlConsoleInner {...d} />}
    </ScenarioGate>
  );
}

function SqlConsoleInner({ TABLES, RESULT }: SqlData) {
  const [sql, setSql] = useState(SAMPLE);
  const [editorKey, setEditorKey] = useState(0);
  const [state, setState] = useState<State>('idle');
  const [ms, setMs] = useState(0);
  const [history, setHistory] = useState<string[]>([]);

  const run = () => {
    const q = sql.trim();
    if (!q) { notify.error('请输入 SQL 语句'); return; }
    setState('running');
    setTimeout(() => {
      if (!/select/i.test(q)) { setState('error'); notify.error('语法错误', '仅支持 SELECT 查询（演示）'); return; }
      const hasRows = /orders|users|events|daily/i.test(q);
      setMs(28 + Math.floor(Math.random() * 40));
      setState(hasRows ? 'done' : 'empty');
      setHistory((h) => [q.split('\n')[0].slice(0, 48), ...h].slice(0, 6));
      notify.success('查询完成');
    }, 650);
  };

  const fillQuery = (table: string) => {
    const q = `SELECT * FROM public.${table}\nLIMIT 100;`;
    setSql(q);
    setEditorKey((k) => k + 1);
  };

  return (
    <ScenarioFrame
      id="sql-console"
      surface="flat"
      actions={<Button variant="primary" onClick={run}><Play className="size-4" /> 运行 ({MOD_KEY}↵)</Button>}
    >
      <div className="grid gap-4 lg:grid-cols-[220px_1fr]">
        <Card variant="solid" className="p-3">
          <p className="mb-2 flex items-center gap-1.5 px-1 text-xs font-semibold uppercase tracking-wide text-text-tertiary">
            <Database className="size-3.5" /> public
          </p>
          <div className="space-y-0.5">
            {TABLES.map((t) => (
              <button key={t} onClick={() => fillQuery(t)} className="flex w-full items-center gap-2 rounded-[var(--radius-sm)] px-2 py-1.5 text-left text-sm text-text-secondary transition-colors hover:bg-[var(--color-glass-bg)] hover:text-foreground">
                <TableIcon className="size-3.5 text-text-tertiary" /> {t}
              </button>
            ))}
          </div>
          {history.length > 0 && (
            <>
              <p className="mb-1.5 mt-4 flex items-center gap-1.5 px-1 text-xs font-semibold uppercase tracking-wide text-text-tertiary"><Clock className="size-3.5" /> 历史</p>
              <div className="space-y-0.5">
                {history.map((h, i) => (
                  <button key={i} onClick={() => { setSql(h.endsWith(';') ? h : `${h} …`); }} className="block w-full truncate rounded-[var(--radius-sm)] px-2 py-1 text-left font-mono text-[11px] text-text-tertiary hover:bg-[var(--color-glass-bg)]">{h}</button>
                ))}
              </div>
            </>
          )}
        </Card>

        <div className="space-y-4">
          <CodeEditor key={editorKey} defaultValue={sql} lang="sql" onChange={setSql} />
          <Card variant="solid" className="p-0">
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle>结果</CardTitle>
              {state === 'done' && (
                <div className="flex items-center gap-2"><Badge variant="success">{RESULT.length} 行</Badge><span className="text-xs text-text-tertiary">{ms}ms</span></div>
              )}
            </CardHeader>
            {state === 'running' ? (
              <div className="flex items-center justify-center gap-2 py-12 text-sm text-text-tertiary"><Spinner /> 查询执行中…</div>
            ) : state === 'error' ? (
              <ScenarioEmpty title="查询失败" description="请检查 SQL 语法后重试（演示仅支持 SELECT）" />
            ) : state === 'empty' ? (
              <ScenarioEmpty title="无结果" description="该查询未返回任何行" />
            ) : state === 'idle' ? (
              <ScenarioEmpty icon={Play} title="点击运行执行查询" description="或从左侧选择数据表快速生成查询" />
            ) : (
              <Table>
                <TableHeader>
                  <TableRow><TableHead>day</TableHead><TableHead className="text-end">orders</TableHead><TableHead className="text-end">revenue</TableHead></TableRow>
                </TableHeader>
                <TableBody>
                  {RESULT.map((r) => (
                    <TableRow key={r.day}>
                      <TableCell className="font-mono text-sm">{r.day}</TableCell>
                      <TableCell className="text-end tabular-nums">{r.orders}</TableCell>
                      <TableCell className="text-end tabular-nums">¥{r.revenue.toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </Card>
        </div>
      </div>
    </ScenarioFrame>
  );
}
