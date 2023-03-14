$(document).ready(function () {//makes JS wait for HTML and CSS elements to load before applying JS

  var now;//allows the time to display onto header

  setInterval(function () {//setInterval keeps the time ticking along
    var now = dayjs().format("D MMM, YYYY h:mm;ss A");//sets the time to be the exact time now and formats how to display the time
    $("#currentDay").text(now);//applies the text of the time to header
  }, 1000);//tells the function that 1 second is 1000 miliseconds

  $(function () {
    $(".time-block").each(function () {//function loops through each element with class of time-block
      var currentHour = dayjs().hour();//converts the time from dayjs() into its hourly components (from 0-23)
      var blockHour = parseInt($(this).attr("id").split("-")[1]);//blockHour represents the numerical value within the id's (hour-9, hour-10, etc.) within the class time-block
      if (blockHour < currentHour) {//if the blockHour (9,10,11,12,etc) is less than the currentHour it is assigned the past class
        $(this).addClass("past");
      } else if (blockHour === currentHour) {//if blockHour is same as currentHour it is in class present
        $(this).addClass("present");
      } else {                     //if blockHour isn't in the past or present it's assigned the future class
        $(this).addClass("future")
      }
    });
  });

  $(document).ready(function () {//document.ready is a function which is called when the browser is loaded, it keeps the textarea data there after refreshing
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
});
