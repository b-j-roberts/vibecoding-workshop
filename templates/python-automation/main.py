"""
Main entry point for the automation.

Run with: python main.py
"""

import logging
import os
import sys

import requests
import yaml
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Set up logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
)
log = logging.getLogger(__name__)


def load_config(path="config.yaml"):
    """Load configuration from YAML file."""
    with open(path) as f:
        return yaml.safe_load(f)


def fetch_github_repos(username, count=5):
    """Fetch a user's most recently updated public GitHub repos."""
    url = f"https://api.github.com/users/{username}/repos"
    params = {"sort": "updated", "per_page": count}

    # Use token if available (increases rate limit from 60 to 5000 req/hr)
    token = os.getenv("GITHUB_TOKEN")
    headers = {}
    if token:
        headers["Authorization"] = f"token {token}"

    log.info("Fetching repos for '%s' from GitHub API...", username)
    response = requests.get(url, params=params, headers=headers, timeout=10)
    response.raise_for_status()
    return response.json()


def format_report(repos, username):
    """Format repos into a readable text report."""
    lines = [
        f"GitHub Report: {username}",
        f"{'=' * 40}",
        f"Showing {len(repos)} most recently updated repos",
        "",
    ]

    for i, repo in enumerate(repos, 1):
        stars = repo.get("stargazers_count", 0)
        language = repo.get("language") or "—"
        description = repo.get("description") or "No description"

        lines.append(f"{i}. {repo['name']}")
        lines.append(f"   {description}")
        lines.append(f"   Language: {language} | Stars: {stars}")
        lines.append("")

    return "\n".join(lines)


def main():
    config = load_config()

    username = config.get("github_username", "octocat")
    count = config.get("repo_count", 5)

    log.info("Starting automation run")

    try:
        repos = fetch_github_repos(username, count)
    except requests.RequestException as e:
        log.error("Failed to fetch data: %s", e)
        sys.exit(1)

    report = format_report(repos, username)
    print(report)

    # Write report to file
    output_path = config.get("output_file", "report.txt")
    with open(output_path, "w") as f:
        f.write(report)
    log.info("Report saved to %s", output_path)


if __name__ == "__main__":
    main()
