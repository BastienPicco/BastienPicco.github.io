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
  
          genre.artistes.forEach(function(interprete) {
            const interpreteItem = document.createElement('div');
            interpreteItem.classList.add('accordion-item');
  
            const interpreteHeader = document.createElement('button');
            interpreteHeader.classList.add('accordion-header');
            interpreteHeader.textContent = interprete.nom;
  
            const interpreteContent = document.createElement('div');
            interpreteContent.classList.add('accordion-content');
  
            interprete.chansons.forEach(function(chanson) {
              const chansonItem = document.createElement('li');
              const chansonLink = document.createElement('a');
              chansonLink.textContent = chanson.nom;
              chansonLink.href = chanson.lien_youtube;
              chansonLink.target = '_blank'; // Ouvrir le lien dans un nouvel onglet
  
              chansonItem.appendChild(chansonLink);
              interpreteContent.appendChild(chansonItem);
            });
  
            interpreteItem.appendChild(interpreteHeader);
            interpreteItem.appendChild(interpreteContent);
            genreContent.appendChild(interpreteItem);
          });
  
          genreItem.appendChild(genreHeader);
          genreItem.appendChild(genreContent);
          accordion.appendChild(genreItem);
        });
      })
      .catch(error => console.log(error));
  });
  