// Configuration Firebase
const firebaseConfig = {
  apiKey: "TON_API_KEY",
  authDomain: "ton-projet.firebaseapp.com",
  projectId: "ton-projet",
};
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const storage = firebase.storage();

function seConnecter() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      alert("Connecté ! 🎉");
      document.getElementById("auth").style.display = "none";
      document.getElementById("drive").style.display = "block";
    })
    .catch((error) => {
      alert("Erreur : " + error.message);
    });
}

function telechargerFichier() {
  const fileInput = document.getElementById("fichier");
  const file = fileInput.files[0];

  if (!file) {
    alert("Veuillez sélectionner un fichier !");
    return;
  }

  const storageRef = storage.ref().child("uploads/" + file.name);
  storageRef.put(file).then((snapshot) => {
    console.log("Fichier uploadé !", snapshot);
    afficherFichiers();
  });
}

function afficherFichiers() {
  const liste = document.getElementById("listeFichiers");
  liste.innerHTML = "";

  const storageRef = storage.ref().child("uploads/");
  storageRef.listAll().then((res) => {
    res.items.forEach((item) => {
      item.getMetadata().then((metadata) => {
        const li = document.createElement("li");
        li.textContent = item.name;
        liste.appendChild(li);
      });
    });
  });
}
