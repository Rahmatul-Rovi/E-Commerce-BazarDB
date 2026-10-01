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