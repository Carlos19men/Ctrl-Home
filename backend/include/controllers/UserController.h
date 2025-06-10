// importamos dependencias para las validaciones
#ifndef ClassUserController
#define ClassUserController

#include <string>
#include "../json.hpp"

using json = nlohmann::json;

class UserController {
public:
    static json getAll();
    static json getById(const std::string& req, const std::string& res);

private: 
    UserController() = delete; // Eliminar el constructor para que no sea instanciable
    UserController(const UserController&) = delete; // Eliminar el constructor de copia
    UserController& operator=(const UserController&) = delete; // Eliminar el operador de asignación
};

#endif