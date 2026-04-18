import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Pin the base to this project directory so @tailwindcss/postcss doesn't fall
// back to process.cwd() (which can end up being the user's Desktop when Next's
// Turbopack launches postcss from an unexpected cwd, causing:
// "Can't resolve 'tailwindcss' in 'c:\Users\Bubbles\Desktop'").
const config = {
  plugins: {
    "@tailwindcss/postcss": {
      base: __dirname,
    },
  },
};

export default config;
