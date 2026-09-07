function normalizeDate(date: string | Date): string {
    return new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        timeZone: "UTC",
    }).format(new Date(date));
}

export default normalizeDate;