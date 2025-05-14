#!/bin/sh

# Lire le secret
export POSTGRES_PASSWORD=$(cat /run/secrets/db_password | tr -d '\r\n')
echo "POSTGRES_PASSWORD=$POSTGRES_PASSWORD"
# Injecter la valeur dans une autre variable
export DB_PASSWORD="$POSTGRES_PASSWORD"

# (Facultatif) Debug
echo "DB_PASSWORD=$DB_PASSWORD"

# Lancer l'application
exec npm start