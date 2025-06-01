// microframework_http.cpp
#include <iostream>
#include <unistd.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <string>
#include <sstream>
#include <map>
#include <functional>
#include <cstring>
#include <csignal>

#define PORT 8080

using HandlerFunc = std::function<void(int, const std::string&, const std::string&)>;

struct RouteKey {
    std::string method;
    std::string path;
    bool operator<(const RouteKey& other) const {
        return std::tie(method, path) < std::tie(other.method, other.path);
    }
};

class Router {
    std::map<RouteKey, HandlerFunc> routes;
public:
    void add(const std::string& method, const std::string& path, HandlerFunc handler) {
        routes[{method, path}] = handler;
    }
    void handle(int client_fd, const std::string& method, const std::string& path, const std::string& body) {
        auto it = routes.find({method, path});
        if (it != routes.end()) {
            it->second(client_fd, path, body);
        } else {
            send_response(client_fd, "404 Not Found", "text/plain", "Ruta no encontrada");
        }
    }
    static void send_response(int client_fd, const std::string& status, const std::string& content_type, const std::string& body) {
        std::ostringstream oss;
        oss << "HTTP/1.1 " << status << "\r\n"
            << "Content-Type: " << content_type << "\r\n"
            << "Content-Length: " << body.size() << "\r\n"
            << "Connection: close\r\n\r\n"
            << body;
        std::string response = oss.str();
        send(client_fd, response.c_str(), response.size(), 0);
    }
};

Router router;

void handle_client(int client_fd) {
    char buffer[4096] = {0};
    int valread = recv(client_fd, buffer, sizeof(buffer), 0);
    if (valread <= 0) {
        close(client_fd);
        return;
    }
    std::string request(buffer);
    std::istringstream req_stream(request);
    std::string method, path, version, line;
    std::getline(req_stream, line);
    std::istringstream line_stream(line);
    line_stream >> method >> path >> version;

    std::string body;
    if (request.find("\r\n\r\n") != std::string::npos) {
        body = request.substr(request.find("\r\n\r\n") + 4);
    }

    router.handle(client_fd, method, path, body);
    close(client_fd);
}

void start_server() {
    int server_fd = socket(AF_INET, SOCK_STREAM, 0);
    if (server_fd == 0) {
        perror("socket failed");
        exit(EXIT_FAILURE);
    }

    int opt = 1;
    setsockopt(server_fd, SOL_SOCKET, SO_REUSEADDR, &opt, sizeof(opt));

    struct sockaddr_in address;
    address.sin_family = AF_INET;
    address.sin_addr.s_addr = INADDR_ANY;
    address.sin_port = htons(PORT);

    if (bind(server_fd, (struct sockaddr*)&address, sizeof(address)) < 0) {
        perror("bind failed");
        exit(EXIT_FAILURE);
    }

    if (listen(server_fd, 10) < 0) {
        perror("listen");
        exit(EXIT_FAILURE);
    }

    std::cout << "Servidor escuchando en http://localhost:" << PORT << std::endl;

    while (true) {
        int addrlen = sizeof(address);
        int client_fd = accept(server_fd, (struct sockaddr*)&address, (socklen_t*)&addrlen);
        if (client_fd < 0) {
            perror("accept");
            continue;
        }

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

    router.add("GET", "/", [](int fd, const std::string&, const std::string&) {
        Router::send_response(fd, "200 OK", "text/html", "<h1>Hola desde C++</h1>");
    });

    router.add("POST", "/api/echo", [](int fd, const std::string&, const std::string& body) {
        Router::send_response(fd, "200 OK", "application/json", body);
    });

    start_server();
    return 0;
}
