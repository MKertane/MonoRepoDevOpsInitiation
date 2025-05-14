#!/bin/bash
set -e

# Injecte le mot de passe à partir du secret
export POSTGRES_PASSWORD=$(cat /run/secrets/db_password)
echo "DB_PASSWORD=$POSTGRES_PASSWORD"
# Passer la variable au serveur
exec docker-entrypoint.sh postgres