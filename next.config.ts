import type { NextConfig } from "next";
import path from "node:path";

// Resolve the project directory reliably. In Next 16 with Turbopack there's a
// bug where Turbopack sometimes treats the parent directory (e.g., the user's
// Desktop) as the workspace root, causing file-watcher churn (huge CPU/memory)
// and `Can't resolve 'tailwindcss'` errors. Pinning the root + tracing root
// forces Turbopack to stay inside the project.
const projectRoot = path.resolve(process.cwd());

const nextConfig: NextConfig = {
  turbopack: {
    root: projectRoot,
  },
  outputFileTracingRoot: projectRoot,
};

export default nextConfig;
