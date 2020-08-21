geoCode();

function geoCode() {
  const url = "https://api.ipify.org?format=json";

  fetch(url)
    .then(function (response) {
      return response;
    })
    .then(function (res) {
      console.log(res);
      return res.json();
    })
    .then(function (rest) {
      console.log(rest);
      const ip = rest.ip;
      let url ="http://ip-api.com/json/"
      fetch(url + ip)
        .then(function (response) {
          return response;
        })
        .then(function (res) {
          return res.json()
        }).then(function (rest){
         console.log(rest)
          const lat = rest.lat;
          const long = rest.lon;
          const location = rest.country + ", " + rest.regionName + ", " + rest.city;
          console.log(location)
          const data = {lat, long, location}
         fetch("/api", {
           method: "POST",
           body: JSON.stringify(data),
           headers:{
             "Content-Type": "application/json"
           }
         })
    
        })
    });
}

