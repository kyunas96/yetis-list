 function packageQueryObject(data) {
  let properties = formatProperties(data.properties)
  let seed_artists = [];
  let seed_genres = [];
  let seed_tracks = [];
  data.seeds.forEach((seed) => {
    switch (seed.type) {
      case "artist":
        seed_artists.push(seed.value);
      case "track":
        seed_tracks.push(seed.value)
      case "genre":
        seed_genres.push(seed.value)
        
    }
  });

  return {
    seed_artists,
    seed_genres,
    seed_tracks,
  }
}

function formatProperties(properties){
  let ret = {};

  for(const [key, val] of Object.entries(properties)){
    ret[key] = parseInt(val);
  }
}

module.exports = packageQueryObject;