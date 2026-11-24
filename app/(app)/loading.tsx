export default function AppLoading() {
  return (
    <main
      aria-busy="true"
      aria-live="polite"
      className="mx-auto w-full max-w-[800px] px-5 pb-16 pt-6 sm:px-6 lg:pt-7"
    >
      <span className="sr-only">Loading dashboard…</span>
      <div className="animate-pulse">
        <div className="h-[34px] w-40 rounded-[8px] bg-[#e6ecf4]" />
        <div className="mt-3 h-3.5 w-[min(100%,420px)] rounded-full bg-[#eef2f7]" />
        <div className="mt-9 h-[30px] w-[min(100%,260px)] rounded-[8px] bg-[#e6ecf4]" />
        <div className="mt-3 h-3.5 w-[min(100%,240px)] rounded-full bg-[#eef2f7]" />
        <div className="mt-4 flex flex-col gap-2.5 sm:flex-row sm:gap-3">
          <div className="h-9 w-full rounded-[9px] bg-[#e6ecf4] sm:w-[186px]" />
          <div className="h-9 w-full rounded-[9px] bg-[#eef2f7] sm:w-[210px]" />
        </div>
        <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_236px] lg:gap-6">
          <div className="space-y-5">
            <div className="h-[196px] rounded-[16px] border border-line bg-white shadow-soft" />
            <div className="h-[148px] rounded-[16px] border border-line bg-white shadow-soft" />
          </div>
          <div className="space-y-5">
            <div className="h-[220px] rounded-[16px] border border-line bg-white shadow-soft" />
            <div className="h-[120px] rounded-[16px] border border-line bg-white shadow-soft" />
          </div>
        </div>
      </div>
    </main>
  );
}
