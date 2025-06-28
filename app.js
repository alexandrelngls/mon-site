// ✅ 1. Configure Supabase avec tes clés
const supabaseUrl = 'https://nqrtrpsommuudwoakgcp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5xcnRycHNvbW11dWR3b2FrZ2NwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTExMzMwODEsImV4cCI6MjA2NjcwOTA4MX0.lS2nRqBAlUdV-B9-5Amjn31p_cO7M0jzj9YZ2_v8b3M';

const supabaseClient = Supabase.createClient(supabaseUrl, supabaseKey);

// ✅ 2. Fonction pour se connecter
async function seConnecter() {
  const email = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // 🧪 Teste si l'email et le mot de passe sont remplis
  if (!email || !password) {
    alert("Veuillez remplir tous les champs !");
    return;
  }

  try {
    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email: email,
      password: password
    });

    // ✅ Si la connexion réussit
    if (data.user) {
      document.getElementById('loginMessage').textContent = "Connecté avec succès ! 🎉";
      document.getElementById('loginMessage').classList.add("success");
      
      // 🔓 Tu peux ajouter ici le code pour aller à l’espace drive
      // Par exemple : window.location.href = 'drive.html';
    } else {
      throw new Error(error.message);
    }
  } catch (err) {
    document.getElementById('loginMessage').textContent = "Identifiants incorrects. Réessaie.";
  }
}
