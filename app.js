// récupérer les éléments du DOM (html)
// récupérer les ionicons que l'on avait rajouté avant pour les utiliser et régéner automatiquement dans les diff coeurs fonction de combien il nous restent de vie.
// intégrer plusieurs dégradés suivant la positions proche ou éloigné
// Element du DOM
const divVies = document.querySelector('.vies');
// déclarer une variable avec const...querySelector permet de récupérer un élément de div ici <div class="vies">
const message = document.getElementById('message');
const formulaire = document.getElementById('saisie');
const input = document.getElementById('nombre');
const essayerBtn = document.getElementById('essayerBtn');
const rejouerbtn = document.getElementById('rejouer');
const body = document.getElementsByTagName('body');
// changer le dégradé du body..qui est le tag appelé qui est body et comme il y a qu'un seul entre croché mettre 0

// MEDELE DE COEUR
const coeurVide = '<ion-icon name="heart-outline"></ion-icon>';
const coeurPlein = '<ion-icon name="heart"></ion-icon>';
// copier sur dom les icones de coeurs vide et pleins et venir les coller ici

// FOND POUR LES POSITIONS PROCHE DU RESULTAT OU ELOIGNE 
const froid = 'linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)';
// déclarer une variable pour un fond désignant si proche ou éloigné de l'objectif
const tiede = 'linear-gradient(to top, #fbc2eb 0%, #a6c1ee 100%)';
const chaud = 'background-image: linear-gradient(120deg, #f6d365 0%, #fda085 100%)';
const brulant = 'background-image: linear-gradient(to right, #ff8177 0%, #ff867a 0%, #ff8c7f 21%, #f99185 52%, #cf556c 78%, #b12a5b 100%)';
const gagant = 'background-image: linear-gradient(to right, #f83600 0%, #f9d423 100%)';
// il y a un fond pour désigner s'il y a gagant 
const perdant = 'background-image: linear-gradient(to top, #f43b47 0%, #453a94 100%)';
// il y a un fond pour désigner s'il y a perdant 

// PLAY
const jouer = () => {
    // nombre aleatoire
    let nbreSaisie = [];
    // comment générer un nombre aléatoire
    // créer une variable math est une fonction qui va générer un nombre aléatoire entre 0 et 1 attention 1 est exclus.
    // Math.floor arrondit à la valeur inférieur et on peut avoir un chiffre entre 0 et 100
    const nbreAleatoire = Math.floor(Math.random() * 101);
   
    //une variable pour définir le nombre de vie 
    const totalVies = 6;
    // simulation de jeu il reste 4 vies remplacer totalVies par 4 
    // let vies = 4
   
    // mettre une variable vies qui correspond au nombre de vies de début du jeu déclarer avec "let" car elle changera pendant l'évolution du jeu
    let vies = totalVies;
    console.log(nbreAleatoire);
    
    // Actualisation à chaque essai - TOUTE LA LOGIQUE
    // Récupérer le formulaire dans le HTML et (addEventListener) quelque chose qui va se déclencher à une certaine action
    // "e" c'est l'élément en lui même dans lequel se déroule l'événement
    formulaire.addEventListener('submit', (e) => {
        // empêcher l'envoi d'un formulaire pour éviter un rechargement de la page qui va entrainer l'abandon du jeu
        e.preventDefault();
        // convertir 
        const valeurInput = parseInt(input.value);

        // return signifie on arrête tout si ça ne rentre pas dans les valeurs voulu
        if(valeurInput < 0 || valeurInput > 100) return;
        
        // si gagnant changer le style du fond d'écran
        if(valeurInput === nbreAleatoire){
        body.style.backgroundImage = gagant;            
        message.textContent = `BRAVO !!! Le nombre était bien ${nbreAleatoire}`;
        // on veut rejouer à la base display était sur none cette fois on met sur block pour afficher le jeu
        rejouerbtn.style.display = "block";
        }

        // Valeur de Input sera différent nbreAléatoire
        // false désigne que la valeurInput n'est pas dans le tableau
        // true désigne que la valeurInput est dans le tableau 
        // sinon si la valeurInput et différent de nbreAleatoire et la valeurInput
        else if(valeurInput !== nbreAleatoire && nbreSaisie.includes(valeurInput) == false){
        // système chaud froid
        // on peut écrire if(nbreAleatoire < valeurInput + 3 && nbreAleatoire > valeurInput - 3);
        }
        if(nbreAleatoire <= valeurInput + 2 && nbreAleatoire >= valeurInput - 2){
        body.style.backgroundImage = brulant;
        message.textContent = "C'est brûlant !!! 🔥🔥🔥 ";
        
        } 
        else if (nbreAleatoire <= valeurInput + 5 && nbreAleatoire >= valeurInput - 5){
        body.style.backgroundImage = chaud;
        message.textContent = "C'est chaud !!! 🔥 ";

        } 
        else if (nbreAleatoire <= valeurInput + 10 && nbreAleatoire >= valeurInput - 10){
            body.style.backgroundImage = tiede;
            message.textContent = "C'est tiède !!! 🙂 ";
        
        }
        else{
            body.style.backgroundImage = froid;
            message.textContent = "C'est froid !!! ❄️ ";
        }
        // Pas de bonne réponse on perd une vie
        vies--;
        // on appelle une fonction qui vérifie si on a perdu
        verifyLoose();
    // sinon c'est le cas ou il est déjà dans le tableau
    })
    // else{
    //         // message
    //         console.log("déjà dans le tableau")
    // }

    // nbreSaisie à mette dans le tableau

        // nbreSaisie.push(valeurInput);
        // actualiseCoeurs(vies);


    const verifyLoose = () => {
        if(vies === 0){
            body.style.backgroundImage = perdant;
            body.style.color = '#990000';
            // désactiver le bouton essayerBtn (setAttribute) et 2 paramètres rentre dans cette fonction le nombre(desable) et la valeur 
            essayerBtn.setAttribute("disabled", "");
            message.textContent = `Vous avez perdu. La réponse était $(nbreAleatoire)`;
            // rajouter le bouton rejouer 
            rejouerbtn.style.display = "block";
        }
    }
    const actualiseCoeurs = (vies) => {
        divVies.innerHTML = "";
        let tableauVies = [];
        // pour chaque nombre de vie que l'on a
        for(let i = 0; i < vies; i++){
            // dans tableauVies rajouter un coeurPlein
            tableauVies.push(coeurPlein);
        }
        for(let i = 0; i < totalVies - vies; i++){
            tableauVies.push(coeurVide);
        }
        // pour chaque élément de notre tableau
        tableauVies.forEach(coeur => {
            // rajouter dans notre zone html divVies ....pour chaque coeur il va le rajouter aux autres
            divVies.innerHTML += coeur;

        })
    }
    actualiseCoeurs(vies);
    
    rejouerbtn.addEventListener('click',() => {
        // enlever le message (souci de sécurité)
        message.style.display = 'none';
        // recharger la page dès que le bouton apparaît et que l'on click dessus
        document.location.reload(true);
    })
}

jouer();