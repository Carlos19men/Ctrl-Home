#ifndef SENSORDATA_H
#define SENSORDATA_H

#include <string>
#include <chrono> // Para std::chrono::system_clock y std::chrono::duration
#include <ctime>  // Para std::time_t, std::localtime, std::put_time
#include <iomanip> // Para std::put_time
#include <sstream> // Para std::ostringstream

// Incluye la librería JSON (asumiendo que está en src/utils o accesible)
// Si la instalaste via apt, probablemente solo necesites #include <nlohmann/json.hpp>
// Si la descargaste y la pusiste en src/utils:
#include "../../utils/json.hpp" // Ajusta la ruta si la colocaste en otro lugar

// Alias para la librería JSON para mayor comodidad
using json = nlohmann::json;

class SensorData {
public:
    // Constructor con parámetros
    SensorData(const std::string& device_id, float temperature);

    // Constructor por defecto (puede ser útil para deserialización)
    SensorData();

    // Métodos Getters
    std::string getDeviceId() const;
    float getTemperature() const;
    std::string getTimestamp() const; // Retorna el timestamp en formato ISO 8601

    // Método para serializar el objeto a una cadena JSON
    std::string toJsonString() const;

    // Método estático para deserializar una cadena JSON a un objeto SensorData
    static SensorData fromJsonString(const std::string& jsonString);

private:
    std::string device_id_;
    float temperature_;
    std::string timestamp_; // Almacenado como string ISO 8601 para simplicidad en JSON

    // Método helper para obtener el timestamp actual en formato ISO 8601
    std::string getCurrentTimestampIso8601() const;
};

#endif // SENSORDATA_H