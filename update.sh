#!/bin/sh
# Deploy script for the Synology NAS — run from the release checkout:
#   ssh nas 'cd /volume1/docker/rickard-portfolio/release && bash update.sh'
# See "Deploying to the NAS" in CLAUDE.md.
set -eu

# Non-interactive SSH sessions on DSM only have /usr/bin:/bin:/usr/sbin:/sbin in PATH;
# docker lives in /usr/local/bin.
PATH="/usr/local/bin:$PATH"
export PATH

APP_DIR="/volume1/docker/rickard-portfolio/release"
BASE_URL="http://127.0.0.1:3000"
IMAGE="rickard-portfolio:local"
PREV_IMAGE="rickard-portfolio:previous"

# Everything lives in main() so that `git pull` replacing this very file while it runs
# can't make the shell read a half-changed script — the whole function is parsed first.
main() {
    cd "$APP_DIR"

    echo "======================================"
    echo "Rickard Portfolio Update"
    echo "======================================"

    # Fail before touching git, so a missing docker never leaves us pulled but not built.
    if ! command -v docker >/dev/null 2>&1; then
        echo "ERROR: docker not found in PATH ($PATH). Update aborted."
        exit 1
    fi

    echo "Checking repository..."

    if [ -n "$(git status --porcelain)" ]; then
        echo "ERROR: Local repository contains changes."
        git status --short
        echo "Update aborted."
        exit 1
    fi

    echo "Fetching GitHub..."
    git fetch origin

    echo "Updating main..."
    git pull --ff-only origin main

    # Keep the currently running image so a bad build can be rolled back.
    echo "Tagging current image as rollback point..."
    if docker image inspect "$IMAGE" >/dev/null 2>&1; then
        docker tag "$IMAGE" "$PREV_IMAGE"
        ROLLBACK=1
        echo "Rollback point: $PREV_IMAGE"
    else
        ROLLBACK=0
        echo "No previous image - rollback not available."
    fi

    echo "Building new Docker image..."
    docker compose build

    echo "Starting updated portfolio..."
    docker compose up -d --remove-orphans

    echo "Waiting for application..."
    i=0
    while [ "$i" -lt 30 ]; do
        if curl --fail --silent "$BASE_URL/" >/dev/null 2>&1; then
            break
        fi
        i=$((i + 1))
        sleep 2
    done

    echo "Checking container..."
    docker compose ps

    echo "Verifying site..."
    FAILED=""
    for P in / /journey /projects /education /about /contact \
             /projects/talking-systems /assets/rickard-portrait.png; do
        if curl --fail --silent "$BASE_URL$P" >/dev/null; then
            echo "  OK    $P"
        else
            echo "  FAIL  $P"
            FAILED="$P"
        fi
    done

    if [ -n "$FAILED" ]; then
        echo "======================================"
        echo "ERROR: verification failed ($FAILED)"
        if [ "$ROLLBACK" -eq 1 ]; then
            echo "Rolling back to previous image..."
            docker tag "$PREV_IMAGE" "$IMAGE"
            docker compose up -d --remove-orphans
            sleep 5
            if curl --fail --silent "$BASE_URL/" >/dev/null; then
                echo "Rollback OK - previous version is live again."
            else
                echo "ROLLBACK FAILED - site is DOWN. Manual action required."
            fi
        else
            echo "No rollback point available - site may be broken."
        fi
        echo "Note: git is already updated; fix the source and re-run."
        echo "======================================"
        exit 1
    fi

    echo "======================================"
    echo "Portfolio successfully updated."
    echo "======================================"
}

main "$@"
exit $?
