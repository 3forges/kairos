#!/bin/bash

export COMPOSE_FILE=${COMPOSE_FILE:-compose.cpu.yaml}
# export WHISPER__COMPUTE_TYPE=int8
export WHISPER__COMPUTE_TYPE=${WHISPER__COMPUTE_TYPE:-'float32'}
export ALLOW_ORIGINS=${ALLOW_ORIGINS:-'["*"]'}
docker-compose up -d --force-recreate
