var Weather = {

  url: "http://api.openweathermap.org/data/2.5/weather?",

  submit: function() {
    if (U.find("#city").value) {
      Weather.findByCity(U.find("#city").value);
    } else if (U.find("#zip").value) {
      Weather.findByZip(U.find("#zip").value);
    } else {
      alert("Please enter a city or zip");
    }
  },

  findByCity: function(city) {
    var url = this.url;
    http.request({
      type: 'GET',
      url: url + 'q=' + city + '&APPID=' + keys.OWM,
      callback: function(response) {
        console.log(response);
        Weather.showData(response);
      }
    });
  },

  findByZip: function(zip) {
    var url = this.url;
    http.request({
      type: 'GET',
      url: url + 'zip=' + zip + '&APPID=' + keys.OWM,
      callback: function(response) {
        console.log(response);
        Weather.showData(response);
      }
    });
  },

  showData: function(data) {
    var display = U.find("#weather_output");
    var city = data.name;
    var temp = data.main.temp;
    var weather = "";
    var weather_raw = data.weather.forEach(function(each) {
      weather += (each.description + " ");
    });
    display.textContent = (city + " " + temp + " " + weather);
  }
}

var Post = {

	submit: function() {
		var url = this.url;
		if (U.find("#http_text").value) {
			http.request({
				type: 'POST',
				url: "http://httpbin.org/post?data=" + U.find("#http_text").value,
				header: {
					head: "Content-Type",
					value: "application/json"
				},
				data: U.find("#http_text").value,
				callback: function(response) {
					var display = U.find("#http_output");
					console.log(response);
					display.textContent = response.data;
				}
			});
		} else {
			alert("Please provide some text to send to the server");
		}
	}
}

// adding our event listeners
U.find("#weather_submit").addEventListener("click", Weather.submit);
U.find("#http_submit").addEventListener("click", Post.submit);
