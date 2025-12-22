function DashboardPage({ staff }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-10 text-center shadow-2xl backdrop-blur">
      <p className="text-sm uppercase tracking-[0.3em] text-emerald-200">
        mediboard
      </p>
      <h1 className="mt-6 text-4xl font-semibold text-white">Dashboard</h1>
      <p className="mt-4 text-base text-slate-300">
        Welcome back{staff?.name ? `, ${staff.name}` : ''}. Dashboard widgets will appear here soon.
      </p>
    </div>
  )
}

export default DashboardPage
