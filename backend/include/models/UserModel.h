#ifndef ClassUserModel
#define ClassUserModel 

#include <string>
#include <vector> // Si el modelo gestionara una lista de usuarios, por ejemplo
#include "../json.hpp"

using json = nlohmann::json;

//esta clase es la que se conecta directamente con la base de datos 

class UserModel {
    public:
        //metodo estaticos 
        static json getAll(); 
        static json getById(int id); 
        static json getByRol(const std::string& rol); 

    private:

        //eliminamos el constructor (para que no sea instaciable)
        UserModel() = delete; 

        // También es buena práctica eliminar el constructor de copia y el operador de asignación
        // para reforzar que no es instanciable.
        UserModel(const UserModel&) = delete;
        UserModel& operator=(const UserModel&) = delete;

};

#endif