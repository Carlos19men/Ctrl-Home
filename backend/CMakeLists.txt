cmake_minimum_required(VERSION 3.10)
project(mqtt_app)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# Encontrar paquete Paho MQTT C++
find_package(PahoMqttCpp REQUIRED)

# Crear el ejecutable
add_executable(mqtt_app 
    src/app.cpp 
    src/core/Broker.cpp 
    src/core/data/SensorData.cpp
)

# Vincular con Paho MQTT C++
target_link_libraries(mqtt_app
    paho-mqttpp3
    paho-mqtt3as
    pthread
)

# Incluir directorios de encabezados
target_include_directories(mqtt_app PRIVATE
    ${CMAKE_CURRENT_SOURCE_DIR}/src
    ${CMAKE_CURRENT_SOURCE_DIR}/include
)