#include "UserController.h"
#include "../models/postgres/UserModel.h"
#include <string>

void UserController::getAll() {
    UserModel::getAll();
}

void UserController::getById(const std::string& req, const std::string& res) {
    // Aquí podrías extraer el ID del usuario de la solicitud 'req'
    // y luego llamar al modelo para obtener el usuario por ID.
    // Por simplicidad, asumimos que el ID es un número entero en la solicitud.
    // Convertir la solicitud a un ID de usuario
    UserModel::getById(0); 
}


