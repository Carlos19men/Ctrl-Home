#ifndef ClassUserModel
#define ClassUserModel 

#include <string>
#include <vector> // Si el modelo gestionara una lista de usuarios, por ejemplo
#include <functional> // Para usar std::function para callbacks/eventos


//esta clase es la que se conecta directamente con la base de datos 

class UserModel {
    public:
        //metodo estaticos 
        static void getAll(); 
        static void getById(int id); 
        static void getByRol(const std::string& rol); 

    private:

        //eliminamos el constructor (para que no sea instaciable)
        UserModel() = delete; 

        // También es buena práctica eliminar el constructor de copia y el operador de asignación
        // para reforzar que no es instanciable.
        UserModel(const UserModel&) = delete;
        UserModel& operator=(const UserModel&) = delete;

};

#endif