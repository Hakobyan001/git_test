export default class DateUtils {

    // Static method to add minutes to a given date
    static addMinutes(dateStr, minutesToAdd) {
        const date = new Date(dateStr);
        date.setMinutes(date.getMinutes() + minutesToAdd);
        return date;
    }

    // Static method to compare the given date with the current date
    static compareWithCurrentDate(dataFromDb, expirationTime) {
        const dateStr = DateUtils.addMinutes(dataFromDb, Number(expirationTime));
        const givenDate = new Date(dateStr);
        const currentDate = new Date();
        console.log(givenDate);
        console.log(currentDate);
        return givenDate > currentDate;
    }
};
