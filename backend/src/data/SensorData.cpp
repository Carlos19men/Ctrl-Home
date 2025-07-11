#include "SensorData.h"
#include "PostgresDB.h"
#include <nlohmann/json.hpp>
#include <chrono>
#include <iomanip>
#include <sstream>

using json = nlohmann::json;

// Constructor con parámetros
SensorData::SensorData(const std::string& device_id, float temperature)
    : device_id_(device_id), temperature_(temperature) {
    timestamp_ = getCurrentTimestampIso8601();
}

SensorData::SensorData()
    : device_id_(""), temperature_(0.0f), timestamp_("") {}

std::string SensorData::getDeviceId() const { return device_id_; }
float SensorData::getTemperature() const { return temperature_; }
std::string SensorData::getTimestamp() const { return timestamp_; }

std::string SensorData::toJsonString() const {
    json j;
    j["device_id"] = device_id_;
    j["temperature"] = temperature_;
    j["timestamp"] = timestamp_;
    return j.dump();
}

SensorData SensorData::fromJsonString(const std::string& jsonStr) {
    json j = json::parse(jsonStr);
    SensorData data;
    data.device_id_ = j.at("device_id").get<std::string>();
    data.temperature_ = j.at("temperature").get<float>();
    data.timestamp_ = j.value("timestamp", data.getCurrentTimestampIso8601());
    return data;
}

std::string SensorData::getCurrentTimestampIso8601() const {
    auto now = std::chrono::system_clock::now();
    std::time_t now_c = std::chrono::system_clock::to_time_t(now);
    std::tm tm = *std::gmtime(&now_c);
    std::ostringstream oss;
    oss << std::put_time(&tm, "%Y-%m-%dT%H:%M:%SZ");
    return oss.str();
}

void SensorData::updateDatabase(PostgresDB& db) const {
    std::string sql = "UPDATE domotica.sensores SET temperatura = " + std::to_string(temperature_) +
                      ", timestamp = '" + timestamp_ + "' WHERE device_id = '" + device_id_ + "'";
    db.query(sql);
}