document.addEventListener('DOMContentLoaded', function() {
  fetch('musiques.yaml')
    .then(response => response.text())
    .then(yamlText => {
      const musiques = jsyaml.load(yamlText);
      const accordion = document.querySelector('.accordion');

      musiques.musiques.forEach(function(genre) {
        const genreItem = document.createElement('div');
        genreItem.classList.add('accordion-item');

        const genreHeader = document.createElement('button');
        genreHeader.classList.add('accordion-header');
        genreHeader.textContent = genre.genre;

        const genreContent = document.createElement('div');
        genreContent.classList.add('accordion-content');

        genreItem.appendChild(genreHeader);
        genreItem.appendChild(genreContent);
        accordion.appendChild(genreItem);

        genreHeader.addEventListener('click', function() {
          const siblings = Array.from(genreItem.parentNode.children).filter(child => child !== genreItem);

          // Fermer les listes des autres genres
          siblings.forEach(sibling => {
            sibling.querySelector('.accordion-content').classList.remove('active');
          });

          // Ouvrir ou fermer la liste du genre actuel
          genreContent.classList.toggle('active');
        });

        genre.artistes.forEach(function(interprete) {
          const interpreteItem = document.createElement('div');
          interpreteItem.classList.add('accordion-item');

          const interpreteHeader = document.createElement('button');
          interpreteHeader.classList.add('accordion-header');
          interpreteHeader.textContent = interprete.nom;

          const interpreteContent = document.createElement('div');
          interpreteContent.classList.add('accordion-content');

          interpreteItem.appendChild(interpreteHeader);
          interpreteItem.appendChild(interpreteContent);
          genreContent.appendChild(interpreteItem);

          interpreteHeader.addEventListener('click', function() {
            const siblings = Array.from(interpreteItem.parentNode.children).filter(child => child !== interpreteItem);

            // Fermer les listes des autres artistes
            siblings.forEach(sibling => {
              sibling.querySelector('.accordion-content').classList.remove('active');
            });

            // Ouvrir ou fermer la liste de l'artiste actuel
            interpreteContent.classList.toggle('active');
          });

          interprete.chansons.forEach(function(chanson) {
            const chansonItem = document.createElement('li');
            const chansonLink = document.createElement('a');
            chansonLink.href = chanson.lien_youtube;
            chansonLink.target = '_blank'; // Ouvrir le lien dans un nouvel onglet
            chansonLink.textContent = chanson.nom; // Définition du texte du lien
          
            chansonItem.appendChild(chansonLink); // Ajout du lien à l'élément li
            interpreteContent.appendChild(chansonItem); // Ajout de l'élément li à la liste des chansons
          });
        });
      });
    })
    .catch(error => console.log(error));
});
