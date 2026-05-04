function Spinner({ label = 'Loading' }) {
  return (
    <div className="flex items-center justify-center gap-3 py-8 text-sm font-bold text-violet-700">
      <span className="h-5 w-5 animate-spin rounded-full border-2 border-violet-200 border-t-fuchsia-500" />
      {label}
    </div>
  );
}

export default Spinner;
