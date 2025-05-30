#!/bin/bash

export COMPOSE_FILE=compose.cpu.yaml

export ALLOW_ORIGINS='["*"]'
docker-compose up -d --force-recreate
