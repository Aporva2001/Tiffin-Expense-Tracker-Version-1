// Injects Firebase settings from environment variables into index.html
// and writes the result to dist/index.html.
const fs = require('fs');
const path = require('path');

// Local convenience: load a .env file if one exists (Netlify uses real env vars).
const envFile = path.join(__dirname, '.env');
if (fs.existsSync(envFile)) {
  for (const line of fs.readFileSync(envFile, 'utf8').split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
    if (m && process.env[m[1]] === undefined) {
      process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
    }
  }
}

const REQUIRED = [
  'FIREBASE_API_KEY',
  'FIREBASE_AUTH_DOMAIN',
  'FIREBASE_PROJECT_ID',
  'FIREBASE_STORAGE_BUCKET',
  'FIREBASE_MESSAGING_SENDER_ID',
  'FIREBASE_APP_ID',
];

const missing = REQUIRED.filter((k) => !process.env[k]);
if (missing.length) {
  console.error('Build failed. Missing environment variables:\n  ' + missing.join('\n  '));
  process.exit(1);
}

let html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
for (const key of REQUIRED) {
  html = html.split('"%%' + key + '%%"').join(JSON.stringify(process.env[key]));
}
if (html.includes('%%FIREBASE_')) {
  console.error('Build failed. Some placeholders were not replaced.');
  process.exit(1);
}

fs.mkdirSync(path.join(__dirname, 'dist'), { recursive: true });
fs.writeFileSync(path.join(__dirname, 'dist', 'index.html'), html);
console.log('Built dist/index.html');
