<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>DARK-PATH PAIR</title>

  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');

    * {
      box-sizing: border-box;
    }

    body {
      font-family: 'Inter', system-ui;
      margin: 0;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      /* iOS glass gradient */
      background: linear-gradient(135deg, #0f172a, #1e3a8a, #0ea5e9);
      overflow-x: hidden;
      color: white;
    }

    /* floating butterflies */
    body::before, body::after {
      content: "🦋";
      position: absolute;
      font-size: 40px;
      opacity: 0.6;
      animation: float 12s infinite linear;
    }

    body::after {
      left: 80%;
      animation-delay: 6s;
    }

    @keyframes float {
      0% { transform: translateY(100vh) rotate(0deg); }
      100% { transform: translateY(-10vh) rotate(360deg); }
    }

    .card {
      max-width: 460px;
      width: 90%;
      backdrop-filter: blur(20px);
      background: rgba(255, 255, 255, 0.08);
      border-radius: 28px;
      padding: 35px 25px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.5);
      border: 1px solid rgba(255,255,255,0.15);
      text-align: center;
    }

    .logo {
      width: 90px;
      height: 90px;
      border-radius: 50%;
      margin: 0 auto 15px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 40px;

      background: rgba(255,255,255,0.15);
      backdrop-filter: blur(10px);
      box-shadow: 0 8px 30px rgba(0,0,0,0.3);
    }

    h1 {
      margin: 0 0 8px;
      font-size: 26px;
      font-weight: 600;
    }

    p {
      color: rgba(255,255,255,0.7);
      margin-bottom: 25px;
    }

    input {
      width: 100%;
      padding: 16px;
      font-size: 17px;
      border-radius: 14px;
      border: none;
      outline: none;
      text-align: center;
      margin-bottom: 20px;

      background: rgba(255,255,255,0.12);
      color: white;
      backdrop-filter: blur(10px);
    }

    input::placeholder {
      color: rgba(255,255,255,0.6);
    }

    button {
      width: 100%;
      padding: 16px;
      border-radius: 14px;
      border: none;
      font-size: 17px;
      font-weight: 600;
      cursor: pointer;

      background: linear-gradient(135deg, #3b82f6, #0ea5e9);
      color: white;
      box-shadow: 0 10px 25px rgba(59,130,246,0.5);
      transition: 0.3s;
    }

    button:hover {
      transform: translateY(-2px);
      box-shadow: 0 15px 30px rgba(59,130,246,0.7);
    }

    .loader {
      display: none;
      flex-direction: column;
      align-items: center;
      margin: 30px 0;
    }

    .spinner {
      width: 50px;
      height: 50px;
      border: 4px solid rgba(255,255,255,0.2);
      border-top: 4px solid #38bdf8;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin-bottom: 15px;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    .code-box {
      background: rgba(255,255,255,0.1);
      border-radius: 18px;
      padding: 25px 15px;
      font-size: 30px;
      letter-spacing: 10px;
      font-weight: 600;
      margin: 20px 0;
      backdrop-filter: blur(10px);
    }

    .copy-btn {
      background: linear-gradient(135deg, #22c55e, #4ade80);
      margin-top: 10px;
    }

    footer {
      margin-top: 30px;
      font-size: 13px;
      color: rgba(255,255,255,0.6);
      text-align: center;
    }

    .error {
      color: #fb7185;
      margin-top: 15px;
      font-weight: 500;
    }

  </style>
</head>

<body>

  <div class="card">
    <div class="logo">🤖</div>
    <h1>DARK PATH</h1>
    <p>Pair Code • Link your WhatsApp device</p>

    <input type="text" id="phone" placeholder="256745626308" required>

    <button onclick="generatePairCode()">🔑 Generate Pair Code</button>

    <div id="loader" class="loader">
      <div class="spinner"></div>
      <strong>Requesting pair code...</strong>
      <small style="opacity:0.7;">5–20 seconds</small>
    </div>

    <div id="result" style="display:none;">
      <div class="code-box" id="codeDisplay">••••-••••-••••</div>
      <button class="copy-btn" onclick="copyCode()">📋 Copy Code</button>
      <small style="opacity:0.7; display:block; margin-top:15px;">
        WhatsApp → Linked Devices → Link with phone number
      </small>
    </div>

    <div id="errorMsg" class="error" style="display:none;"></div>
  </div>

  <footer>
    ©️ 2026ROJAZ | DARK-PATH<br>
    All rights reserved 🦋
  </footer>

  <script>
    let currentSessionId = null;
    let currentCode = '';

    async function generatePairCode() {
      const phone = document.getElementById('phone').value.trim();
      if (!phone || phone.length < 9) {
        showError('Please enter a valid number (e.g. 256781631700)');
        return;
      }

      document.getElementById('result').style.display = 'none';
      document.getElementById('errorMsg').style.display = 'none';
      const loader = document.getElementById('loader');
      loader.style.display = 'flex';

      const res = await fetch('/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone })
      });

      const data = await res.json();
      if (!data.success) {
        loader.style.display = 'none';
        showError(data.error || 'Failed to start pairing');
        return;
      }

      currentSessionId = data.sessionId;

      const evtSource = new EventSource(`/events?sessionId=${currentSessionId}`);
      evtSource.onmessage = (e) => {
        const msg = JSON.parse(e.data);
        loader.style.display = 'none';

        if (msg.error) {
          showError(msg.error);
        } else if (msg.code) {
          currentCode = msg.code;
          document.getElementById('codeDisplay').textContent = msg.code;
          document.getElementById('result').style.display = 'block';
        }
      };
    }

    function showError(text) {
      const err = document.getElementById('errorMsg');
      err.textContent = text;
      err.style.display = 'block';
    }

    function copyCode() {
      if (!currentCode) return;
      navigator.clipboard.writeText(currentCode).then(() => {
        const btn = document.querySelector('.copy-btn');
        const original = btn.textContent;
        btn.textContent = '✅ Copied!';
        setTimeout(() => { btn.textContent = original; }, 2000);
      });
    }
  </script>

</body>
</html>
