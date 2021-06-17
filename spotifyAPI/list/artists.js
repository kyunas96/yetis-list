function getArtistsForList(data){
  const artists = data.artists.items;
  return artists.map(artist => getListInfoForArtist(artist))
}

function getListInfoForArtist(data){
  let artistInfo = {};
  artistInfo.name = getArtist(data)
  artistInfo.image = getPortrait(data);
  artistInfo.id = getArtistId(data);
  return artistInfo;
}

function getArtist(data){
  return data.name
}

function getArtistId(data){
  return data.id
}

function getPortrait(data){
  let artistPortrait = [];

  data.images.forEach(image => {
    artistPortrait.push(image.url)
  })

  return {
    large: artistPortrait[0] || null,
    medium: artistPortrait[1] || null,
    small: artistPortrait[2] || null,
    hasPortrait: artistPortrait.length > 0
  }
}

module.exports = {
  getArtistsForList
}