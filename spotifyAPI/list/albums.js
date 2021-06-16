function getAlbumsForList(data){
  const albums = data.albums.items;
  return albums.map(album => getListInfoForAlbum(album))
}

function getListInfoForAlbum(data){
  let albumInfo = {};
  albumInfo.name = getName(data);
  albumInfo.artist = getArtists(data);
  albumInfo.artwork = getAlbumArtwork(data);
  albumInfo.albumId = getAlbumId(data)
  return albumInfo;
}

function getAlbumId(data){
  return data.id
}

function getName(data){
  return data.name
}

function getArtists(data){
  return data.artists.map((artist) => artist.name);
}

function getAlbumArtwork(data){
  let albumArtwork = data.images.map(image => image.url);

  return {
    large: albumArtwork[0] || null,
    medium: albumArtwork[1] || null,
    small: albumArtwork[2] || null,
    hasArtwork: albumArtwork.length > 0,
  };
}

module.exports = {
  getAlbumsForList
}