type StatusHistoryRow = {
    status: string
    changed_on?: string
}

export const getInterviewsByMonth = (statusHistory: StatusHistoryRow[]) => {
    const byMonth: Record<string, number> = {}
    for (const row of statusHistory) {
        if (!row.changed_on) continue
        if (row.status === "Interview") {
            const month = row.changed_on.slice(0, 7)
            byMonth[month] = (byMonth[month] || 0) + 1
        }
    }
    return byMonth
}
