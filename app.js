import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabase = createClient(
  'https://nqrtrpsommuudwoakgcp.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5xcnRycHNvbW11dWR3b2FrZ2NwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTExMzMwODEsImV4cCI6MjA2NjcwOTA4MX0.lS2nRqBAlUdV-B9-5Amjn31p_cO7M0jzj9YZ2_v8b3M'
);

document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (data?.session?.access_token) {
    console.log("🔑 Access Token :", data.session.access_token);
  }

  if (error) {
    document.getElementById('message').textContent = "❌ " + error.message;
  } else {
    const token = data.session.access_token;
    document.getElementById('message').textContent = "✅ Connexion réussie. Vérification...";
    await callWorker(token);
  }
});

async function callWorker(token) {
  try {
    const resp = await fetch('https://secure.alexandrelanglois.me/', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (resp.ok) {
      const html = await resp.text();
      document.open();
      document.write(html);
      document.close();
    } else {
      document.getElementById('message').textContent = "❌ Accès refusé.";
    }
  } catch (err) {
    console.error(err);
    document.getElementById('message').textContent = "❌ Erreur réseau.";
  }
}

