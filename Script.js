/* ---------- tokens ---------- */
:root {
  --bg: #06070a;
  --panel: rgba(13, 15, 20, 0.82);
  --line: #22262f;
  --green: #39ff88;
  --cyan: #22d3ee;
  --violet: #8b5cf6;
  --text: #e6e9ef;
  --muted: #7a8394;
  --mono: 'JetBrains Mono', monospace;
  --display: 'Space Grotesk', sans-serif;
}

* { box-sizing: border-box; margin: 0; padding: 0; }

html, body {
  min-height: 100vh;
}

body {
  position: relative;
  font-family: var(--mono);
  color: var(--text);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  overflow-x: hidden;
  background: var(--bg);
}

/* ---------- background image + overlays ---------- */
.bg-image {
  position: fixed;
  inset: 0;
  background-image: url('hacker-bg.jpg');
  background-size: cover;
  background-position: center 20%;
  filter: grayscale(15%) contrast(1.05) brightness(0.55);
  transform: scale(1.04);
  z-index: 0;
  animation: driftBg 18s ease-in-out infinite alternate;
}

@keyframes driftBg {
  from { transform: scale(1.04) translate(0, 0); }
  to   { transform: scale(1.08) translate(-1%, -1%); }
}

.bg-overlay {
  position: fixed;
  inset: 0;
  z-index: 1;
  background:
    radial-gradient(circle at 50% 30%, rgba(6,7,10,0.35) 0%, rgba(6,7,10,0.85) 60%, rgba(6,7,10,0.97) 100%),
    linear-gradient(180deg, rgba(6,7,10,0.6) 0%, rgba(6,7,10,0.9) 100%);
}

.grid-fx {
  position: fixed;
  inset: 0;
  z-index: 2;
  background-image:
    linear-gradient(rgba(57,255,136,0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(57,255,136,0.05) 1px, transparent 1px);
  background-size: 42px 42px;
  mask-image: radial-gradient(circle at 50% 40%, black, transparent 75%);
  pointer-events: none;
}

.scanlines {
  position: fixed;
  inset: 0;
  z-index: 3;
  pointer-events: none;
  background: repeating-linear-gradient(
    to bottom,
    rgba(255,255,255,0.025) 0px,
    rgba(255,255,255,0.025) 1px,
    transparent 2px,
    transparent 4px
  );
  animation: scan 9s linear infinite;
  opacity: 0.5;
}

@keyframes scan {
  from { background-position: 0 0; }
  to   { background-position: 0 200px; }
}

/* ---------- card ---------- */
.card {
  position: relative;
  z-index: 4;
  width: 100%;
  max-width: 400px;
  background: var(--panel);
  border: 1px solid var(--line);
  border-radius: 14px;
  backdrop-filter: blur(10px);
  box-shadow:
    0 0 0 1px rgba(57,255,136,0.06),
    0 20px 60px rgba(0,0,0,0.6),
    0 0 40px rgba(139,92,246,0.08);
  overflow: hidden;
  animation: rise 0.6s cubic-bezier(.2,.8,.2,1) both;
}

@keyframes rise {
  from { opacity: 0; transform: translateY(18px); }
  to   { opacity: 1; transform: translateY(0); }
}

.term-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  background: rgba(255,255,255,0.02);
  border-bottom: 1px solid var(--line);
}

