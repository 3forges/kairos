FROM python:3.10
# FROM bitnami/python:3.13.3-debian-12-r13

ENV PYTHONUNBUFFERED=1

RUN apt-get update -y && apt-get install -y ffmpeg
RUN mkdir -p /app
WORKDIR /app/

# Install uv
# Ref: https://docs.astral.sh/uv/guides/integration/docker/#installing-uv
# Ref: https://github.com/astral-sh/uv/pkgs/container/uv
# COPY --from=ghcr.io/astral-sh/uv:0.5.11 /uv /uvx /bin/
COPY --from=ghcr.io/astral-sh/uv:0.7.6 /uv /uvx /bin/

# Place executables in the environment at the front of the path
# Ref: https://docs.astral.sh/uv/guides/integration/docker/#using-the-environment
ENV PATH="/app/.venv/bin:$PATH"

# Compile bytecode
# Ref: https://docs.astral.sh/uv/guides/integration/docker/#compiling-bytecode
ENV UV_COMPILE_BYTECODE=1

# uv Cache
# Ref: https://docs.astral.sh/uv/guides/integration/docker/#caching
ENV UV_LINK_MODE=copy

# Install dependencies
# Ref: https://docs.astral.sh/uv/guides/integration/docker/#intermediate-layers
RUN --mount=type=cache,target=/root/.cache/uv \
    --mount=type=bind,source=uv.lock,target=uv.lock \
    --mount=type=bind,source=pyproject.toml,target=pyproject.toml \
    uv sync --frozen --no-install-project

ENV PYTHONPATH=/app

COPY ./scripts /app/scripts
COPY ./pyproject.toml ./uv.lock ./alembic.ini /app/

COPY ./app /app/app

# Sync the project
# Ref: https://docs.astral.sh/uv/guides/integration/docker/#intermediate-layers
# RUN --mount=type=cache,target=/root/.cache/uv \
#     uv sync --torch-backend=cpu
RUN --mount=type=cache,target=/root/.cache/uv \
    uv sync

RUN chmod a+x /app/scripts/entrypoint.sh
# CMD ["fastapi", "run", "--workers", "4", "app/main.py"]
CMD ["/app/scripts/entrypoint.sh"]
