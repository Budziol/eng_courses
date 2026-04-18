type DisplayStatus = "UPCOMING" | "ONGOING" | "COMPLETED" | "CANCELLED";

export function getDisplayStatus(
  date: Date,
  backendStatus?: "SCHEDULED" | "CANCELLED",
): DisplayStatus {
  if (backendStatus === "CANCELLED") {
    return "CANCELLED";
  }

  const now = new Date();
  const start = new Date(date);

  // zakładamy 1h trwania
  const end = new Date(start.getTime() + 60 * 60 * 1000);

  if (now < start) return "UPCOMING";
  if (now >= start && now <= end) return "ONGOING";
  return "COMPLETED";
}
