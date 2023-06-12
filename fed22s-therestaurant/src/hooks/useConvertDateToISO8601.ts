export const useConvertDateToISO8601 = (day: string) => {
    let date = day;
    const dateSplitted = date.split("");
    dateSplitted.splice(4, 0, "-");
    dateSplitted.splice(7, 0, "-");
    date = dateSplitted.join("");
    return date;
}