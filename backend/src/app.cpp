#include "../include/controllers/UserController.h"
#include "../json.hpp"
#include <iostream>

using json = nlohmann::json;

int main() {
    // Example of creating a JSON response
    json response = {
        {"status", "success"},
        {"message", "Server is running"},
        {"data", {
            {"users", UserController::getAll()}
        }}
    };

    // Print the JSON response
    std::cout << response.dump(4) << std::endl;

    return 0;
}