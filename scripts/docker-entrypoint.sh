#!/bin/sh
set -e

# when node_modules missing (e.g. after host-side cleanup), install dependencies automatically
if [ ! -d node_modules ]; then
    echo "[entrypoint] node_modules missing, running pnpm install..."
    pnpm install --frozen-lockfile || pnpm install
fi

if [ "${FUMADOCS_WATCH}" = "1" ] && [ -z "${FUMADOCS_WATCH_STARTED}" ]; then
    export FUMADOCS_WATCH_STARTED=1
    echo "[entrypoint] starting fumadocs-mdx watcher"
    pnpm exec fumadocs-mdx --watch &
fi

exec "$@"
