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