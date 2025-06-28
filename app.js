// Initialisation Supabase
const supabaseUrl = 'https://nqrtrpsommuudwoakgcp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5xcnRycHNvbW11dWR3b2FrZ2NwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTExMzMwODEsImV4cCI6MjA2NjcwOTA4MX0.lS2nRqBAlUdV-B9-5Amjn31p_cO7M0jzj9YZ2_v8b3M';
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

// Fonction de connexion
async function seConnecter() {
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const messageEl = document.getElementById('loginMessage');
  const button = document.getElementById('loginButton');

  // Réinitialisation des messages et état
  messageEl.textContent = "";
  messageEl.className = "message";
  button.disabled = true;

  console.log("Tentative de connexion...");
  console.log("Email saisi :", email);

  if (!email || !password) {
    messageEl.textContent = "❌ Veuillez remplir tous les champs !";
    messageEl.classList.add("error");
    button.disabled = false;
    return;
  }

  try {
    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email,
      password
    });

    console.log("Réponse Supabase :", data, error);

    if (error) {
      throw new Error(error.message);
    }

    if (data && data.user) {
      messageEl.textContent = "✅ Connecté avec succès ! 🎉";
      messageEl.classList.add("success");
      // Exemple : window.location.href = 'drive.html';
    } else {
      messageEl.textContent = "❌ Erreur : utilisateur non trouvé.";
      messageEl.classList.add("error");
    }

  } catch (err) {
    console.error("Erreur attrapée :", err);
    messageEl.textContent = "❌ Erreur de connexion : " + err.message;
    messageEl.classList.add("error");
  } finally {
    button.disabled = false;
  }
}

// Listener
document.getElementById('loginForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  console.log("Formulaire soumis");
  await seConnecter();
});
