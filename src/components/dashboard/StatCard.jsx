
const StatCard = ({ stat }) => {
  const Icon = stat.icon;

  return (
    <div className="w-full rounded-2xl border border-[var(--border-color)] bg-[var(--card-bg)] p-5 hover:border-purple-500/40 hover:-translate-y-1 transition-all duration-300">

      {/* Top Section */}
      <div className="flex items-center justify-between gap-3 mb-5">

        <span className="text-sm font-medium text-[var(--muted-color)]">
          {stat.title}
        </span>

        <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
          <Icon size={19} />
        </div>

      </div>

      {/* Main Value */}
      <h2 className="text-3xl font-bold tracking-tight text-[var(--text-color)]">
        {stat.value}
      </h2>

      {/* Footer */}
      <div className="flex flex-wrap items-center gap-2 mt-4">

        <span className="inline-flex items-center gap-1 text-xs font-semibold text-green-400">
          <span>↑</span>
          {stat.change}
        </span>

        <span className="text-xs text-[var(--muted-color)]">
          {stat.description}
        </span>

      </div>

    </div>
  );
};

export default StatCard;
