
const downloadEventReport = (events = []) => {
  if (!Array.isArray(events) || events.length === 0) {
    alert("No events available to download!");
    return;
  }

  // Calculate event statistics
  const totalEvents = events.length;

  const published = events.filter(
    (event) => event.status === "Published"
  ).length;

  const drafts = events.filter(
    (event) => event.status === "Draft"
  ).length;

  const completed = events.filter(
    (event) => event.status === "Completed"
  ).length;

  const totalRegistrations = events.reduce(
    (total, event) =>
      total + Number(event.registrations || 0),
    0
  );

  // Escape CSV values
  const escapeCSV = (value) => {
    return `"${String(value ?? "").replace(/"/g, '""')}"`;
  };

  // Summary
  const summary = [
    ["EVENTFLOW DASHBOARD REPORT"],
    ["Generated On", new Date().toLocaleString()],
    [],
    ["REPORT SUMMARY"],
    ["Total Events", totalEvents],
    ["Published Events", published],
    ["Draft Events", drafts],
    ["Completed Events", completed],
    ["Total Registrations", totalRegistrations],
    [],
    ["EVENT DETAILS"],
    [
      "Event ID",
      "Title",
      "Category",
      "Date",
      "Start Time",
      "End Time",
      "Venue",
      "City",
      "Capacity",
      "Registrations",
      "Status",
    ],
  ];

  // Event details
  const eventRows = events.map((event) => [
    event.id,
    event.title,
    event.category,
    event.date,
    event.startTime,
    event.endTime,
    event.venue,
    event.city,
    event.capacity,
    event.registrations,
    event.status,
  ]);

  // Convert into CSV
  const csvContent =
    "\uFEFF" +
    [...summary, ...eventRows]
      .map((row) => row.map(escapeCSV).join(","))
      .join("\n");

  // Generate downloadable file
  const blob = new Blob([csvContent], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = `EventFlow_Report_${new Date()
    .toISOString()
    .slice(0, 10)}.csv`;

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
};

export default downloadEventReport;
