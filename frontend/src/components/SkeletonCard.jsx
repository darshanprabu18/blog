function SkeletonCard() {
  return (
    <div className="overflow-hidden rounded-3xl border border-white/80 bg-white/70 shadow-xl shadow-violet-200/30">
      <div className="h-48 animate-pulse bg-gradient-to-r from-violet-100 via-fuchsia-100 to-sky-100" />
      <div className="space-y-4 p-5">
        <div className="h-4 w-24 animate-pulse rounded bg-violet-100" />
        <div className="h-6 w-4/5 animate-pulse rounded bg-fuchsia-100" />
        <div className="h-4 w-full animate-pulse rounded bg-sky-100" />
        <div className="h-4 w-2/3 animate-pulse rounded bg-amber-100" />
      </div>
    </div>
  );
}

export default SkeletonCard;
