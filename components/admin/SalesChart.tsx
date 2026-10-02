type DailyRevenue = {
  date: string;
  revenue: number;
};

type StatusBreakdown = {
  status: string;
  count: number;
};

const STATUS_COLORS: Record<string, string> = {
  pending: "#F59E0B",
  processing: "#3B82F6",
  delivered: "#16A34A",
  cancelled: "#DC2626",
};

export default function SalesChart({
  dailyRevenue,
  statusBreakdown,
}: {
  dailyRevenue: DailyRevenue[];
  statusBreakdown: StatusBreakdown[];
}) {

   return (
    <div className="grid lg:grid-cols-3 gap-4 mb-8">
      {/* Revenue line chart */}
      <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-5">
        <h3 className="font-heading font-semibold text-gray-900 mb-4">
          Revenue — Last 7 Days
        </h3>

         <ResponsiveContainer width="100%" height={260}>
          <LineChart data={dailyRevenue}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
            <XAxis dataKey="date" tick={{ fontSize: 12, fill: "#6B7280" }} />
            <YAxis tick={{ fontSize: 12, fill: "#6B7280" }} />
            <Tooltip
              formatter={(value: number) => [`৳${value.toFixed(0)}`, "Revenue"]}
              contentStyle={{ borderRadius: 12, border: "1px solid #E5E7EB" }}
            />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#16A34A"
              strokeWidth={2.5}
              dot={{ r: 4, fill: "#16A34A" }}
            />
            </LineChart>
        </ResponsiveContainer>
      </div>

       {/* Order status pie chart */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5">
        <h3 className="font-heading font-semibold text-gray-900 mb-4">
          Orders by Status
        </h3>
        {statusBreakdown.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-16">No orders yet.</p>
        ) : 
        <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={statusBreakdown}
                dataKey="count"
                nameKey="status"
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={3}
              ></Pie>