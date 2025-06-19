cmake_minimum_required(VERSION 3.10)
project(MiProyectoMQTT CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED TRUE)

# Buscar las librerías Paho MQTT directamente
find_library(PAHO_MQTT_C_LIB paho-mqtt3c)
find_library(PAHO_MQTT_CPP_LIB paho-mqttpp3)
find_library(PAHO_MQTT_ASYNC_LIB paho-mqtt3as)

# Los directorios de cabeceras están en /usr/include/mqtt
set(PAHO_MQTT_INCLUDE_DIR "/usr/include")

if(NOT PAHO_MQTT_C_LIB OR NOT PAHO_MQTT_CPP_LIB OR NOT PAHO_MQTT_ASYNC_LIB)
    message(FATAL_ERROR "No se encontraron las librerías Paho MQTT")
endif()

# Define los directorios donde CMake buscará los archivos de cabecera (.h)
include_directories(
	src/core 
	src/core/data
	src/clients 
	src/topics 
	src/utils
	${PAHO_MQTT_INCLUDE_DIR}
)

# Define todos los archivos fuente de tu proyecto
file(GLOB_RECURSE PROJECT_SOURCES
    "src/main_integrated.cpp"
    "src/core/*.cpp"
    "src/clients/*.cpp"
    "src/topics/*.cpp"
    "src/utils/*.cpp"
    "src/core/data/*.cpp" # Si hay archivos .cpp en sub-subdirectorios
)

# Crea tu ejecutable principal a partir de todos los archivos fuente
add_executable(ctrl_home_integrated ${PROJECT_SOURCES})

# Vincula tu ejecutable con las librerías Paho MQTT
target_link_libraries(ctrl_home_integrated PRIVATE ${PAHO_MQTT_C_LIB} ${PAHO_MQTT_CPP_LIB} ${PAHO_MQTT_ASYNC_LIB})

message(STATUS "Paho MQTT C library: ${PAHO_MQTT_C_LIB}")
message(STATUS "Paho MQTT C++ library: ${PAHO_MQTT_CPP_LIB}")
message(STATUS "Paho MQTT Async library: ${PAHO_MQTT_ASYNC_LIB}")
message(STATUS "Paho MQTT include dir: ${PAHO_MQTT_INCLUDE_DIR}")