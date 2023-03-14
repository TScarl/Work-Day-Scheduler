$(document).ready(function() {var now;

setInterval(function () {
  var now = dayjs().format("D MMM, YYYY h:mm;ss A");
  $("#currentDay").text(now);
}, 1000);

$(function () {
  $(".time-block").each(function() {
    var currentHour = dayjs().hour();
    var blockHour = parseInt($(this).attr("id").split("-")[1]);
    if (blockHour < currentHour) {
      $(this).addClass("past");
     } else if (blockHour === currentHour) {
      $(this).addClass("present");
      } else {
      $(this).addClass("future")
    }
  });
});


$(document).ready(function() {//document.ready is a function which is called when the browser is loaded, it keeps the textarea data there after refreshing
  var hourData = JSON.parse(localStorage.getItem("hourData")) || {};//this retrieves or creates a key named hourData

  $(".hour").each(function () {//loops through each element with class "hour"
    var hourId = $(this).attr("id");//stores the id of the current hourId (hour-9,10,11,etc.)being looped through
    var hourInputs = hourData[hourId] || {};//retrieves the textarea/hour input and puts it into the correct textarea

    $(this).find(".description").each(function () {//finds each element with class ".description" and loops through them
      var descriptionId = $(this).attr("id");//finds the specific id's for each description class
      var savedInputValue = hourInputs[descriptionId];//makes the hour and description both values for the saved key
      if (savedInputValue) {
        $(this).val(savedInputValue)//checks if there is a saved value, and fills the textarea if there is
      }
    });
  });

  $(".saveBtn").on("click", function (event) {//makes saveBtn send and retrieve data from localStorage
    console.log("You saved your schedule!")
    var inputEl = $(this).siblings(".description");//retrieves input from all elements with class "".description"
    var inputValue = inputEl.val();//creates variable for the value of the hourid and its associated textarea
    var hour = $(this).closest(".hour");//finds the closest element with a class of ".hour" to this .description class
    var hourId = hour.attr("id");//creates variable to create individual hour-id's


    var hourData = JSON.parse(localStorage.getItem("hourData")) || {};//creates the localStorage key and retrieves it or creates a new array

    if (!hourData[hourId]) {//if no array key named "hourid" specific for an id, creates a new array for it
      hourData[hourId] = {};
    }
    hourData[hourId][inputEl.attr("id")] = inputValue;//sets key and value, e.g. key = hourData, value = inputValue (hourId + id of input/description input)
    localStorage.setItem("hourData", JSON.stringify(hourData));//retrieves/stringifies data from localStorage
  });
});


//pseudo code:
//create time blocks from 9am-5pm, set them to change color based upon current time (past, present, future)
//how...dayjs... compare id (with time) to the current time and set to hour id's
//style the page differently
});