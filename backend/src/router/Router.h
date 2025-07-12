// microframework_http.cpp
#include <iostream>
#include <unistd.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <string>
#include <sstream>  //osStringStream un string más flexible 
#include <map> //librería para el manejo de diccionarios clave-valor 
#include <functional>
#include <cstring>
#include <csignal>

#ifndef ClassRouter
#define ClassRouter


//función del controlador 
//se define la función funcController que será la función del controlador para la ruta 
using funcController = std::function<void(int, const std::string&, const std::string&)>;


//estructura de datos, guarda el metodo HTTP la ruta, tiene un operado de comparación 
struct RouteKey {
    //atributos 
    std::string method; //metodo http 
    std::string path;   // ruta 

    //operador de compración, compara el objeto actual con un entrante y devuelve verdadero o falso en caso 
    //tal 
    bool operator<(const RouteKey& other) const {
        return std::tie(method, path) < std::tie(other.method, other.path);
    }
};



//clase de errutdor o manejador de las rutas 
class Router {
private:
    //tiene com atributo un diccionario de rutuas y para cada ruta (clave) existe una función de 
    //manejador (controlador) para esa ruta 
    std::map<RouteKey, funcController> routes;
public:


    //agrega una nueva ruta y un manejador para esa ruta 
    // la función recibe primero el metodo que se va a trabajar 
    // luego la ruta donde se va atrabajar 
    // finalmente el controlador que se va a encargar de manejar esa petición 
    void addRoute(const std::string& method, const std::string& path, funcController handler) {

        //se busca en el mapa de metodos y rutas, el metodo y ruta especificados en los parametros 
        // y una vez encontrado se agrega el manejador
        routes[{method, path}] = handler;

        // es una forma más compacta de indicar que el mapa routes tiene un objeto routeKey al cual se le 
        //va a asignar un handler que es en este caso es un parametro 
    }

    //llamamos al controlador handle que corresponda al metodo y path que se le está asignan y este recibe un 
    // en caso de que la petición lo amerite 
    void handle(int client_fd, const std::string& method, const std::string& path, const std::string& body) {
     
        //infiere en un manejador 
        auto it = routes.find({method, path});
        if (it != routes.end()) {
            //it->second accede al valor del dicionario rutas, con este solamente estamos 
            //llamado a la funció que se encuentra alamacenada dentro del valor para el cual 
            //corresponde la clave (metodo + path)
            it->second(client_fd, path, body);

            //le estoy pasando los parametros la controlador para que este haga el respectivo manejo 
        } else {

            //en caso de que sea igual al final del mapa de rutas devolvemos un 404 (request not found)
            send_response(client_fd, "404 Not Found", "text/plain", "Ruta no encontrada");
        }
    }

    // es la estructura de una petición, esta recibe el inte del cliente y sirve para enviar mensajes en general 
    //se debe colocar en orden, cliente_fd, status, el content_type (tipo de contenido), y el body (cuerpo )
    static void send_response(int client_fd, const std::string& status, const std::string& content_type, const std::string& body) {
        
        //tipo de dato ostringstram para un manejo más flexible de los strings 
        std::ostringstream oss;

        //modificamos oss para crear la response 
        oss << "HTTP/1.1 " << status << "\r\n"
            << "Content-Type: " << content_type << "\r\n"
            << "Content-Length: " << body.size() << "\r\n"
            << "Connection: close\r\n\r\n"
            << body;

        //creamos el string propio 
        std::string response = oss.str();

        //envmiamos mediante el socket la respuesta referenciando su dirección de memoria 
        send(client_fd, response.c_str(), response.size(), 0);
    }

    void handle_client(int client_fd) {

        //asignamos un buffer para la request
        char buffer[4096] = {0};
    
    
        //recibimos la request y la guardamos en el buffer 
        int valread = recv(client_fd, buffer, sizeof(buffer), 0);
        if (valread <= 0) {
            close(client_fd);
            return;
        }
    
        //guardamos los caracteres de buffer en el string request 
        std::string request(buffer);
        std::istringstream req_stream(request);
        std::string method, path, version, line;
    
        //obtene la primera línea 
        std::getline(req_stream, line);
        std::istringstream line_stream(line);
    
        //extrae el método, el path y la versión 
        line_stream >> method >> path >> version;
    
        //creamos el cuerpo 
        std::string body;
    
        //verificamos si la consulta tiene cuerpo, y si lo tiene lo almacenamos en body 
        if (request.find("\r\n\r\n") != std::string::npos) {
            body = request.substr(request.find("\r\n\r\n") + 4);
        }
    
        //finalmente llamamos al controlador y le pasamos todoss los paramentros 
        router.handle(client_fd, method, path, body);
        close(client_fd);
    }
};



#endif