function playlistToJSON(data){
  const items = data.body.tracks;
  return {
    items: items.map(item => itemToJSON(item)),
    seeds: getSeeds(data.body.seeds)
  }
}

function itemToJSON(item){
  let itemInfo = {};
  itemInfo.name = getName(item)
  itemInfo.artists = getArtists(item);
  itemInfo.image = getAlbumArtwork(item)
  itemInfo.id = getID(item)

  return itemInfo;
}

function getID(item){
  return item.id
}

function getName(item){
  return item.name
}

function getSeeds(item){
  return item.map(seed => (
    {
      type: seed.type,
      id: seed.id
    }
  ))
}

function getArtists(item){
  return item.artists.map(artist => (
    artist.name
  ))
}

function getAlbumArtwork(item){
  let albumArtwork = item.album.images.map(image => image.url);
  return {
    large: albumArtwork[0] || null,
    medium: albumArtwork[1] || null,
    small: albumArtwork[2] || null,
    hasArtwork: albumArtwork.length > 0,
  };
}


module.exports = {
  playlistToJSON
}