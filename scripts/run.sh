#!/bin/bash

# Colores para los mensajes
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Función para imprimir mensajes con color
print_message() {
    echo -e "${BLUE}[Ctrl-Home]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[✓]${NC} $1"
}

print_error() {
    echo -e "${RED}[✗]${NC} $1"
}

# Función para compilar y ejecutar el backend
run_backend() {
    print_message "Compilando el backend..."
    cd backend
    if [ ! -d "build" ]; then
        mkdir build
    fi
    cd build
    cmake ..
    make
    if [ $? -eq 0 ]; then
        print_success "Backend compilado exitosamente"
        print_message "Ejecutando el backend..."
        ./ctrl_home
    else
        print_error "Error al compilar el backend"
        exit 1
    fi
    cd ../..
}

# Función para ejecutar el frontend
run_frontend() {
    print_message "Iniciando el frontend..."
    cd frontend/myapp
    npm install
    if [ $? -eq 0 ]; then
        print_success "Dependencias del frontend instaladas"
        npm start
    else
        print_error "Error al instalar dependencias del frontend"
        exit 1
    fi
    cd ../..
}

# Mostrar menú de opciones
show_menu() {
    echo -e "\n${BLUE}=== Ctrl-Home - Sistema de Control ====${NC}"
    echo "1) Ejecutar todo (Backend + Frontend)"
    echo "2) Ejecutar solo Backend"
    echo "3) Ejecutar solo Frontend"
    echo "4) Salir"
    echo -n "Seleccione una opción: "
}

# Función principal
main() {
    while true; do
        show_menu
        read -r opt

        case $opt in
            1)
                # Ejecutar backend en segundo plano
                run_backend &
                sleep 2 # Esperar a que el backend inicie
                run_frontend
                ;;
            2)
                run_backend
                ;;
            3)
                run_frontend
                ;;
            4)
                print_message "Saliendo..."
                exit 0
                ;;
            *)
                print_error "Opción inválida"
                ;;
        esac
    done
}

# Iniciar el script
main 