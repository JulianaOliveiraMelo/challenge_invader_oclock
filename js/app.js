var app = {
  // board: #invader,
  // configForm: form.configuration,
  // currentStyle: class déterminée par un clic sur la palette,
  gridSize: 8,
  pixelSize: 20,
  styles: [
    'plain',
    'empty',
    'light',
    'highlight',
    'bright'
  ],
  init: function() {
    console.log('app init');

    // 0. récupérer les éléments dont on aura besoin souvent
    app.board = document.querySelector('#invader');
    app.configForm = document.querySelector('.configuration');

    // écouteurs d'événement
    app.board.addEventListener('click', app.handlePixelClick);
    app.configForm.addEventListener('submit', app.handleFormSubmit);

    // 1. générer de l'élément
    app.generateBoard();
    
    // 3a. ajouter un formulaire de configuration
    app.generateForm();
    
    app.generatePalette();
  },
  generatePalette: function() {
    // dans le html, rien n'existe déjà
    // 1. créer la pallette en elle-même
    app.palette = document.createElement('div');
    app.palette.className = "palette";

    // la méthode forEach permet de boucler sur un tableau en appelant un callback avec chaque élément du tableau passé en argument, l'un après l'autre
    app.styles.forEach(app.addStyleButton);

    document.body.appendChild(app.palette);
  },
  // le paramètre style va récupérer l'élément du tableau
  addStyleButton: function(style) {

    // on va ajouter un bouton par style
    var styleButton = document.createElement('button');
    // attribuer 2 classes au bouton : la classe palette-color pour tous le style en commun
    // et la classe correspondant à l'élément actuel du tableau app.styles, pour donner une couleur particulière au bouton
    styleButton.className = "palette__color--" + style + " palette__color";

    // style, c'est quand même plus joli et court que app.styles[color]
    styleButton.dataset.style = style;

    // chaque bouton va avoir son écouteur d'événement
    styleButton.addEventListener('click', app.handleStyleClick);

    app.palette.appendChild(styleButton);
  },
  generateForm: function() {
    var gridSizeInput = document.createElement('input');
    gridSizeInput.type = "number";
    gridSizeInput.placeholder = "Taille de la grille";
    gridSizeInput.value = "8";
    gridSizeInput.name = "gridSize";

    var pixelSizeInput = document.createElement('input');
    pixelSizeInput.type = "number";
    pixelSizeInput.placeholder = "Taille des pixels";
    pixelSizeInput.value = "20";
    pixelSizeInput.name = "pixelSize";

    var goButton = document.createElement('button');
    goButton.type = 'submit';
    goButton.textContent = 'Valider';

    app.configForm.appendChild(gridSizeInput);
    app.configForm.appendChild(pixelSizeInput);
    app.configForm.appendChild(goButton);
  },
  generateBoard: function() {
    for (var row = 0; row < app.gridSize; row++) {
      // on génère une ligne à chaque itération
      var rowElement = document.createElement('div');
      rowElement.className = "grid__row";
      app.board.appendChild(rowElement);
      // pour chaque ligne, on génère des pixels
      for (var pixel = 0; pixel < app.gridSize; pixel++) {
        // je crée un pixel
        var pixelElement = document.createElement('div');
        // j'ajoute une classe à ce pixel
        pixelElement.className = "grid__pixel";
        pixelElement.style.width = app.pixelSize + "px";
        pixelElement.style.height = app.pixelSize + "px";

        // plus besoin d'attacher un écouteur par pixel, le plateau écoute les clics et il recevra donc ceux sur les pixels

        // et je l'ajoute à la ligne en cours
        rowElement.appendChild(pixelElement);
      }
    }
  },
  handleFormSubmit: function(event) {
    console.log('envoi du formulaire');
    // on empêche l'envoi du formulaire
    event.preventDefault();
    console.log(event);
    
    // 0. isoler les éléments dont on veut récupérer la valeur
    var form = event.target;
    var gridSizeInput = form.children[0];
    var pixelSizeInput = form.children[1];


    // 1. récupérer la nouvelle taille de grille dans l'input
    var newGridSize = gridSizeInput.value;
    var newPixelSize = pixelSizeInput.value;

    // 2. effacer la grille actuelle
    app.board.textContent = "";

    // si ici, je modifie app.gridSize, je n'aurais plus qu'à exécuter app.generateBoard()
    app.gridSize = parseInt(newGridSize, 10);
    app.pixelSize = parseInt(newPixelSize, 10);
    // 3. redessiner la grille
    app.generateBoard();
  },
  handlePixelClick: function(event) {
    console.log('click');
    //console.log(event);


    
    // info cruciale : le pixel sur lequel on a cliqué se situe dans event.target
    var pixel = event.target;

    // avant toute chose, on retire toutes les classes de couleur
    // en parcourant le tableau des styles
    for (var i = 0; i < app.styles.length; i++) {
      // et en retirant les styles un par un
      pixel.classList.remove("grid__pixel--" + app.styles[i]);

      // il est possible d'écrire pixel.classList.remove(class1, class2, class3 etc.)
      // mais ce n'est pas au programme d'aujourd'hui ;-)
    }
    
    if (app.currentStyle) {
      pixel.classList.add("grid__pixel--" + app.currentStyle);
    }
  },
  handleStyleClick: function(event) {
    console.log('clic sur une couleur');
    console.log(event);

    // je peux récupérer le style du bouton par un heureux hasard
    var clickedButton = event.target;
    // ça me semble très hasard comme méthode mais soit...
    app.currentStyle = clickedButton.dataset.style;

    // rien d'autre à faire, l'essentiel est que j'ai récupéré la couleur à appliquer aux pixels par la suite :-)
  }

};

document.addEventListener('DOMContentLoaded', app.init);