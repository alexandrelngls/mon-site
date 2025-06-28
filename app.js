const supabaseClient = window.supabaseClient;

async function seConnecter() {
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const messageEl = document.getElementById('loginMessage');
  const button = document.getElementById('loginButton');

  messageEl.textContent = "";
  messageEl.className = "message";
  button.disabled = true;

  console.log("Tentative de connexion avec l'email :", email);

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
      throw error;
    }

    if (data && data.user) {
      messageEl.textContent = "✅ Connecté avec succès ! 🎉";
      messageEl.classList.add("success");
    } else {
      messageEl.textContent = "❌ Identifiants incorrects.";
      messageEl.classList.add("error");
    }

  } catch (err) {
    console.error("Erreur attrapée :", err);
    messageEl.textContent = "❌ Erreur : " + err.message;
    messageEl.classList.add("error");
  } finally {
    button.disabled = false;
  }
}

document.getElementById('loginForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  console.log("Formulaire soumis");
  await seConnecter();
});
