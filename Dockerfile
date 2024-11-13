# Establece la imagen base de Node.js
FROM node:16

# Crear el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar el archivo package.json y package-lock.json
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto de los archivos de la aplicación
COPY . .

# Exponer el puerto en el que corre la aplicación (asegúrate de que sea el puerto correcto)
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "start"]
