import { login } from './auth.js';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('loginForm');
  const messageEl = document.getElementById('message');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    try {
      const resp = await login(email, password);

      if (resp.ok) {
        const html = await resp.text();
        document.open();
        document.write(html);
        document.close();
      } else {
        const text = await resp.text();
        messageEl.textContent = "❌ " + text;
      }
    } catch (err) {
      console.error(err);
      messageEl.textContent = "❌ Erreur réseau.";
    }
  });
});
