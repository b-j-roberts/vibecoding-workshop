# User Project Preferences

These preferences apply to all projects initialized with this skill. They inform the project structure, tooling choices, and roadmap scoping.

## Project Structure

- **Monorepo by default**: Break projects into component directories at the root level based on needed components. Examples: `./frontend`, `./backend`, `./contracts`, `./scripts`, `./supabase`.
- **Flat root-level separation**: Each major component (frontend, backend, database, smart contracts, infrastructure) gets its own top-level directory. No deeply nested monorepo tooling unless the project demands it.

## Tooling Preferences

- **Containerization**: Prefer Docker and Docker Compose for backend services and infrastructure (APIs, databases, workers, etc.). Do NOT add Docker to frontend-only projects — frontends deploy to platforms like Vercel/Netlify without containers.
- **Scripting**: Always prefer Bash over alternatives for creating basic scripts to test, run, and manage features.
- **Task runner**: Always create a top-level Makefile exposing interfaces for all common operations:
  - `make dev` — start dev frontend
  - `make run` — start backend
  - `make test` — run tests
  - `make check` — check CI locally
  - Additional targets as needed per project (e.g., `make deploy`, `make db-migrate`, `make contracts-build`)

## Documentation Structure

All projects get a `./docs` directory containing:
- `SPEC.md` — project specification
- `STYLES.md` — styling specification (only for frontend/visual projects)
- `ROADMAP.md` — phased development roadmap

## Important Reminders

- The project setup phase in the roadmap should account for these preferences (Makefile, Docker, monorepo structure) but the skill does NOT create these files during initialization — it only creates the project directory and documentation.
- The Makefile, Dockerfiles, docker-compose.yml, and other infrastructure files are tasks within the Project Setup phase of the roadmap.
