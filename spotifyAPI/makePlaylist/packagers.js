 function packageQueryObject(data) {
  let seed_artists = [];
  let seed_genres = [];
  let seed_tracks = [];
  data.seeds.forEach((seed) => {
    switch (seed.type) {
      case "artist":
        seed_artists.push(seed.value);
    }
  });

  return {
    ...data.options,
    seed_artists,
    seed_genres,
    seed_tracks
  }
}

module.exports = packageQueryObject;