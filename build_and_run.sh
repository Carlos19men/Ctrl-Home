#!/bin/bash

echo "🏗️  Construyendo Ctrl+Home integrado..."

# Navegar al directorio del backend
cd backend

# Crear directorio de construcción si no existe
mkdir -p build
cd build

# Configurar CMake
echo "📋 Configurando CMake..."
cmake ..

# Compilar el proyecto
echo "🔨 Compilando..."
make -j$(nproc)

if [ $? -eq 0 ]; then
    echo "✅ Compilación exitosa!"
    echo ""
    echo "🚀 Iniciando Ctrl+Home integrado..."
    echo "📱 Frontend: http://localhost:8080"
    echo "🔌 MQTT: tcp://localhost:1883"
    echo ""
    echo "Presiona Ctrl+C para detener"
    echo ""
    
    # Ejecutar el programa
    ./ctrl_home_integrated
else
    echo "❌ Error en la compilación"
    exit 1
fi 