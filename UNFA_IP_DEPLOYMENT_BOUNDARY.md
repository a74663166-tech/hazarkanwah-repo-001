# UNFA IP Deployment Boundary

This file defines the boundary between PUBLIC/deployable assets and PRIVATE/core intellectual property for the UNFA project. It intentionally contains no implementation details or algorithms.

Summary
- Project: UNFA — Sovereign Neural-Fractal Architecture
- Owner/Developer: HAZERKENOH
- Backup branch with original sources: backup/unfa-original-2026-09-04

PUBLIC / DEPLOYABLE FILES (safe to include in a Forge package or public repo)
- index.html
- static/app.js         # UI bindings and application glue (may reference the core interface)
- static/styles.css
- static/demo-core-stub.js  # demo stub to be used in deployment packages instead of the private core
- README.md
- LICENSE
- .gitignore
- UNFA_FORGE_DEPLOYMENT.md
- UNFA_ATLASSIAN_SUPPORT_READY.md  (support draft; contains only identifying info)

PRIVATE / CORE FILES (MUST NOT be uploaded to external services or included in Forge package)
- static/core.js        # PRIVATE CORE IP: contains the implementation of CLOSED 9-AXIS CORE

FILES REQUIRING REVIEW BEFORE ANY UPLOAD
- README.md             # review descriptive text to ensure no sensitive algorithm details are present
- any future *.jks, *.keystore, google-services.json, .env files (none present currently)

FILES CONTAINING NO SECRETS (based on current repository scan)
- static/app.js
- index.html
- static/styles.css
- LICENSE

FILES THAT MUST NEVER BE UPLOADED EXTERNALLY
- static/core.js        # core intellectual property (implementation)
- any files added later that include algorithms, datasets, or keys

NOTES / ACTIONS
- The deployment branch (forge/deploy-ready) should include the demo stub (static/demo-core-stub.js) in place of static/core.js for any public packaging or Forge manifest.
- Keep the original core implementation in the backup branch (backup/unfa-original-2026-09-04) or a private repository.
- Any request from Atlassian or CI to upload or reference static/core.js should be treated as a STOP condition and reported immediately.

Prepared for: HAZERKENOH / UNFA team
Date prepared: 2026-09-04
