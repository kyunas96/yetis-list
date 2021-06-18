function findMatches(value, data){
  let matches = data.body.genres.filter(genre => genre.includes(value));
  matches = sortByLength(matches);
  matches = matches.map(match => (
    {
      name: match,
      image: {
        hasArtwork: false
      }
    }
  ))
  return matches;
}

function sortByLength(array) {
  return array.sort((x, y) => x.length - y.length);
}

module.exports = {
  findMatches
};