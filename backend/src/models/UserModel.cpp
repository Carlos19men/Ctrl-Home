#include "../../include/models/UserModel.h"
#include "../../json.hpp"

using json = nlohmann::json;

json UserModel::getAll() {
    // TODO: Implement actual database connection
    // For now, return mock data
    json users = json::array();
    users.push_back({
        {"id", 1},
        {"name", "John Doe"},
        {"email", "john@example.com"}
    });
    users.push_back({
        {"id", 2},
        {"name", "Jane Smith"},
        {"email", "jane@example.com"}
    });
    return users;
}

json UserModel::getById(int id) {
    // TODO: Implement actual database connection
    // For now, return mock data
    json user = {
        {"id", id},
        {"name", "John Doe"},
        {"email", "john@example.com"}
    };
    return user;
}

json UserModel::getByRol(const std::string& rol) {
    // TODO: Implement actual database connection
    // For now, return mock data
    json users = json::array();
    users.push_back({
        {"id", 1},
        {"name", "John Doe"},
        {"email", "john@example.com"},
        {"rol", rol}
    });
    return users;
} 