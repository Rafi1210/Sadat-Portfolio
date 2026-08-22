import { useEffect, useRef, useState } from 'react';
import { useIsCoarsePointer } from '@/hooks/useIsCoarsePointer';
import { useReducedMotion } from '@/hooks/useReducedMotion';

/**
 * Colorful gradient crosshair cursor.
 *  - diamond dot at exact cursor (lerp 0.95)
 *  - horizontal & vertical line "arms" trailing with lerp 0.32 (snappy)
 *  - hover over a/button/[data-hover]: dot scales, arms shorten and rotate to X
 *  - hidden on touch devices and when prefers-reduced-motion
 */
export default function CustomCursor() {
  const coarse = useIsCoarsePointer();
  const reduced = useReducedMotion();
  const dotRef = useRef(null);
  const hRef = useRef(null);
  const vRef = useRef(null);
  const rafRef = useRef(0);

  // smoothed positions per element
  const dotPos = useRef({ x: 0, y: 0 });
  const hPos = useRef({ x: 0, y: 0 });
  const vPos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const targetPrev = useRef({ x: 0, y: 0 });
  const angle = useRef(0);

  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (coarse || reduced) {
      document.body.removeAttribute('data-cursor');
      setEnabled(false);
      return;
    }
    document.body.setAttribute('data-cursor', 'desktop');
    setEnabled(true);

    const onMove = (e) => {
      targetPrev.current = target.current;
      target.current = { x: e.clientX, y: e.clientY };
      // rotation tracks motion direction
      const dx = e.clientX - targetPrev.current.x;
      const dy = e.clientY - targetPrev.current.y;
      if (dx !== 0 || dy !== 0) {
        angle.current = Math.atan2(dy, dx) * (180 / Math.PI);
      }
    };
    const onOver = (e) => {
      const t = e.target;
      if (t && t.closest && t.closest('a, button, [data-hover]')) {
        dotRef.current?.setAttribute('data-hover', 'true');
        hRef.current?.setAttribute('data-hover', 'true');
        vRef.current?.setAttribute('data-hover', 'true');
      }
    };
    const onOut = (e) => {
      const t = e.target;
      if (t && t.closest && t.closest('a, button, [data-hover]')) {
        dotRef.current?.removeAttribute('data-hover');
        hRef.current?.removeAttribute('data-hover');
        vRef.current?.removeAttribute('data-hover');
      }
    };
    document.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);
    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
    };
  }, [coarse, reduced]);

  useEffect(() => {
    if (!enabled) return;
    const lerp = (a, b, n) => a + (b - a) * n;
    const tick = () => {
      const { x, y } = target.current;
      // dot: very fast (almost no lag)
      dotPos.current.x = lerp(dotPos.current.x, x, 0.92);
      dotPos.current.y = lerp(dotPos.current.y, y, 0.92);
      // arms: snappy but a touch behind
      hPos.current.x = lerp(hPos.current.x, x, 0.42);
      hPos.current.y = lerp(hPos.current.y, y, 0.42);
      vPos.current.x = lerp(vPos.current.x, x, 0.42);
      vPos.current.y = lerp(vPos.current.y, y, 0.42);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dotPos.current.x}px, ${dotPos.current.y}px, 0) translate(-50%, -50%) rotate(45deg)`;
      }
      if (hRef.current) {
        hRef.current.style.transform = `translate3d(${hPos.current.x}px, ${hPos.current.y}px, 0) translate(-50%, -50%)`;
      }
      if (vRef.current) {
        vRef.current.style.transform = `translate3d(${vPos.current.x}px, ${vPos.current.y}px, 0) translate(-50%, -50%)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div ref={hRef} className="cursor-h" aria-hidden />
      <div ref={vRef} className="cursor-v" aria-hidden />
      <div ref={dotRef} className="cursor-dot" aria-hidden />
    </>
  );
}