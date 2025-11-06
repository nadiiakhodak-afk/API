# PaySaxas Docs

Документація PaySaxas на базі Next.js та Fumadocs. Нижче — покрокові інструкції для роботи з контейнером, залежностями й OpenAPI.

## Вимоги

- Docker + Docker Compose
- У репозиторії є `Makefile`, який спрощує роботу з контейнером та скриптами

## Основні команди

Всі команди виконуються з кореня репозиторію.

- `make build` — зібрати/перезібрати Docker-образ (`docker compose build`).
- `make up` — підняти контейнер у фоні з командою `sleep infinity` (dev-сервер не стартує, однак watcher `fumadocs-mdx --watch` уже працює у фоні та підхоплює зміни контенту).
- `make start` — запустити dev-сервер (`pnpm dev --hostname 0.0.0.0`) всередині вже піднятого контейнера.
- `make dev` — синонім `make start`.
- `make down` — зупинити контейнер (`docker compose down`).
- `make restart` — рестарт сервісу `fumadocs`.
- `make install` — встановити залежності всередині контейнера (`pnpm install`). Використовується, якщо `node_modules` відсутній.
- `make logs` — перегляд логів контейнера (`docker compose logs -f fumadocs`).
- `make clean` — зупинити контейнер і видалити томи (`docker compose down -v`).
- `make openapi` — згенерувати MDX-документи з OpenAPI (`bun ./scripts/generate-docs.ts` у контейнері).

> **Примітка:** контейнер при старті перевіряє `node_modules`. Якщо директорії немає (наприклад, ви видалили її на хості), entrypoint автоматично виконує `pnpm install --frozen-lockfile` і лише потім виконує команду.

## Робочий цикл

1. **Підняти контейнер (без дев-сервера):**
   ```bash
   make build
   make up
   ```
2. **Запустити dev-сервер:**
   ```bash
   make start
   ```
   Зупинка `Ctrl+C` зупиняє лише dev, контейнер продовжує працювати.
   Файли в `content`, `src` відстежуються через polling, а `fumadocs-mdx --watch` у контейнері оновлює `.source` при змінах.
3. **Зупинити контейнер повністю:**
   ```bash
   make down
   ```
4. **Оновити залежності (якщо видалили `node_modules`):**
   ```bash
   make install
   ```
5. **Перегенерувати документацію з OpenAPI:**
   ```bash
   make openapi
   ```

## Структура проекту

- `openapi/api.yaml` — основна OpenAPI-схема.
- `scripts/generate-docs.ts` — скрипт генерації MDX-файлів із OpenAPI.
- `content/docs` — згенеровані документи; основний вхід `index.mdx`.
- `src/lib/openapi.ts` — конфігурація `createOpenAPI` з посиланням на схему.
- `scripts/docker-entrypoint.sh` — entrypoint контейнера, який ставить залежності, якщо потрібні.

## Вбудований OpenAPI

- Після редагування `openapi/api.yaml` викличте `make openapi`, щоб оновити MDX-файли.
- Dev-сервер (`make start`) підхоплює зміни й показує API-розділ у Fumadocs.

## Корисні посилання

- [Next.js Docs](https://nextjs.org/docs)
- [Fumadocs](https://fumadocs.dev)
- [Fumadocs OpenAPI](https://fumadocs.dev/docs/ui/openapi)
