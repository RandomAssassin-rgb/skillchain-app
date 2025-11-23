"use client"

const monthlyData = [
  { month: "Jan", issued: 12 },
  { month: "Feb", issued: 19 },
  { month: "Mar", issued: 15 },
  { month: "Apr", issued: 25 },
  { month: "May", issued: 22 },
  { month: "Jun", issued: 18 },
]

export function IssuerStats() {
  const totalIssued = monthlyData.reduce((sum, d) => sum + d.issued, 0)
  const maxValue = Math.max(...monthlyData.map((d) => d.issued))

  return (
    <>
      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4">
        {[
          { label: "Total Issued", value: totalIssued },
          { label: "This Month", value: monthlyData[monthlyData.length - 1].issued },
          { label: "Active Issuers", value: 1 },
          { label: "Verification Rate", value: "100%" },
        ].map((stat, i) => (
          <div key={i} className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
            <p className="text-xs text-slate-400 mb-1">{stat.label}</p>
            <p className="text-2xl font-bold text-white">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Simple Bar Chart - Replaced Recharts with simple CSS bars */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-white mb-4">Credentials Issued</h3>
        <div className="space-y-3">
          {monthlyData.map((d) => (
            <div key={d.month} className="flex items-end gap-2">
              <div className="text-xs text-slate-400 w-8">{d.month}</div>
              <div
                className="flex-1 bg-slate-700 rounded h-8"
                style={{
                  background: `linear-gradient(to right, #0ea5e9, #10b981)`,
                  height: `${(d.issued / maxValue) * 40}px`,
                }}
              ></div>
              <div className="text-xs text-slate-300 w-6 text-right">{d.issued}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
