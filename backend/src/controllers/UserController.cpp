#include "../../include/controllers/UserController.h"
#include "../../include/models/UserModel.h"
#include "../../json.hpp"
#include <string>

using json = nlohmann::json;

json UserController::getAll() {
    // Get users from model
    json users = UserModel::getAll();
    
    // Create JSON response
    json response = {
        {"status", "success"},
        {"data", users}
    };
    
    return response;
}

json UserController::getById(const std::string& req, const std::string& res) {
    try {
        // Parse the request JSON
        json request = json::parse(req);
        int userId = request["id"];
        
        // Get user from model
        json user = UserModel::getById(userId);
        
        // Create JSON response
        json response = {
            {"status", "success"},
            {"data", user}
        };
        
        return response;
    } catch (const std::exception& e) {
        // Handle errors
        json error = {
            {"status", "error"},
            {"message", e.what()}
        };
        return error;
    }
}


