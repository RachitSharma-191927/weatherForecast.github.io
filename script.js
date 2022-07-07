let bt = document.querySelector("#searchBt");
let locations = document.querySelector(".search_bar");

let access_keys = {
  1: "pk.eyJ1IjoicmFjaGl0c2hhcm1hcmFzaHIiLCJhIjoiY2t1bGtudnJ6MWg0aTJvb3o0cGZkaG5iYSJ9._WOT_slnuT6NEwgoqYRKBA",
  2: "30f21061e561c353afd1830e2d827939",
};

const datarequest = async (datas, ur) => {
  var url = new URL(ur);
  for (let k in datas) {
    url.searchParams.append(k, datas[k]);
  }
  const res = await fetch(url);
  const data = await res.json();
  return data;
};

const firstfunction = async () => {
  erase();
  var datas = {
    access_token: access_keys[1],
  };

  var data = await datarequest(
    datas,
    `https://api.mapbox.com/geocoding/v5/mapbox.places/Delhi.json`
  );

  var datas = {
    lat: data.features[0].geometry.coordinates[1],
    lon: data.features[0].geometry.coordinates[0],
    appid: access_keys[2],
    units: "metric",
  };

  var data2 = await datarequest(
    datas,
    "https://api.openweathermap.org/data/2.5/weather"
  );

  adddata(data2, "Delhi");
};

bt.addEventListener("click", async () => {
  erase();
  var datas = {
    access_token: access_keys[1],
  };

  var data = await datarequest(
    datas,
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${locations.value}.json`
  );

  var datas = {
    lat: data.features[0].geometry.coordinates[1],
    lon: data.features[0].geometry.coordinates[0],
    appid: access_keys[2],
    units: "metric",
  };

  var data2 = await datarequest(
    datas,
    "https://api.openweathermap.org/data/2.5/weather"
  );

  adddata(data2, locations.value);
});

function erase() {
  document.querySelector("#cty").innerHTML = " ";
  document.querySelector("#tmp").innerHTML = " ";
  document.querySelector(".description").innerHTML = " ";
  document.querySelector("#hmd").innerHTML = " ";
  document.querySelector("#wnd").innerHTML = " ";
}

function adddata(value, city) {
  document.querySelector("#cty").innerHTML = city;
  document.querySelector("#tmp").innerHTML = value.main.temp
    .toString()
    .toUpperCase();
  document.querySelector(".description").innerHTML =
    value.weather[0].description.toString().toUpperCase();
  document.querySelector("#hmd").innerHTML = value.main.humidity;
  document.querySelector("#wnd").innerHTML = value.wind.speed;
}

firstfunction();
