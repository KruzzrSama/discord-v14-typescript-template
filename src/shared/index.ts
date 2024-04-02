import moment from "moment";
import path from "path";

export const getDir = (...dirs: string[]) => {
    return path.join(__dirname, "..", ...dirs);
};

export const getAsset = (name: string) => {
    return path.join(__dirname, "..", "..", "assets", name);
}

export const getMonthFirstAndLastDay = (): { firstDay: Date, lastDay: Date; } => {
    const currentData = new Date();

    const month = currentData.getMonth();
    const year = currentData.getFullYear();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    return { firstDay, lastDay };
};

export function getLocalDate(timestamp: number, format: LocalDateFormat): string {
    const date = new Date(timestamp);

    const userTimezoneOffset = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const localDate = moment(date).utcOffset(userTimezoneOffset)

    let dateString: string = localDate.format();
    switch (format) {
        case LocalDateFormat.NormalDateWithHoursToSeconds:
            dateString = localDate.format("DD-MM-YY HH:mm:ss");
            break;
        case LocalDateFormat.NormalDate:
            dateString = localDate.format("DD-MM-YYYY");
            break;
        case LocalDateFormat.HoursToSeconds:
            dateString = localDate.format("HH:mm:ss");
            break;
        case LocalDateFormat.HoursToMinutes:
            dateString = localDate.format("HH:mm");
            break;
        case LocalDateFormat.MinutesToSeconds:
            dateString = localDate.format("mm:ss");
            break;
        case LocalDateFormat.FromNow:
            dateString = localDate.fromNow();
            break;
    }

    return dateString;
};