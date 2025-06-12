cmake_minimum_required(VERSION 3.10)
project(MiProyectoMQTT CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED TRUE)

# Busca el paquete de Paho MQTT C++ que instalaste
find_package(PahoMqttCpp REQUIRED)

# Define los directorios donde CMake buscará los archivos de cabecera (.h)
include_directories(
	src/core 
	src/core/data
	src/clients 
	src/topics 
	src/utils
)

# Define todos los archivos fuente de tu proyecto
file(GLOB_RECURSE PROJECT_SOURCES
    "src/app.cpp"
    "src/core/*.cpp"
    "src/clients/*.cpp"
    "src/topics/*.cpp"
    "src/utils/*.cpp"
    "src/core/data/*.cpp" # Si hay archivos .cpp en sub-subdirectorios
)

# Crea tu ejecutable principal a partir de todos los archivos fuente
add_executable(mqtt_app ${PROJECT_SOURCES})

# Vincula tu ejecutable con la librería Paho MQTT C++
target_link_libraries(mqtt_app PRIVATE PahoMqttCpp::paho-mqttpp3)

# Opcional: Para asegurar que los encabezados sean encontrados, aunque include_directories ya ayuda
target_include_directories(mqtt_app PRIVATE ${PAHO_MQTT_CPP_INCLUDE_DIRS})