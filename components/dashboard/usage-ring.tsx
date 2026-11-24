const RADIUS = 33;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function UsageRing({ value }: { value: number }) {
  const progress = Math.min(Math.max(value, 0), 100);
  const stroke = (progress / 100) * CIRCUMFERENCE;

  return (
    <div
      className="relative grid h-20 w-20 place-items-center"
      role="img"
      aria-label={`${progress}% used`}
    >
      <svg
        viewBox="0 0 80 80"
        className="absolute inset-0 h-20 w-20 -rotate-90"
        aria-hidden="true"
      >
        <circle
          cx="40"
          cy="40"
          r={RADIUS}
          fill="none"
          stroke="#d9e2ec"
          strokeWidth="9"
        />
        {progress > 0 ? (
          <circle
            cx="40"
            cy="40"
            r={RADIUS}
            fill="none"
            stroke="#2563eb"
            strokeWidth="9"
            strokeDasharray={`${stroke} ${CIRCUMFERENCE}`}
          />
        ) : null}
      </svg>
      <span className="relative text-center">
        <span className="block text-[20px] font-bold leading-none tracking-[-0.02em] text-ink">
          {progress}%
        </span>
        <span className="mt-1 block text-[9px] font-semibold uppercase tracking-[0.08em] text-[#94a3b8]">
          Used
        </span>
      </span>
    </div>
  );
}
