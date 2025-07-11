#pragma once
#include <string>
#include <nlohmann/json.hpp>

class PostgresDB; // Forward declaration

class SensorData {
public:
    SensorData();
    SensorData(const std::string& device_id, float temperature);

    std::string getDeviceId() const;
    float getTemperature() const;
    std::string getTimestamp() const;

    std::string toJsonString() const;
    static SensorData fromJsonString(const std::string& jsonStr);

    void updateDatabase(PostgresDB& db) const;

private:
    std::string device_id_;
    float temperature_;
    std::string timestamp_;
    std::string getCurrentTimestampIso8601() const;
};