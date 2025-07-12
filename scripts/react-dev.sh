#!/bin/bash

# Script para iniciar el servidor de desarrollo de React
# Uso: ./scripts/react-dev.sh

echo "⚛️ Iniciando servidor de desarrollo de React..."

# Verificar que estamos en el directorio correcto
if [ ! -f "frontend/myapp/react-src/package.json" ]; then
    echo "❌ Error: package.json no encontrado"
    echo "Asegúrate de estar en el directorio raíz del proyecto"
    exit 1
fi

# Verificar que el backend compilado existe
if [ ! -f "frontend/myapp/react-src/public/cheerp_backend.js" ]; then
    echo "⚠️ Advertencia: cheerp_backend.js no encontrado"
    echo "Ejecuta primero: ./scripts/cheerp-build.sh"
    echo "Continuando sin backend C++..."
fi

# Navegar al directorio de React
cd frontend/myapp/react-src

echo "🚀 Servidor iniciado en http://localhost:3000"
echo "📱 Abre: http://localhost:3000/login"
echo "🛑 Presiona Ctrl+C para detener"

# Iniciar servidor de desarrollo
npm start 