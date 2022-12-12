// This function runs after the rendering of all the elements in the html of the browser.
$(document).ready(function () {
  // Statement of ordinals after currentDay in the header.
  let ordinal;
  switch (now.format("D")) {
    case "1":
      ordinal = "st";
      break;
    case "2":
      ordinal = "nd";
      break;
    case "3":
      ordinal = "rd";
      break;
    default:
      ordinal = "th";
      break;
  }
  // Displays the current date in the header of the page.
  $("#currentDay").html(
    now.format("dddd") +
      ", " +
      now.format("MMMM") +
      " " +
      now.format("D") +
      ordinal
  );
  // For loop to call the functions that set the color, add an event listener, and load the input that has been saved.
  for (let i = 0; i < hourArray.length; i++) {
    setColor(hourArray[i]);
    addListener(hourArray[i]);
    loadData(hourArray[i]);
  }
});
// Gets today's date with Day.js.
let now = dayjs();
//  Returns the hour (Does not have to be 9am-5pm[17]) of a date.
let curHour = now.hour();

// Array of times of day by hour (24hr).
const hourArray = [9, 10, 11, 12, 13, 14, 15, 16, 17];

// Sets the class (past, present, future) of the hour entries of the day planner which in turn sets the color of the entries.
const setColor = function (hour) {
  let hourEl = "#hour-" + hour;
  // Removes the past, present, and future classes.
  $(hourEl).removeClass("past").removeClass("present").removeClass("future");
  // Compares the id to the current hour and applies corresponding class.
  if (hour < curHour) {
    $(hourEl).addClass("past");
  } else if (hour === curHour) {
    $(hourEl).addClass("present");
  } else {
    $(hourEl).addClass("future");
  }
};
// This function stores the value of corresponding text areas in local storage.
const save = function () {
  // `this` is the element you click on.
  const parentEl = this.parentElement;
  const textEl = $(parentEl).children("textarea")[0];
  const value = textEl.value;
  localStorage.setItem(parentEl.id, value);
};
// A listener for click events on the save button.
const addListener = function (hour) {
  let hourEl = "#hour-" + hour;
  $(hourEl).children("button").on("click", save);
};
// This function retrieves user input stored in localStorage, and sets the value of the corresponding textarea for the hour.
const loadData = function (hour) {
  let hourEl = "#hour-" + hour;
  const textEl = $(hourEl).children("textarea")[0];
  textEl.value = localStorage.getItem("hour-" + hour);
};
