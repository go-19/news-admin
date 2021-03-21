let date = new Date();
let year = date.getFullYear();
let month = date.getMonth() + 1;
let monthDay = date.getDate();

function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    m = checkTime(m);
    return `${h}:${m}`
  }
  function checkTime(i) {
    if (i < 10) {i = "0" + i};
    return i;
  }

module.exports = {
	month,
	monthDay,
	year,
    startTime
}