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

COPY --from=builder /app/index.html /usr/share/nginx/html/index.html
COPY --from=builder /app/style.css /usr/share/nginx/html/style.css
COPY --from=builder /app/script.js /usr/share/nginx/html/script.js

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]