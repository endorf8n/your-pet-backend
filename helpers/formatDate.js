const countPetAge = (targetDate) => {
  const currentDate = new Date();
  const differenceInMilliseconds = currentDate - targetDate;
  const millisecondsPerYear = 1000 * 60 * 60 * 24 * 365.25;
  const differenceInYears = Math.ceil(
    differenceInMilliseconds / millisecondsPerYear
  );
  return differenceInYears;
};

const formattedDate = (dateFromBackend) => {
  const date = new Date(dateFromBackend);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const formattedDate = `${day.toString().padStart(2, "0")}.${month
    .toString()
    .padStart(2, "0")}.${year}`;

  return formattedDate;
};

const normalizedDate = (dateFromFront) => {
  const parts = dateFromFront.split("-");
  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1;
  const year = parseInt(parts[2], 10);
  const targetDate = new Date(year, month, day);
  return targetDate;
}

module.exports = {countPetAge, formattedDate, normalizedDate};
