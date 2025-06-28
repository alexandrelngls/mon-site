// Fichier app.js (modifié pour utiliser Supabase)
const supabaseUrl = 'https://nqrtrpsommuudwoakgcp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5xcnRycHNvbW11dWR3b2FrZ2NwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTExMzMwODEsImV4cCI6MjA2NjcwOTA4MX0.lS2nRqBAlUdV-B9-5Amjn31p_cO7M0jzj9YZ2_v8b3M';
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

// Fonction de connexion
function seConnecter() {
  const user = document.getElementById("username").value;
  const pwd = document.getElementById("password").value;

  // Utilise Supabase pour connecter l'utilisateur
  const { data, error } = await supabaseClient.auth.signInWithPassword({
    email: user,
    password: pwd
  });

  if (error) {
    alert("Erreur de connexion !");
    console.error(error);
  } else {
    alert("Connecté avec succès ! 🎉");
    document.getElementById("auth").style.display = "none";
    document.getElementById("drive").style.display = "block";
  }
}
