import { login } from './auth.js';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('loginForm');
  const messageEl = document.getElementById('message');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    messageEl.textContent = "⏳ Connexion en cours...";

    try {
      const resp = await login(email, password);

      if (resp.ok) {
        const html = await resp.text();
        document.open();
        document.write(html);
        document.close();
      } else {
        const text = await resp.text();
        messageEl.textContent = `❌ Échec : ${text}`;
      }
    } catch (err) {
      console.error("❌ Erreur réseau :", err);
      messageEl.textContent = "❌ Erreur réseau.";
    }
  });
});
