function AppHeader({
  staff,
  roleLabels,
  tabs = [],
  activeTab,
  onTabChange,
  onLogout,
}) {
  return (
    <header className="sticky top-0 z-10 mb-10 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 bg-slate-950/80 px-6 py-4 backdrop-blur">
      <div>
        <p className="text-xs uppercase tracking-[0.4em] text-emerald-200">
          mediboard
        </p>
        <p className="mt-1 text-base font-semibold text-white">
          {staff
            ? `Logged in as ${roleLabels[staff.role] || staff.role}`
            : 'Staff Portal'}
        </p>
      </div>

      {staff ? (
        <div className="flex flex-wrap items-center gap-3">
          {tabs.length ? (
            <nav className="flex flex-wrap items-center gap-2 rounded-2xl border border-white/10 bg-white/5 p-1 text-xs sm:text-sm shadow-lg">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => onTabChange?.(tab.id)}
                  className={`rounded-2xl px-4 py-2 font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300 ${
                    activeTab === tab.id
                      ? 'bg-emerald-500 text-emerald-950'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          ) : null}

          <button
            type="button"
            onClick={onLogout}
            className="rounded-2xl border border-white/20 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:border-emerald-300 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300"
          >
            Log out
          </button>
        </div>
      ) : null}
    </header>
  )
}

export default AppHeader
