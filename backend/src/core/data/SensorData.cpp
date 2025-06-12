#include "SensorData.h"
#include <stdexcept> // Para std::runtime_error
#include <iostream>

// Constructor con parámetros
SensorData::SensorData(const std::string& device_id, float temperature)
    : device_id_(device_id), temperature_(temperature) {
    timestamp_ = getCurrentTimestampIso8601(); // Asigna el timestamp al crear el objeto
}

// Constructor por defecto
SensorData::SensorData()
    : device_id_(""), temperature_(0.0f), timestamp_("") {}

// Métodos Getters
std::string SensorData::getDeviceId() const {
    return device_id_;
}

float SensorData::getTemperature() const {
    return temperature_;
}

std::string SensorData::getTimestamp() const {
    return timestamp_;
}

// Método para serializar el objeto a una cadena JSON
std::string SensorData::toJsonString() const {
    json j;
    j["device_id"] = device_id_;
    j["temperature"] = temperature_;
    j["timestamp"] = timestamp_; // Ya está en formato ISO 8601
    return j.dump(); // Convierte el objeto JSON a string
}

// Método estático para deserializar una cadena JSON a un objeto SensorData
SensorData SensorData::fromJsonString(const std::string& jsonString) {
    try {
        json j = json::parse(jsonString);

        // Verifica si las claves existen antes de acceder a ellas
        if (!j.count("device_id") || !j.count("temperature") || !j.count("timestamp")) {
            throw std::runtime_error("JSON incompleto para SensorData.");
        }

        SensorData data;
        data.device_id_ = j.at("device_id").get<std::string>();
        data.temperature_ = j.at("temperature").get<float>();
        data.timestamp_ = j.at("timestamp").get<std::string>();
        return data;
    } catch (const json::parse_error& e) {
        std::cout << "Error de parseo JSON para SensorData: " << e.what() << std::endl;
        throw std::runtime_error("Error al parsear JSON de SensorData: " + std::string(e.what()));
    } catch (const json::out_of_range& e) {
        std::cout << "Error de rango JSON (clave no encontrada) para SensorData: " << e.what() << std::endl;
        throw std::runtime_error("Clave JSON no encontrada para SensorData: " + std::string(e.what()));
    } catch (const std::exception& e) {
        std::cout << "Error al deserializar SensorData: " << e.what() << std::endl;
        throw; // Relanza la excepción
    }
}

// Método helper para obtener el timestamp actual en formato ISO 8601
std::string SensorData::getCurrentTimestampIso8601() const {
    auto now = std::chrono::system_clock::now();
    std::time_t current_time = std::chrono::system_clock::to_time_t(now);

    std::ostringstream oss;
    oss << std::put_time(std::localtime(&current_time), "%Y-%m-%dT%H:%M:%S");

    // Añadir milisegundos para mayor precisión (opcional)
    auto duration = now.time_since_epoch();
    auto milliseconds = std::chrono::duration_cast<std::chrono::milliseconds>(duration) % 1000;
    oss << "." << std::setfill('0') << std::setw(3) << milliseconds.count();

    return oss.str();
}