.dot { width: 10px; height: 10px; border-radius: 50%; display: inline-block; }
.dot.red { background: #ff5f57; }
.dot.yellow { background: #febc2e; }
.dot.green { background: #28c840; }

.term-path {
  margin-left: 8px;
  font-size: 11px;
  color: var(--muted);
  letter-spacing: 0.3px;
}

.card-body {
  padding: 30px 26px 22px;
  text-align: center;
}

.bot-icon {
  font-size: 40px;
  margin-bottom: 6px;
  filter: drop-shadow(0 0 14px rgba(57,255,136,0.35));
  animation: float 4s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
}

/* ---------- glitch title ---------- */
h1.glitch {
  position: relative;
  font-family: var(--display);
  font-size: 28px;
  font-weight: 700;
  letter-spacing: 1px;
  margin-bottom: 10px;
  background: linear-gradient(90deg, var(--green), var(--cyan) 45%, var(--violet));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

h1.glitch::before,
h1.glitch::after {
  content: attr(data-text);
  position: absolute;
  left: 0; right: 0; top: 0;
  -webkit-text-fill-color: initial;
  background-clip: initial;
}

h1.glitch::before {
  color: var(--cyan);
  clip-path: inset(0 0 60% 0);
  animation: glitchTop 4.5s infinite linear;
  opacity: 0.7;
}

h1.glitch::after {
  color: var(--violet);
  clip-path: inset(60% 0 0 0);
  animation: glitchBottom 4.5s infinite linear;
  opacity: 0.7;
}

@keyframes glitchTop {
  0%, 92%, 100% { transform: translate(0, 0); opacity: 0; }
  93% { transform: translate(-2px, -1px); opacity: 0.8; }
  95% { transform: translate(2px, 1px); opacity: 0.8; }
  97% { transform: translate(-1px, 0); opacity: 0; }
}

@keyframes glitchBottom {
  0%, 90%, 100% { transform: translate(0, 0); opacity: 0; }
  91% { transform: translate(2px, 1px); opacity: 0.8; }
  94% { transform: translate(-2px, -1px); opacity: 0.8; }
  96% { transform: translate(1px, 0); opacity: 0; }
}

.subtitle {
  font-size: 12.5px;
  color: var(--muted);
  margin-bottom: 26px;
}

.prompt { color: var(--green); margin-right: 4px; }

.cursor {
  display: inline-block;
  color: var(--green);
  animation: blink 1s steps(1) infinite;
  margin-left: 2px;
}

@keyframes blink {
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
}

/* ---------- form ---------- */
form {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 18px;
  text-align: left;
}

.field-label {
  font-size: 10.5px;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--muted);
  margin-bottom: 2px;
}

#phoneInput {
  padding: 12px 14px;
  border-radius: 8px;
  border: 1px solid var(--line);
  background: rgba(255,255,255,0.03);
  color: var(--text);
  font-family: var(--mono);
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
  margin-bottom: 6px;
}

#phoneInput::placeholder { color: #4b5262; }

#phoneInput:focus {
  border-color: var(--green);
  box-shadow: 0 0 0 3px rgba(57,255,136,0.12);
}

#generateBtn {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 13px 14px;
  border: none;
  border-radius: 8px;
  background: linear-gradient(90deg, var(--green), var(--cyan) 55%, var(--violet));
  background-size: 200% 100%;
  color: #06070a;
  font-family: var(--mono);
  font-weight: 700;
  font-size: 13.5px;
  letter-spacing: 0.3px;
  cursor: pointer;
  transition: background-position 0.5s ease, transform 0.15s ease;
}

#generateBtn:hover { background-position: 100% 0; }
#generateBtn:active { transform: scale(0.97); }
#generateBtn:disabled { opacity: 0.55; cursor: not-allowed; }

.btn-key {
  border: 1px solid rgba(6,7,10,0.35);
  border-radius: 4px;
  padding: 0 6px;
  font-size: 12px;
}

/* ---------- status ---------- */
.status {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 12.5px;
  color: var(--muted);
  margin-bottom: 18px;
}

.spinner {
  width: 13px;
  height: 13px;
  border-radius: 50%;
  border: 2px solid rgba(57,255,136,0.2);
  border-top-color: var(--green);
  animation: spin 0.8s linear infinite;
}

@keyframes spin { to { transform: rotate(360deg); } }

.dots span {
  animation: dotFade 1.4s infinite;
  opacity: 0;
}
.dots span:nth-child(1) { animation-delay: 0s; }
.dots span:nth-child(2) { animation-delay: 0.2s; }
.dots span:nth-child(3) { animation-delay: 0.4s; }

@keyframes dotFade {
  0%, 100% { opacity: 0; }
  50% { opacity: 1; }
}

/* ---------- code box ---------- */
.code-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  background: rgba(57,255,136,0.05);
  border: 1px solid rgba(57,255,136,0.35);
  border-radius: 8px;
  padding: 12px 14px;
  margin-bottom: 18px;
  box-shadow: 0 0 20px rgba(57,255,136,0.08) inset;
}

.code-label {
  font-size: 9.5px;
  color: var(--green);
  letter-spacing: 1px;
}

#codeText {
  flex: 1;
  text-align: center;
  font-size: 19px;
  font-weight: 700;
  letter-spacing: 3px;
  color: var(--text);
  text-shadow: 0 0 12px rgba(57,255,136,0.4);
}

#copyBtn {
  background: none;
  border: 1px solid var(--line);
  color: var(--text);
  border-radius: 6px;
  padding: 5px 10px;
  font-family: var(--mono);
  font-size: 11px;
  cursor: pointer;
  transition: border-color 0.2s, color 0.2s;
}

#copyBtn:hover { border-color: var(--green); color: var(--green); }

/* ---------- instructions / footer ---------- */
.instructions {
  font-size: 11.5px;
  color: var(--muted);
  margin-bottom: 20px;
  line-height: 1.6;
}

.arrow { color: var(--cyan); margin: 0 2px; }

footer {
  border-top: 1px solid var(--line);
  padding: 12px 26px;
  font-size: 10.5px;
  color: #4b5262;
  text-align: center;
  letter-spacing: 0.2px;
}

.sep { color: var(--violet); margin: 0 4px; }

.hidden { display: none; }

/* ---------- responsive ---------- */
@media (max-width: 420px) {
  .card { max-width: 100%; }
  h1.glitch { font-size: 24px; }
}

/* ---------- reduced motion ---------- */
@media (prefers-reduced-motion: reduce) {
  .bg-image, .scanlines, .bot-icon, h1.glitch::before, h1.glitch::after,
  .cursor, .spinner, .dots span, .card { animation: none !important; }
}
