'use client'
import { useState, useEffect, useRef } from 'react';

export default function Countdown() {
  // 设置倒计时总时长（毫秒）
  const countdownTime = 10000; // 10秒倒计时

  // 毫秒数状态
  const [timeLeft, setTimeLeft] = useState<number>(countdownTime);

  // 定义使用Ref存储开始时间和动画帧ID（类型声明）
  const startTimeRef = useRef<number | null>(null);
  const animationFrameId = useRef<number | null>(null);

  useEffect(() => {
    startTimeRef.current = performance.now();

    const tick = () => {
      if (startTimeRef.current === null) return;

      const now = performance.now();
      const elapsed = now - startTimeRef.current;
      const remaining = countdownTime - elapsed;

      if (remaining > 0) {
        setTimeLeft(remaining);
        animationFrameId.current = requestAnimationFrame(tick);
      } else {
        setTimeLeft(0);
        if (animationFrameId.current !== null) {
          cancelAnimationFrame(animationFrameId.current);
        }
      }
    };

    animationFrameId.current = requestAnimationFrame(tick);

    return () => {
      if (animationFrameId.current !== null) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  // 格式化毫秒为 mm:ss:msmsms
  const formatTime = (ms: number): string => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const milliseconds = Math.floor(ms % 1000);

    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(milliseconds).padStart(3, '0')}`;
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>基于 TypeScript 的在线倒计时秒表（精确到毫秒）</h1>
      <div style={{ fontSize: '48px', fontFamily: 'monospace' }}>
        {formatTime(timeLeft)}
      </div>
    </div>
  );
}
