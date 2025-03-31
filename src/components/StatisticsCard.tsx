import React from "react";
import { ArrowUp, ArrowDown } from "lucide-react";
export function StatisticsCard({
  title,
  value,
  change,
  icon,
  chart = []
}) {
  const isPositive = change?.startsWith("+");
  return <div className="bg-white rounded-lg shadow p-6 h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="bg-purple-50 p-2 rounded-lg">{icon}</div>
        {change && <div className={`flex items-center gap-1 text-sm ${isPositive ? "text-green-600" : "text-red-600"}`}>
            {isPositive ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
            {change}
          </div>}
      </div>
      <p className="text-gray-600 text-sm">{title}</p>
      <p className="text-2xl font-bold text-gray-900 mb-4">{value}</p>
      {chart.length > 0 && <div className="flex items-end justify-between h-12 mt-4 gap-1">
          {chart.map((value, index) => <div key={index} className="w-full bg-purple-100 rounded-sm" style={{
        height: `${value}%`
      }} />)}
        </div>}
    </div>;
}