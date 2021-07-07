function packageQueryObject(data) {
  console.log("data", data);
  let options = formatProperties(data.options);
  let seed_artists = [];
  let seed_genres = [];
  let seed_tracks = [];
  data.seeds.forEach((seed) => {
    let curVal;
    if(seed.hasOwnProperty("id")){
      curVal = seed.id;
    }else if(seed.hasOwnProperty("value")){
      curVal = seed.value;
    }

    console.log(seed)
    switch (seed.type) {
      case "ARTIST":
      case "artist":
        seed_artists.push(curVal);
        break;
      case "TRACK":
      case "track":
        seed_tracks.push(curVal);
        break;
      case "GENRE":
      case "genre":
        seed_genres.push(curVal);
        break;
    }
  });

  const ret = {
    seed_artists,
    seed_genres,
    seed_tracks,
    ...options
  };

  console.log("ret", ret);

  return ret;
}

function formatProperties(properties) {
  let ret = {};

  for (const [key, val] of Object.entries(properties)) {
    if (key === "happiness") {
      ret["min_valence"] = parseFloat(val);
      continue;
    }

    // console.log("val", val)
    const keyToTargetKey = "min_" + key;

    ret[keyToTargetKey] = parseFloat(val);
  }
  return ret;
}

module.exports = packageQueryObject;
