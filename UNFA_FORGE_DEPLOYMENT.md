# UNFA Forge Deployment Guide

This file documents the manual steps required to deploy the UNFA demo to Atlassian Forge. It intentionally omits any private core implementation and uses a demo stub for public deployment. Perform these steps only after authenticating to your Atlassian Developer account.

IMPORTANT STOP CONDITIONS (DO NOT PROCEED if any of the following occur)
- Any step requires uploading `static/core.js` or other private core files. STOP.
- Any step requires adding a Billing/Payment method. STOP.
- Any step asks for API keys or secrets to be embedded in the manifest or environment. STOP.

Pre-conditions (on your workstation)
- You are a member of the Atlassian Developer Space and have credentials (do not share them here).
- Node.js and npm are available if the app has a build step.
- The repo branch `forge/deploy-ready` is checked out and contains `static/demo-core-stub.js` in place of any private core file.

Step-by-step

1) Checkout deploy branch
   git fetch origin
   git checkout forge/deploy-ready

2) Verify that the bundle uses the demo stub
   - Ensure references to `static/core.js` are replaced in the deployable bundle with `static/demo-core-stub.js`.
   - DO NOT modify `main` or the original `static/core.js` in `main` branch.

3) Install Forge CLI (if not already installed)
   npm install -g @forge/cli

4) Login to Forge (interactive — perform on your machine)
   forge login

5) Create the Forge app (via Developer Console or CLI)
   Option A (recommended): Use the Atlassian Developer Console web UI to create a new Forge app and select appropriate product/module.
   Option B (CLI): forge create  # Follow prompts. When asked for an App ID value, leave manifest id as placeholder until Atlassian issues a real value.

   STOP: After creation, Atlassian will provide a Forge App ID. DO NOT share any secrets. Record the App ID and continue.

6) Update manifest.yml
   - Open `manifest.yml` in the repo branch and replace the placeholder id with the real Forge App ID ONLY after confirming it was issued by Atlassian.
   - Do not add secrets to manifest.yml.

7) Deploy (interactive)
   forge deploy
   - If `forge deploy` prompts for billing or payment, STOP and report.

8) Install on a development/test site (Site Admin required)
   forge install --site <your-site-identifier>
   - Site Admin must approve installation. If not available, ask the site admin to install.

9) Test the app
   - Open the app in the target Cloud site (Manage apps → UNFA demo → Open). Verify basic UI operations using demo stub: change axes, export JSON, apply snapshot.
   - Use `forge tunnel` locally if you need to inspect runtime logs during development.

10) Troubleshooting
   - If deploy fails, capture the `forge deploy` output (stdout/stderr). Do not include secrets in logs.
   - Common failure causes: missing modules in manifest, incorrect module type, required permissions not granted, attempted upload of excluded files.

11) After successful testing
   - Keep `main` unchanged. Merge only safe artifacts to main after internal review.
   - Maintain the private core (static/core.js) in backup or a private repository.

12) Rollback / Removal
   - To remove an app install: forge uninstall --site <your-site-identifier>
   - To delete an app entirely: use Developer Console (owner account) — this is an administrative action and not performed here.

Prepared by: HAZERKENOH / UNFA team
Date prepared: 2026-09-04
