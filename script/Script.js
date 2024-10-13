// Texte d'accueil dynamique
const text = "Bienvenue à la Bibliothèque en ligne";
const paragraph = "Accédez à vos documents sauvegardés, ajoutez de nouveaux livres et gérez vos fichiers en toute simplicité.";

const dynamicText = document.getElementById("dynamicText");
const dynamicPara = document.getElementById("dynamicPara");

let index = 0;
let paraIndex = 0;

function typeText() {
    if (index < text.length) {
        dynamicText.innerHTML += text.charAt(index);
        index++;
        setTimeout(typeText, 50);  // Vitesse de frappe
    } else if (paraIndex < paragraph.length) {
        typeParagraph();
    }
}

function typeParagraph() {
    if (paraIndex < paragraph.length) {
        dynamicPara.innerHTML += paragraph.charAt(paraIndex);
        paraIndex++;
        setTimeout(typeParagraph, 30);  // Vitesse de frappe
    }
}

window.onload = function() {
    setTimeout(typeText, 100);  // Animation du texte
};

// Gestion des boutons pour rediriger vers une autre page
const loginBtn = document.getElementById('loginBtn');
const signupBtn = document.getElementById('signupBtn');

loginBtn.addEventListener('click', function() {
    window.location.href = 'login.html';  // Redirection vers la page de connexion
});

signupBtn.addEventListener('click', function() {
    window.location.href = 'signup.html';  // Redirection vers la page d'inscription
});


