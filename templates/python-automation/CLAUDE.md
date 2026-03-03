# CLAUDE.md

## Project Overview

This is a Python CLI automation that fetches data from an API, processes it, and outputs a formatted report. It's designed to run as a script (`python main.py`) or on a schedule via GitHub Actions.

## Tech Stack

- **Language**: Python 3.11+
- **HTTP**: requests
- **Config**: YAML (pyyaml) + .env (python-dotenv)
- **Scheduling**: GitHub Actions cron (`.github/workflows/automation.yml`)

## Project Structure

- `main.py` — Entry point; all automation logic lives here
- `config.yaml` — Runtime settings (what to fetch, where to output)
- `.env` — Secrets like API tokens (not committed to git)
- `requirements.txt` — Python dependencies
- `.github/workflows/automation.yml` — Scheduled run via GitHub Actions

## How It Works

1. `main.py` loads config from `config.yaml` and secrets from `.env`
2. Fetches data from the GitHub API (or whichever API you swap in)
3. Formats the data into a readable report
4. Prints the report and saves it to a file

## Commands

- `pip install -r requirements.txt` — Install dependencies
- `python main.py` — Run the automation
- Edit `config.yaml` to change settings
- Copy `.env.example` to `.env` and add secrets

## Conventions

- Keep all logic in `main.py` until it grows large enough to split
- Use `logging` (not print) for status messages; use `print` for output
- Configuration goes in `config.yaml`; secrets go in `.env`
- Add new dependencies to `requirements.txt`

## Adding a New Data Source

1. Write a function that fetches from the API (using `requests`)
2. Write a formatter function for the output
3. Call both from `main()`
4. Add any new config keys to `config.yaml`
5. Add any new secrets to `.env.example`
