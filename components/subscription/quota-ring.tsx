const RADIUS = 48;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

type QuotaRingProps = {
  value: number;
  label: string;
};

export function QuotaRing({ value, label }: QuotaRingProps) {
  const progress = Math.min(Math.max(value, 0), 100);
  const stroke = (progress / 100) * CIRCUMFERENCE;

  return (
    <div
      className="relative grid h-[92px] w-[92px] place-items-center sm:h-[104px] sm:w-[104px]"
      role="img"
      aria-label={`${progress}% of ${label} used`}
    >
      <svg
        viewBox="0 0 104 104"
        className="absolute inset-0 h-full w-full -rotate-90"
        aria-hidden="true"
      >
        <circle
          cx="52"
          cy="52"
          r={RADIUS}
          fill="none"
          stroke="#d9e2ec"
          strokeWidth="8"
        />
        {progress > 0 ? (
          <circle
            cx="52"
            cy="52"
            r={RADIUS}
            fill="none"
            stroke="#2563eb"
            strokeWidth="8"
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
