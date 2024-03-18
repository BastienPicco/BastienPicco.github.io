// Lorsque l'API youtube est chargée
function onYouTubeIframeAPIReady() {
  console.log("IFrame API ready");
  player = new YT.Player('player', {
      height: '315',
      width: '560',
      videoId: '1UUYjd2rjsE',
      events: {
        'onStateChange': onPlayerStateChange // Écoutez les changements d'état du lecteur
    }
  });

  // Ajoutez un écouteur d'événement pour le bouton de lecture suivante
  var nextButton = document.getElementById('nextButton');
  nextButton.addEventListener('click', function() {
      passerVideoSuivante(); // Passez à la vidéo suivante lorsque le bouton est cliqué
  });
}

// Fonction pour gérer le clic sur un lien de vidéo
function gererClicVideo(event) {
  event.preventDefault(); // Empêcher le comportement par défaut du lien

  var href = event.target.getAttribute('href'); // Obtenir l'URL du lien cliqué
  var videoId = extraireIdVideo(href); // Extraire l'ID de la vidéo à partir de l'URL

  // Ajouter la vidéo à la playlist
  if (videoId) {
      rajouteVideoPlaylist(videoId);
  }
}

// Fonction pour rajouter une vidéo à la playlist
function rajouteVideoPlaylist(videoId) {
  // Vérifiez si la vidéo n'est pas déjà dans la playlist
  if (!playlist.includes(videoId)) {
    playlist.push(videoId); // Ajouter l'ID de la vidéo sélectionnée à la playlist
  }
}

// Fonction pour charger la vidéo YouTube dans le lecteur
function chargerVideoYoutube(videoId) {
  player.loadVideoById(videoId);
}

// Fonction pour extraire l'ID de la vidéo à partir de l'URL YouTube
function extraireIdVideo(url) {
  var regExp = /(?:\/embed\/|v=)([a-zA-Z0-9_-]+)/;
  var matches = url.match(regExp);
  if (matches && matches.length > 1) {
      return matches[1];
  } else {
      return null;
  }
}

// Fonction pour choisir aléatoirement une vidéo parmi les liens disponibles
function choisirVideoAleatoire() {
  var videoLinks = document.querySelectorAll('.video-link');
  var index = Math.floor(Math.random() * videoLinks.length);
  var href = videoLinks[index].getAttribute('href');
  var videoId = extraireIdVideo(href);
  chargerVideoYoutube(videoId);
}

// Écoutez le chargement complet de la page
window.addEventListener('load', function() {
  choisirVideoAleatoire(); // Choisissez aléatoirement une vidéo dès que la page est entièrement chargée
});

// Écoutez la fin de la vidéo en cours
function onPlayerStateChange(event) {
  if (event.data === YT.PlayerState.ENDED) {
      passerVideoSuivante(); // Passez à la vidéo suivante lorsque la vidéo en cours se termine
  }
}

// Fonction pour passer à la vidéo suivante dans la playlist
function passerVideoSuivante() {
  if (playlist.length > 0) {
      var nextVideoId = playlist.shift(); // Retirez le premier élément de la playlist
      chargerVideoYoutube(nextVideoId); // Chargez la prochaine vidéo
  } else {
      choisirVideoAleatoire(); // Si la playlist est vide, on charge une vidéo aléatoirement
  }
}