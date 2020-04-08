

let apiKey = "5cbe6e873de95c5af519b73bf4970bd2";

$(document).ready(function(){
    var history = JSON.parse(localStorage.getItem("history")) || [];
    if(history.length > 0){
        var lastCityAdded = history[history.length -1];
        getWeather(lastCityAdded);

        for(i=0; i < history.length; i++){
            makeHistoryLi(history[i]);
        }
    }

    $("#history").on("click", "li", function() {
        var liValue = $(this).text();
        getWeather(liValue);
      });
    
    $('#mainWeatherContents').hide();
    //localstore.removeItem("history")
    $("#btnClear").click(function(){
        console.log(history);
    history.pop()
    localStorage.setItem("history", JSON.stringify(history));
    console.log(history);
    location.reload();
    });

    $("#btnSearch").click(function(){
        
        // get city name
        let cityName  = $('#cityName').val();
        //call api and pass city
        getWeather(cityName);
        

    });

    function getWeather(cityName){
        let queryString = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`
        $.ajax({
            type: "GET",
            url: queryString,
            dataType: "json",
            success: function(data){
                unHideContents();
               
                storeInLocationStorage(cityName);
                
                console.log(data);
                var img = $("<img>").attr("src", "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png");
                $('#city').text(`${data.name} (${new Date().toLocaleDateString()})`).append(img);
                $('#country').text(`Country: ${data.sys.country}`);
                $('#temp').text(`Temperature: ${data.main.temp} F`);
                $('#description').text(`Forecast Description: ${data.weather[0].description}`);
                $('#hum').text(`Humidity: ${data.main.humidity}`);
                $('#speed').text(`WindSpeed: ${data.wind.speed}`);
               getUVIndex(data.coord.lat, data.coord.lon);
               getForecast(cityName);
               
            }
        })
    
    
    }
    
    function getUVIndex(lat, lon){
        let queryString = `http://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${lat}&lon=${lon}`
        $.ajax({
            type: "GET",
            url: queryString,
            dataType: "json",
            success: function(data){
    
               console.log(data)
               
               if(data.value < 3){
                let span = $('<span>').text(data.value).addClass('btn btn-sm btn-success');
                $("#uvIndex").text("Uv Index: ").append(span)
               } else if(data.value < 7){
                let span = $('<span>').text(data.value).addClass('btn btn-sm btn-warning');
                $("#uvIndex").text("Uv Index: ").append(span)
               } else {
                let span = $('<span>').text(data.value).addClass('btn btn-sm btn-danger');
                $("#uvIndex").text("Uv Index: ").append(span)
               }
               
            }
        })
    
    
    }
    
    
    function getForecast(cityName){
        let queryString = `http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=imperial`
        $.ajax({
            type: "GET",
            url: queryString,
            dataType: "json",
            success: function(data){
    
               console.log(data)
               //day one iformation
               $('#day1Title').text(new Date(data.list[0].dt_txt).toLocaleDateString());
               $("#day1Image").attr("src", "http://openweathermap.org/img/w/" + data.list[0].weather[0].icon + ".png");
               $('#day1Temp').text("Temp: " + data.list[0].main.temp_max + " °F");
               $('#day1Hum').text("Humidity: " + data.list[0].main.humidity + "%");
              console.log(data)
               //day2
               $('#day2Title').text(new Date(data.list[7].dt_txt).toLocaleDateString());
               $("#day2Image").attr("src", "http://openweathermap.org/img/w/" + data.list[7].weather[0].icon + ".png");
               $('#day2Temp').text("Temp: " + data.list[7].main.temp_max + " °F");
               $('#day2Hum').text("Humidity: " + data.list[7].main.humidity + "%");
               console.log(data);
               //day3
               $('#day3Title').text(new Date(data.list[15].dt_txt).toLocaleDateString());
               $("#day3Image").attr("src", "http://openweathermap.org/img/w/" + data.list[15].weather[0].icon + ".png");
               $('#day3Temp').text("Temp: " + data.list[15].main.temp_max + " °F");
               $('#day3Hum').text("Humidity: " + data.list[15].main.humidity + "%");
    
               //day4
               $('#day4Title').text(new Date(data.list[23].dt_txt).toLocaleDateString());
               $("#day4Image").attr("src", "http://openweathermap.org/img/w/" + data.list[23].weather[0].icon + ".png");
               $('#day4Temp').text("Temp: " + data.list[23].main.temp_max + " °F");
               $('#day4Hum').text("Humidity: " + data.list[23].main.humidity + "%");
               //day5
               $('#day5Title').text(new Date(data.list[31].dt_txt).toLocaleDateString());
               $("#day5Image").attr("src", "http://openweathermap.org/img/w/" + data.list[31].weather[0].icon + ".png");
               $('#day5Temp').text("Temp: " + data.list[31].main.temp_max + " °F");
               $('#day5Hum').text("Humidity: " + data.list[31].main.humidity + "%");
                //day6
                $('#day6Title').text(new Date(data.list[39].dt_txt).toLocaleDateString());
               $("#day6Image").attr("src", "http://openweathermap.org/img/w/" + data.list[39].weather[0].icon + ".png");
               $('#day6Temp').text("Temp: " + data.list[39].main.temp_max + " °F");
               $('#day6Hum').text("Humidity: " + data.list[39].main.humidity + "%");
    
                
    
            }
        })
    
    
    }
    
    function unHideContents(){
        $('#mainWeatherContents').show()
    }
    
    
    function makeHistoryLi(cityName) {
        var li = $("<li>").addClass("list-group-item list-group-item-action").text(cityName);
        $("#history").append(li);
      }
    
    
      function storeInLocationStorage(cityName){
        var isCityFound = false;
        for(i=0; i < history.length; i++){
            if(history[i] === cityName){
                isCityFound = true;
            }
        }
    
          if(isCityFound === false){
    
            history.push(cityName);
            localStorage.setItem("history", JSON.stringify(history));
            makeHistoryLi(cityName);
    
          }
      }
    




});



