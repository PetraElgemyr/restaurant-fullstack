export const useConvertDateToString = (day: Date) => {
    let month: string = (day.getMonth() + 1).toString();
    let dateDay: string = day.getDate().toString();
    if (month.length === 1) {
      month = "0" + month;
    }
    if (dateDay.length === 1) {
      dateDay = "0" + dateDay;
    }
    const dateInStringFormat = day.getFullYear().toString() + month + dateDay;
    return dateInStringFormat;
}