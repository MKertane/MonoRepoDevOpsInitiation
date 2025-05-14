FROM node:18

WORKDIR /app

# On copie les fichiers de dépendances en premier
COPY package*.json ./

# On installe les dépendances, y compris cors
RUN npm install

# On copie ensuite le reste du code
COPY . .

COPY password.sh /password.sh
RUN chmod +x /password.sh

ENTRYPOINT [ "/app/password.sh" ]


