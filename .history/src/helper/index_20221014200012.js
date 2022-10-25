import { format, isFuture, addDays } from "date-fns";

export const addCommaToNumberFormat = (numberTag) => {
  let isNumber = parseInt(numberTag);
  if (!isNaN(isNumber)) {
    return isNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  return numberTag;
};
export const removeUnderScoresFromAString = (isAString) => {
  let string = isAString ? `${isAString}`.replace(/_/g, " ") : "";
  return string;
};
export const addUnderScoresToWhiteSpacesInAString = (isAString) => {
  let string = isAString ? isAString.replaceAll(" ", "_") : "";
  return string;
};

export const setWorkingHoursRangeInADate = (date) => {
  const isFutureDateStartTime = new Date(date.setHours(9, 0, 0, 0));
  const isPresentDateStartTime = new Date(date.setHours(11, 0, 0, 0));

  const timesOfTheDayArray = [];
  const startDayTime = isFuture(date)
    ? isFutureDateStartTime
    : isPresentDateStartTime;
  const endDayTime = new Date(date.setHours(19, 0, 0, 0));

  const time = new Date(startDayTime.getTime());

  while (time <= endDayTime) {
    let thisTime = new Date(time);
    if (isFuture(thisTime)){
      timesOfTheDayArray.push({
        time: format(thisTime, "hh:mm a"),
        date: thisTime,
      });
    }
    const thirtyMinutesInMilliSecond = 30 * 60 * 1000;
    time.setTime(time.getTime() + thirtyMinutesInMilliSecond);
  }
  //Check for undefined time and use endtime
  const timesOfTheDay =
    timesOfTheDayArray.length > 0
      ? timesOfTheDayArray
      : timesOfTheDayArray.push({
          time: format(new Date(endDayTime.getTime()), "hh:mm a"),
          date: new Date(endDayTime.getTime()),
    });
  return timesOfTheDay;
};

export const setTheDaysInAWeekRange = () => {
  const dates = [];
  const startDate = new Date();
  const endDate = addDays(new Date(), 6);

  const date = new Date(startDate.getTime());

  while (date <= endDate) {
    // dates.push(new Date(date));
    let thisDate = new Date(date);
    dates.push({
      dayOfMonth: format(thisDate, "d"),
      dayOfWeek: format(thisDate, "E"),
      month: format(thisDate, "MMM"),
      timeOfDay: format(thisDate, "hh:mm a"),
      rawDate: thisDate,
    });
    date.setDate(date.getDate() + 1);
  }
  return dates;
};
