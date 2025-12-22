import { useMemo, useState } from 'react'

const SLOT_DURATION_MINUTES = 30
const DAY_START_HOUR = 8
const DAY_END_HOUR = 18

function generateSlots() {
  const slots = []
  for (
    let minutes = DAY_START_HOUR * 60;
    minutes < DAY_END_HOUR * 60;
    minutes += SLOT_DURATION_MINUTES
  ) {
    slots.push({
      startMinutes: minutes,
      endMinutes: minutes + SLOT_DURATION_MINUTES,
    })
  }
  return slots
}

function formatMinutes(minutesTotal) {
  const hours = Math.floor(minutesTotal / 60)
  const minutes = minutesTotal % 60
  const period = hours >= 12 ? 'PM' : 'AM'
  const displayHour = ((hours + 11) % 12) + 1
  return `${displayHour}:${minutes.toString().padStart(2, '0')} ${period}`
}

function TimesheetPage({ staff }) {
  const [selectedDate, setSelectedDate] = useState(() => new Date())
  const slots = useMemo(() => generateSlots(), [])

  const formattedDate = selectedDate.toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  const changeDay = (offset) => {
    setSelectedDate((prev) => {
      const next = new Date(prev)
      next.setDate(prev.getDate() + offset)
      return next
    })
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-slate-100 shadow-2xl backdrop-blur">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-emerald-200">mediboard</p>
          <h2 className="mt-1 text-2xl font-semibold">
            {staff?.name ? `${staff.name.split(' ')[0]}'s Schedule` : 'Schedule'}
          </h2>
          <p className="text-sm text-slate-400">
            Plan consultations across precise 30-minute windows; hold a slot whenever you need
            focused time.
          </p>
        </div>
        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white">
          <button
            type="button"
            onClick={() => changeDay(-1)}
            className="rounded-2xl px-3 py-1 transition hover:bg-white/10"
          >
            ←
          </button>
          <span className="min-w-[12rem] text-center">{formattedDate}</span>
          <button
            type="button"
            onClick={() => changeDay(1)}
            className="rounded-2xl px-3 py-1 transition hover:bg-white/10"
          >
            →
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-3xl border border-white/10 bg-slate-900/60 p-6 shadow-inner">
        <div className="grid grid-cols-[80px_minmax(0,1fr)] gap-4 text-sm">
          <div className="space-y-6 text-right text-slate-500">
            {slots.map((slot, index) =>
              index % 2 === 0 ? (
                <p key={slot.startMinutes} className="font-semibold">
                  {formatMinutes(slot.startMinutes)}
                </p>
              ) : (
                <div key={slot.startMinutes} />
              ),
            )}
          </div>
          <div className="space-y-2">
            {slots.map((slot) => (
              <div
                key={`${slot.startMinutes}-${slot.endMinutes}`}
                className="flex items-center justify-between rounded-2xl border border-white/5 bg-gradient-to-r from-slate-800/80 via-slate-800/40 to-slate-800/80 px-4 py-3 text-slate-200"
              >
                <div>
                  <p className="font-semibold text-white">
                    {formatMinutes(slot.startMinutes)} – {formatMinutes(slot.endMinutes)}
                  </p>
                  <p className="text-xs text-slate-400">Available • tap to hold</p>
                </div>
                <button
                  type="button"
                  className="rounded-xl border border-emerald-400/70 px-3 py-1 text-xs font-semibold text-emerald-200 transition hover:bg-emerald-500/10"
                >
                  Block
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TimesheetPage
