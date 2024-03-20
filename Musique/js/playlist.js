var obtenirTitreVideo; // Méthode pour obtenir le titre d'une vidéo

fetch('musiques.yaml')
    .then(response => response.text())
    .then(yamlText => {
      // Convertir le texte YAML en objet JavaScript
      var data = jsyaml.load(yamlText);
      
      // Maintenant que vous avez chargé les données YAML, vous pouvez utiliser la fonction obtenirTitreVideo
      obtenirTitreVideo = function obtenirTitreVideo(videoId) {
        // Parcourir les données YAML pour trouver le titre correspondant à l'ID
        for (var i = 0; i < data.musics.length; i++) {
          var genre = data.musics[i];
          var artists = genre.artists;
          for (var j = 0; j < artists.length; j++) {
            var songs = artists[j].songs;
            for (var k = 0; k < songs.length; k++) {
              if (songs[k].youtube_link.includes(videoId)) {
                return songs[k].title; // Retourner le titre de la vidéo correspondante
              }
            }
          }
        }
        return null; // Retourner null si aucune correspondance n'est trouvée
      }
    })
    .catch(error => console.error('Erreur de chargement du fichier YAML :', error));



// Fonction pour mettre à jour la représentation visuelle de la playlist
function mettreAJourPlaylistVisuelle() {
  var playlistContentElement = document.getElementById('playlist');
  playlistContentElement.innerHTML = ''; // Effacer le contenu actuel de la playlist

  // Ajouter chaque titre de vidéo à la playlist
  playlist.forEach(function(videoId) {
    var titreVideo = obtenirTitreVideo(videoId); // Fonction à définir pour obtenir le titre de la vidéo
    if (titreVideo) {
      var listItem = document.createElement('div');
      listItem.classList.add('playlist-item');
      listItem.textContent = titreVideo;
      playlistContentElement.appendChild(listItem);
    }
  });
}

// Ajouter un gestionnaire d'événement pour supprimer un élément de la playlist en cliquant dessus
document.querySelector('.playlist').addEventListener('click', function(event) {
  if (event.target.classList.contains('playlist-item')) {
    const index = Array.from(event.target.parentNode.children).indexOf(event.target);
    event.target.remove();
    playlist.splice(index, 1);
  }
});
