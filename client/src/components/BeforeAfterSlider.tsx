/**
 * ビフォーアフター比較スライダー（自前実装・依存ライブラリなし）
 * - After 画像を全面に敷き、Before 画像を clip-path で左側だけ表示
 * - ハンドルをドラッグ（マウス／タッチ＝Pointer Events）または矢印キーで比較位置を変更
 */
import { useCallback, useRef, useState } from "react";
import { ChevronsLeftRight } from "lucide-react";

interface BeforeAfterSliderProps {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt: string;
  afterAlt: string;
  beforeLabel?: string;
  afterLabel?: string;
  /** 追加クラス（角丸・影など） */
  className?: string;
}

export default function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeAlt,
  afterAlt,
  beforeLabel = "Before",
  afterLabel = "After",
  className = "",
}: BeforeAfterSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);
  const [pos, setPos] = useState(50); // 仕切り位置（左端からの %）

  const setFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, pct)));
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    draggingRef.current = true;
    e.currentTarget.setPointerCapture?.(e.pointerId);
    setFromClientX(e.clientX);
  };
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (draggingRef.current) setFromClientX(e.clientX);
  };
  const endDrag = () => {
    draggingRef.current = false;
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - 2));
    else if (e.key === "ArrowRight") setPos((p) => Math.min(100, p + 2));
    else if (e.key === "Home") setPos(0);
    else if (e.key === "End") setPos(100);
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full aspect-[4/3] overflow-hidden rounded-lg select-none touch-none ${className}`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
    >
      {/* After（下層・全面） */}
      <img
        src={afterSrc}
        alt={afterAlt}
        className="absolute inset-0 h-full w-full object-cover"
        draggable={false}
        loading="lazy"
      />
      <span
        className="absolute right-3 top-3 z-10 rounded-full px-2.5 py-1 text-[11px] font-bold text-white"
        style={{ backgroundColor: "rgba(46,125,50,0.92)" }}
      >
        {afterLabel}
      </span>

      {/* Before（上層・clip-path で左側だけ表示） */}
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <img
          src={beforeSrc}
          alt={beforeAlt}
          className="absolute inset-0 h-full w-full object-cover"
          draggable={false}
          loading="lazy"
        />
        <span
          className="absolute left-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-bold text-white"
          style={{ backgroundColor: "rgba(31,58,95,0.92)" }}
        >
          {beforeLabel}
        </span>
      </div>

      {/* ハンドル */}
      <div
        role="slider"
        tabIndex={0}
        aria-label="ビフォーアフター比較スライダー"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pos)}
        onKeyDown={handleKeyDown}
        className="absolute bottom-0 top-0 z-20 -ml-5 flex w-10 cursor-ew-resize items-center justify-center outline-none"
        style={{ left: `${pos}%` }}
      >
        <div className="absolute bottom-0 left-1/2 top-0 w-0.5 -translate-x-1/2 bg-white/90 shadow" />
        <div
          className="relative flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-md"
          style={{ color: "#1F3A5F" }}
        >
          <ChevronsLeftRight size={18} aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}
