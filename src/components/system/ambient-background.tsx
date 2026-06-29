/**
 * 环境背景：噪点 + 三层径向光晕（移植自 glass base.css）。
 * 固定铺底，受 data-ambient / data-reduce-motion 控制。
 */
export function AmbientBackground() {
  return (
    <div className="bg-ambient" aria-hidden>
      <div className="bg-ambient__glow bg-ambient__glow--1" />
      <div className="bg-ambient__glow bg-ambient__glow--2" />
      <div className="bg-ambient__glow bg-ambient__glow--3" />
      <div className="bg-ambient__noise" />
    </div>
  );
}
