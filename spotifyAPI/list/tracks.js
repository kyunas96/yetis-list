function getTracksForList(data) {
  const tracks = data.body.tracks.items;
  return tracks.map(track => getListInfoForTrack(track))
}

function getListInfoForTrack(track){
  let trackInfo = {};
  trackInfo.name = getTitle(track);
  trackInfo.artist = getArtist(track);
  trackInfo.album = getAlbum(track);
  trackInfo.albumLink = getAlbumArtwork(track);
  trackInfo.id = getTrackId(track)
  return trackInfo;
}

function getTitle(track) {
  return track.name
}

function getArtist(track){
 return track.artists.map((artist) => artist.name);
}

function getAlbum(track){
  return track.album.name
}

function getTrackId(track){
  return track.id
}

function getAlbumArtwork(track) {
  let albumArtwork = track.album.images.map(artwork => artwork.url)

  return {
    large: albumArtwork[0] || null,
    medium: albumArtwork[1] || null,
    small: albumArtwork[2] || null,
    hasArtwork: albumArtwork.length > 0
  }
}

module.exports = {
  getTracksForList
}