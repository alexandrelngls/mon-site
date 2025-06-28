// Initialisation de Supabase avec tes clés personnelles
const supabaseUrl = 'https://nqrtrpsommuudwoakgcp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5xcnRycHNvbW11dWR3b2FrZ2NwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTExMzMwODEsImV4cCI6MjA2NjcwOTA4MX0.lS2nRqBAlUdV-B9-5Amjn31p_cO7M0jzj9YZ2_v8b3M'; // ✅ Remplace par **ta** clé d'API Supabase

// Création du client Supabase
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

// Fonction de connexion
async function seConnecter() {
  const email = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // Réinitialise le message d'erreur à chaque tentative
  document.getElementById('loginMessage').textContent = "";
  
  try {
    if (!email || !password) {
      document.getElementById('loginMessage').textContent = "❌ Veuillez remplir tous les champs !";
      return;
    }

    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email: email,
      password: password
    });

    if (error) {
      throw new Error(error.message);
    }

    if (data.user) {
      document.getElementById('loginMessage').textContent = "✅ Connecté avec succès ! 🎉";
      document.getElementById('loginMessage').classList.add("success");
      
      // Redirection vers le drive (exemple)
      // window.location.href = 'drive.html';
    }
  } catch (err) {
    console.error(err);
    document.getElementById('loginMessage').textContent = "❌ Erreur de connexion. Vérifiez vos identifiants.";
  }
}

// Écouteur d'événement sur le formulaire
document.getElementById('loginForm').addEventListener('submit', async function(event) {
  event.preventDefault(); // ✅ Bloque la recharge de page

  await seConnecter();
});
