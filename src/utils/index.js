export const getDateAndTime = value => {
  const currentDate = new Date(value);

  const date = pad(currentDate.getDate());
  const month = pad(currentDate.getMonth() + 1);
  const year = currentDate.getFullYear();

  const hour = pad(currentDate.getHours());
  const minute = pad(currentDate.getMinutes());

  return date + "-" + month + "-" + year + " " + hour + ":" + minute;
};

export const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

function pad(n) {
  return n < 10 ? "0" + n : n;
}
