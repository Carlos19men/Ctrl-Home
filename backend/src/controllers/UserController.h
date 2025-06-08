// importamos dependencias para las validaciones
#ifndef ClassUserController
#include <string> 


class UserController{

    public:
        static void getAll();
        static void getById(const std::string& req,const std::string& res);

    private: 
        UserController() = delete; // Eliminar el constructor para que no sea instanciable
        UserController(const UserController&) = delete; // Eliminar el constructor de copia
        UserController& operator=(const UserController&) = delete; // Eliminar el operador de asignación
};

#endif