let bt = document.querySelector("#searchBt");
let locations = document.querySelector(".search_bar");

let access_keys = {
  1: "f4d246e55911f558c8073e65b1362bc9",
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

bt.addEventListener("click", async () => {
  erase();
  var datas = {
    access_key: access_keys[1],
    query: `${locations.value}`,
  };

  var data = await datarequest(
    datas,
    "http://api.positionstack.com/v1/forward"
  );

  var datas = {
    lat: data.data[0].latitude,
    lon: data.data[0].longitude,
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
  document.querySelector("#tmp").innerHTML = value.main.temp;
  document.querySelector(".description").innerHTML =
    value.weather[0].description;
  document.querySelector("#hmd").innerHTML = value.main.humidity;
  document.querySelector("#wnd").innerHTML = value.wind.speed;
}
