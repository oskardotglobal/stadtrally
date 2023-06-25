FROM node:18-alpine AS base


FROM base AS builder

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn --non-interactive

COPY src ./src
COPY public ./public
COPY next.config.js .
COPY tsconfig.json .

# Environment variables must be present at build time
# https://github.com/vercel/next.js/discussions/14030
ARG POCKETBASE_URL
ENV POCKETBASE_URL=${POCKETBASE_URL}
ARG POCKETBASE_USER
ENV POCKETBASE_USER=${POCKETBASE_USER}
ARG POCKETBASE_PASSWD
ENV POCKETBASE_PASSWD=${POCKETBASE_PASSWD}

RUN yarn build


FROM base AS runner

WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Environment variables must be redefined at run time
ARG POCKETBASE_URL
ENV POCKETBASE_URL=${POCKETBASE_URL}
ARG POCKETBASE_USER
ENV POCKETBASE_USER=${POCKETBASE_USER}
ARG POCKETBASE_PASSWD
ENV POCKETBASE_PASSWD=${POCKETBASE_PASSWD}

ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV production

CMD ["node", "server.js"]
