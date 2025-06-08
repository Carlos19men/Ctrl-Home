#include "usersControllers.h"
#include "../models/postgrest/UserModel.h"
#include <string>

int UserController::getAll() {
    return UserModel::getAll();
}

int UserController::getById(const std::string& req, const std::string& res) {
    // Aquí podrías extraer el ID del usuario de la solicitud 'req'
    // y luego llamar al modelo para obtener el usuario por ID.
    // Por simplicidad, asumimos que el ID es un número entero en la solicitud.
    // Convertir la solicitud a un ID de usuario
    return 5;
}

