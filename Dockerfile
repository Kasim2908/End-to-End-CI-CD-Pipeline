# =========================
# Stage 1: Build
# =========================
FROM alpine:latest AS builder

WORKDIR /app

COPY index.html style.css script.js ./

# =========================
# Stage 2: Runtime
# =========================
FROM nginx:alpine

# Update Alpine packages and install patched OpenSSL packages
RUN apk update && \
    apk upgrade --no-cache && \
    apk add --no-cache \
        'libcrypto3>=3.5.8-r0' \
        'libssl3>=3.5.8-r0'

COPY --from=builder /app/index.html /usr/share/nginx/html/index.html
COPY --from=builder /app/style.css /usr/share/nginx/html/style.css
COPY --from=builder /app/script.js /usr/share/nginx/html/script.js

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
