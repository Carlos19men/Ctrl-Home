#!/bin/bash

# Script para probar el backend C++ compilado
# Uso: ./scripts/cheerp-test.sh

echo "🧪 Iniciando servidor de pruebas..."

# Verificar que el archivo de prueba existe
if [ ! -f "test_cheerp_integration.html" ]; then
    echo "❌ Error: test_cheerp_integration.html no encontrado"
    exit 1
fi

# Verificar que el backend compilado existe
if [ ! -f "frontend/myapp/react-src/public/cheerp_backend.js" ]; then
    echo "❌ Error: cheerp_backend.js no encontrado"
    echo "Ejecuta primero: ./scripts/cheerp-build.sh"
    exit 1
fi

echo "🌐 Servidor iniciado en http://localhost:8000"
echo "📄 Abre: http://localhost:8000/test_cheerp_integration.html"
echo "🛑 Presiona Ctrl+C para detener"

# Iniciar servidor Python
python3 -m http.server 8000 