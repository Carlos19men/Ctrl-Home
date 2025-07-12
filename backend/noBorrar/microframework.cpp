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

#define PORT 8080

//se define un tipo de dato llamado handlerFunc que recibe una función (alquiera), dicha función 
//debe retornar void y recibir un entero y dos string en ese orden 


using HandlerFunc = std::function<void(int, const std::string&, const std::string&)>;


//estructura de datos, guarda el metodo HTTP la ruta, tiene un operado de comparación 
struct RouteKey {
    //atributos 
    std::string method;
    std::string path;

    //operador de compración, compara el objeto actual con un entrante y devuelve verdadero o falso en caso 
    //tal 
    bool operator<(const RouteKey& other) const {
        return std::tie(method, path) < std::tie(other.method, other.path);
    }
};


//clase de errutdor o manejador de las rutas 
class Router {
    //tiene com atributo un diccionario de rutuas y para cada ruta (clave) existe una función de 
    //manejador (controlador) para esa ruta 
    std::map<RouteKey, HandlerFunc> routes;
public:
    //agrega una nueva ruta y un manejador para esa ruta 
    // la función recibe primero el metodo que se va a trabajar 
    // luego la ruta donde se va atrabajar 
    // finalmente el controlador que se va a encargar de manejar esa petición 
    void add(const std::string& method, const std::string& path, HandlerFunc handler) {

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
};

Router router;

//controlador del cliente 
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

void start_server() {
    //creamos el socket para el servidor 
    int server_fd = socket(AF_INET, SOCK_STREAM, 0);

    //evalumos en caso de algun error 
    if (server_fd == 0) {
        perror("socket failed");
        exit(EXIT_FAILURE);
    }

    //preparamos la firma para el servidor 
    int opt = 1;
    setsockopt(server_fd, SOL_SOCKET, SO_REUSEADDR, &opt, sizeof(opt));

    //preparamos la dirección de memoria 
    struct sockaddr_in address;
    address.sin_family = AF_INET;
    address.sin_addr.s_addr = INADDR_ANY;
    address.sin_port = htons(PORT);

    //enlazamos el servidor con la dirección de memoria asociada 
    if (bind(server_fd, (struct sockaddr*)&address, sizeof(address)) < 0) {
        perror("bind failed");
        exit(EXIT_FAILURE);
    }

    //escuchamos desde el puerto 
    if (listen(server_fd, 30) < 0) {
        perror("listen");
        exit(EXIT_FAILURE);
    }

    //mostramos un mensaje de salida 
    std::cout << "Servidor escuchando en http://localhost:" << PORT << std::endl;


    //creamos un bucle infinito para escuchar constatemente por erl puerto 
    while (true) {
        //establecemos el tamaño de nuestra dirección de memoria 
        int addrlen = sizeof(address);

        //aceptamos el mensaje de cliente 
        int client_fd = accept(server_fd, (struct sockaddr*)&address, (socklen_t*)&addrlen);
        if (client_fd < 0) {
            perror("accept");
            continue;
        }

        //creamos un bifurcación para que otro proceso pueda atender la request mientras que 
        //el padre sigue recibiendo solicitudes 
        pid_t pid = fork();
        if (pid == 0) {
            close(server_fd);
            handle_client(client_fd);
            exit(0);
        } else if (pid > 0) {
            close(client_fd);
        }
    }
}

int main() {
    signal(SIGCHLD, SIG_IGN); 
    //                     | este es el tecer parametro la función lambda 
    router.add("GET", "/", [](int fd, const std::string&, const std::string&) {
        Router::send_response(fd, "200 OK", "text/html", "<h1>Hola desde C++</h1>");
    });

    router.add("POST", "/api/echo", [](int fd, const std::string&, const std::string& body) {
        Router::send_response(fd, "200 OK", "application/json", body);
    });

    start_server();
    return 0;
}
