#include "Router.h"

//implementamos los métodos 
void addRoute(const std::string& method, const std::string& path, funcController handler) {

    //se busca en el mapa de metodos y rutas, el metodo y ruta especificados en los parametros 
    // y una vez encontrado se agrega el manejador
    Router::routes[{method, path}] = handler;

    // es una forma más compacta de indicar que el mapa routes tiene un objeto routeKey al cual se le 
    //va a asignar un handler que es en este caso es un parametro 
}