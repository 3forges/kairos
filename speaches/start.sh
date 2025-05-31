#!/bin/bash

export COMPOSE_FILE=${COMPOSE_FILE:-compose.cpu.yaml}
# export WHISPER__COMPUTE_TYPE=int8
export WHISPER__COMPUTE_TYPE=${WHISPER__COMPUTE_TYPE:-'float32'}
export ALLOW_ORIGINS=${ALLOW_ORIGINS:-'["*"]'}
export ENABLE_UI=${ENABLE_UI:-'False'}
export DEFAULT_LANGUAGE=${DEFAULT_LANGUAGE:-'fr'}
export DEFAULT_RESPONSE_FORMAT=${DEFAULT_RESPONSE_FORMAT:-'json'}

docker-compose up -d --force-recreate
