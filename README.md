# HHS

Hire and Hired Stars helps students learn, build, collaborate, and connect with career opportunities.

## Project structure

- `Frontend/` contains the Vite/React application, its `package.json`, lockfile, public assets, and `src/`.
- `Backend code/` contains the Express API, its `package.json`, routes, services, models, and tests.

## Run locally

### Windows PowerShell

PowerShell may block `npm.ps1` because of its script execution policy. Use `npm.cmd` instead; this runs npm without changing the system execution policy:

```powershell
npm.cmd --prefix Frontend install
npm.cmd --prefix "Backend code" install
```

Copy `Backend code/.env.example` to `Backend code/.env` and set a long, random `JWT_SECRET`. Configure `MONGODB_URI` for your MongoDB instance.

Start the apps in separate terminals:

```powershell
npm.cmd --prefix Frontend run dev
```

```powershell
npm.cmd --prefix "Backend code" run dev
```

### Other shells

Install each project's dependencies from its own directory with `npm install`, then run its scripts with `npm run`.

### Checks

From the project root in PowerShell:

```powershell
npm.cmd --prefix Frontend run lint
npm.cmd --prefix Frontend run build
npm.cmd --prefix "Backend code" test
```
