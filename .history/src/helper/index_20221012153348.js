import { format, isFuture } from "date-fns";

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

  const timesOfTheDay = [];
  const startDayTime = isFuture(date)
    ? isFutureDateStartTime
    : isPresentDateStartTime;
  const endDayTime = new Date(date.setHours(19, 0, 0, 0));

  const time = new Date(startDayTime.getTime());

  while (time <= endDayTime) {
    let thisTime = new Date(time);
    timesOfTheDay.push({
      time: format(thisTime, "hh:mm a"),
      date: thisTime,
    });

    const thirtyMinutesInMilliSecond = 30 * 60 * 1000;
    time.setTime(time.getTime() + thirtyMinutesInMilliSecond);
  }
  console.log("This is the working date:", timesOfTheDay);
  return timesOfTheDay;
};
