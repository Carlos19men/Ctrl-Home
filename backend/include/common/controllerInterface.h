#ifndef controllerInterface
#define controllerInterface

#include "request.h"
#include "response.h"

// Clase base abstracta para todos los manejadores de solicitudes (controladores)
class IController {
public:
    // El destructor virtual es crucial para una limpieza adecuada al eliminar objetos derivados
    // a través de un puntero a la clase base (ej., std::unique_ptr<Icontroller>)
    virtual ~IController() = default;

    // Método virtual puro para manejar una solicitud y devolver una respuesta.
    // Las clases derivadas DEBEN implementar esto.
    virtual Response controllerRequest(const Request& request) = 0;
};

#endif // I_controller