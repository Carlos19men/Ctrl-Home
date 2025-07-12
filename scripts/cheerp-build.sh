#!/bin/bash

# Script para compilar el backend C++ con Cheerp
# Uso: ./scripts/cheerp-build.sh

echo "🔨 Compilando backend C++ con Cheerp..."

# Verificar que Docker esté disponible
if ! command -v docker &> /dev/null; then
    echo "❌ Error: Docker no está instalado"
    exit 1
fi

# Verificar que la imagen de Cheerp esté disponible
if ! docker images | grep -q "cheerp-dev"; then
    echo "❌ Error: Imagen cheerp-dev no encontrada"
    echo "Ejecuta: docker build -f Dockerfile.cheerp -t cheerp-dev ."
    exit 1
fi

# Compilar el backend
echo "📦 Compilando cheerp_backend.cpp..."
docker run --rm -v "$(pwd):/workspace" -w /workspace cheerp-dev /opt/cheerp/bin/clang++ backend/src/cheerp_backend.cpp -o frontend/myapp/react-src/public/cheerp_backend.js -target cheerp

if [ $? -eq 0 ]; then
    echo "✅ Compilación exitosa!"
    echo "📁 Archivo generado: frontend/myapp/react-src/public/cheerp_backend.js"
else
    echo "❌ Error en la compilación"
    exit 1
fi

echo "🚀 Backend listo para usar en React!" 