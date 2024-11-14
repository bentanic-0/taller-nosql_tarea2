# Usar la imagen oficial de Node.js como base
FROM node:20

# Establecer el directorio de trabajo
WORKDIR /usr/src/app

# Copiar el package.json y package-lock.json
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto de la aplicación
COPY . .

# Exponer el puerto que utiliza la aplicación
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["node", "server.js"]