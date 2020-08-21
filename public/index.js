
document.addEventListener("DOMContentLoaded", ()=> {
  fetch("/api2")
  .then(function (res) {
    console.log(res);
    return res.json();
  })
  .then(function (rest) {
    console.log(rest);
    document.getElementById("zarasa").innerHTML =
      rest.location + rest.temperature + rest.weather + rest.image;
  });

});



