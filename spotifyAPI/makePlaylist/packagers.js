function packageSeeds(seed_tracks, seed_artists, seed_albums){
  return{
    seed_tracks: seed_tracks,
    seed_artists: seed_artists,
    seed_albums: seed_albums
  }
}

function packageSongsForQuery(songs){

}

function packageArtistsForQuery(artists){

}

function packageAlbumForQuery(albums){

}

function packageOptions(options){

}

function packageRecommendationsObject(seeds, options){

}

module.exports = {
  packagePlaylistQuery,
  packageSongsForQuery,
  packageArtistsForQuery,
  packageAlbumForQuery
}