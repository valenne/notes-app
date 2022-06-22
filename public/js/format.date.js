/* ----- format a date to dayweek, daynumber, month, year, hour  ----- */
const formatDate = (date) => {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
  }).format(date);
};

const formatDateDMY = (date) => {
  return new Intl.DateTimeFormat("zh", {
    dateStyle: "short",
  }).format(date);
};

const formatDateShort = (date) => {
  return new Intl.DateTimeFormat("zh", {
    dateStyle: "short",
  }).format(date);
};

module.exports = { formatDate, formatDateDMY };
