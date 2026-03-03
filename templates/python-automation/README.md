# Python Automation Template

A minimal Python starter for building scripts, data pipelines, or scheduled automations.

## What's Included

- **Python 3.11+** with a single-file entry point
- **Config** via YAML file + `.env` for secrets
- **Logging** pre-configured
- One working example: fetch GitHub repos and generate a report
- **GitHub Actions** workflow for running on a schedule
- A `CLAUDE.md` file for Claude Code context

## Quick Start

```bash
# Install dependencies
pip install -r requirements.txt

# (Optional) Add your GitHub token for higher API rate limits
cp .env.example .env
# Edit .env and add your token

# Run the automation
python main.py
```

You should see a report printed to the terminal and saved to `report.txt`.

## Project Structure

```
├── main.py                # Entry point — all automation logic
├── config.yaml            # Settings (what to fetch, output path)
├── .env.example           # Template for secrets
├── requirements.txt       # Python dependencies
├── .github/
│   └── workflows/
│       └── automation.yml # GitHub Actions scheduled run
├── CLAUDE.md              # Context file for Claude Code
└── .gitignore
```

## Configuration

Edit `config.yaml` to change what the automation does:

```yaml
github_username: "octocat"
repo_count: 5
output_file: "report.txt"
```

For secrets (API keys, tokens), use the `.env` file:

```bash
cp .env.example .env
# Then edit .env with your values
```

## Scheduling

### Option 1: GitHub Actions (recommended)

The included workflow (`.github/workflows/automation.yml`) runs daily at 9:00 AM UTC.

To change the schedule, edit the `cron` line:

```yaml
schedule:
  - cron: "0 9 * * *"    # Every day at 9 AM UTC
  - cron: "0 */6 * * *"  # Every 6 hours
  - cron: "0 9 * * 1"    # Every Monday at 9 AM UTC
```

To add secrets, go to your GitHub repo's **Settings > Secrets and variables > Actions**.

You can also run it manually from the **Actions** tab using the "Run workflow" button.

### Option 2: cron (local machine)

```bash
# Open your crontab
crontab -e

# Add a line to run daily at 9 AM
0 9 * * * cd /path/to/your/project && python main.py
```

## Common Commands

| Command | Description |
|---------|-------------|
| `python main.py` | Run the automation |
| `pip install -r requirements.txt` | Install dependencies |
| `pip freeze > requirements.txt` | Save current dependencies |
