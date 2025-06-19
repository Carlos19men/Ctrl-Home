#include "core/Broker.h"
#include <iostream>
#include <thread>
#include <chrono>
#include <filesystem>
#include <fstream>
#include <sstream>
#include <string>

// Servidor HTTP simple integrado
#include <sys/socket.h>
#include <netinet/in.h>
#include <unistd.h>
#include <cstring>

class SimpleHTTPServer {
private:
    int server_fd;
    Broker& mqttBroker;
    std::string frontendPath;
    
    // Función auxiliar para verificar si un string termina con otro
    bool endsWith(const std::string& str, const std::string& suffix) {
        if (str.length() < suffix.length()) return false;
        return str.compare(str.length() - suffix.length(), suffix.length(), suffix) == 0;
    }
    
public:
    SimpleHTTPServer(Broker& broker, const std::string& frontendDir) 
        : mqttBroker(broker), frontendPath(frontendDir) {}
    
    bool start(int port = 8080) {
        server_fd = socket(AF_INET, SOCK_STREAM, 0);
        if (server_fd == 0) {
            std::cerr << "Error creando socket" << std::endl;
            return false;
        }
        
        int opt = 1;
        if (setsockopt(server_fd, SOL_SOCKET, SO_REUSEADDR | SO_REUSEPORT, &opt, sizeof(opt))) {
            std::cerr << "Error configurando socket" << std::endl;
            return false;
        }
        
        struct sockaddr_in address;
        address.sin_family = AF_INET;
        address.sin_addr.s_addr = INADDR_ANY;
        address.sin_port = htons(port);
        
        if (bind(server_fd, (struct sockaddr *)&address, sizeof(address)) < 0) {
            std::cerr << "Error en bind" << std::endl;
            return false;
        }
        
        if (listen(server_fd, 3) < 0) {
            std::cerr << "Error en listen" << std::endl;
            return false;
        }
        
        std::cout << "🚀 Servidor HTTP iniciado en puerto " << port << std::endl;
        std::cout << "🔗 URL: http://localhost:" << port << std::endl;
        
        return true;
    }
    
    void handleRequest(int client_socket) {
        char buffer[1024] = {0};
        read(client_socket, buffer, 1024);
        
        std::string request(buffer);
        std::string response;
        
        // Parse the request line
        std::istringstream requestStream(request);
        std::string method, path, version;
        requestStream >> method >> path >> version;
        
        std::cout << "Request: " << method << " " << path << std::endl;
        
        if (method == "GET") {
            if (path == "/" || path == "/index.html") {
                // Always serve the React frontend index.html
                std::string filePath = frontendPath + "/index.html";
                std::ifstream file(filePath, std::ios::binary);
                
                if (file.is_open()) {
                    std::stringstream buffer;
                    buffer << file.rdbuf();
                    response = "HTTP/1.1 200 OK\r\nContent-Type: text/html\r\n\r\n" + buffer.str();
                } else {
                    // If React app not found, return 404
                    response = "HTTP/1.1 404 Not Found\r\nContent-Type: text/html\r\n\r\n<h1>Error: Frontend no encontrado</h1><p>El archivo index.html no se encuentra en " + frontendPath + "</p>";
                }
            } else if (path.find("/api/") == 0) {
                // Handle API requests
                if (path == "/api/health") {
                    response = "HTTP/1.1 200 OK\r\nContent-Type: application/json\r\nAccess-Control-Allow-Origin: *\r\n\r\n{\"status\":\"ok\",\"message\":\"Servidor funcionando\"}";
                } else if (path == "/api/dispositivos") {
                    // Check for Authorization header
                    std::string authHeader = "";
                    size_t authPos = request.find("Authorization: ");
                    if (authPos != std::string::npos) {
                        authPos += 15;
                        size_t authEnd = request.find("\r\n", authPos);
                        authHeader = request.substr(authPos, authEnd - authPos);
                    }
                    
                    // For now, allow access but log the request
                    std::cout << "API Request - Dispositivos - Auth: " << (authHeader.empty() ? "No" : "Yes") << std::endl;
                    response = "HTTP/1.1 200 OK\r\nContent-Type: application/json\r\nAccess-Control-Allow-Origin: *\r\n\r\n{\"dispositivos\":[{\"id\":1,\"nombre\":\"Lámpara Sala\",\"tipo\":\"Iluminación\",\"estado\":\"encendida\"},{\"id\":2,\"nombre\":\"Termostato\",\"tipo\":\"Climatización\",\"estado\":\"funcionando\"},{\"id\":3,\"nombre\":\"Sensor Movimiento\",\"tipo\":\"Seguridad\",\"estado\":\"activo\"}]}";
                } else if (path == "/api/estado") {
                    response = "HTTP/1.1 200 OK\r\nContent-Type: application/json\r\nAccess-Control-Allow-Origin: *\r\n\r\n{\"sistema\":\"Ctrl+Home\",\"version\":\"1.0.0\",\"estado\":\"funcionando\",\"mqtt\":\"conectado\",\"timestamp\":\"" + std::to_string(time(nullptr)) + "\"}";
                } else {
                    response = "HTTP/1.1 404 Not Found\r\nContent-Type: application/json\r\nAccess-Control-Allow-Origin: *\r\n\r\n{\"error\":\"Endpoint no encontrado\"}";
                }
            } else {
                // Try to serve static files first
                std::string filePath = frontendPath + path;
                std::ifstream file(filePath, std::ios::binary);
                
                if (file.is_open()) {
                    std::stringstream buffer;
                    buffer << file.rdbuf();
                    
                    response = "HTTP/1.1 200 OK\r\n";
                    
                    // Set content type based on file extension
                    if (endsWith(path, ".html")) {
                        response += "Content-Type: text/html\r\n";
                    } else if (endsWith(path, ".js")) {
                        response += "Content-Type: application/javascript\r\n";
                    } else if (endsWith(path, ".css")) {
                        response += "Content-Type: text/css\r\n";
                    } else if (endsWith(path, ".png")) {
                        response += "Content-Type: image/png\r\n";
                    } else if (endsWith(path, ".jpg") || endsWith(path, ".jpeg")) {
                        response += "Content-Type: image/jpeg\r\n";
                    } else {
                        response += "Content-Type: application/octet-stream\r\n";
                    }
                    
                    response += "\r\n" + buffer.str();
                } else {
                    // For SPA routing, serve index.html for any non-API route
                    std::string indexPath = frontendPath + "/index.html";
                    std::ifstream indexFile(indexPath, std::ios::binary);
                    
                    if (indexFile.is_open()) {
                        std::stringstream buffer;
                        buffer << indexFile.rdbuf();
                        response = "HTTP/1.1 200 OK\r\nContent-Type: text/html\r\n\r\n" + buffer.str();
                    } else {
                        response = "HTTP/1.1 404 Not Found\r\nContent-Type: text/html\r\n\r\n<h1>404 - Página no encontrada</h1>";
                    }
                }
            }
        } else if (method == "POST") {
            if (path == "/api/usuarios/login") {
                // Parse JSON request body
                std::string body = request.substr(request.find("\r\n\r\n") + 4);
                
                std::cout << "\n🔐 INTENTO DE LOGIN DETECTADO" << std::endl;
                std::cout << "📝 Body recibido: " << body << std::endl;
                
                // Simple JSON parsing for login credentials
                std::string usuario, password, rol;
                
                // Extract usuario
                size_t userPos = body.find("\"usuario\":\"");
                if (userPos != std::string::npos) {
                    userPos += 11;
                    size_t userEnd = body.find("\"", userPos);
                    usuario = body.substr(userPos, userEnd - userPos);
                }
                
                // Extract password
                size_t passPos = body.find("\"password\":\"");
                if (passPos != std::string::npos) {
                    passPos += 12;
                    size_t passEnd = body.find("\"", passPos);
                    password = body.substr(passPos, passEnd - passPos);
                }
                
                // Extract rol
                size_t rolPos = body.find("\"rol\":\"");
                if (rolPos != std::string::npos) {
                    rolPos += 7;
                    size_t rolEnd = body.find("\"", rolPos);
                    rol = body.substr(rolPos, rolEnd - rolPos);
                }
                
                std::cout << "👤 Usuario extraído: '" << usuario << "'" << std::endl;
                std::cout << "🔑 Contraseña extraída: '" << password << "'" << std::endl;
                std::cout << "👑 Rol extraído: '" << rol << "'" << std::endl;
                
                // Validate credentials
                bool isValid = false;
                std::string userRole = "";
                std::string reason = "";
                
                if (rol == "admin") {
                    if (usuario == "carlos" && password == "sasa") {
                        isValid = true;
                        userRole = "admin";
                        std::cout << "✅ CREDENCIALES VÁLIDAS - Admin: carlos" << std::endl;
                    } else {
                        reason = "Credenciales de administrador incorrectas";
                        if (usuario != "carlos") {
                            reason += " (usuario esperado: 'carlos', recibido: '" + usuario + "')";
                        }
                        if (password != "sasa") {
                            reason += " (contraseña esperada: 'sasa', recibida: '" + password + "')";
                        }
                        std::cout << "❌ CREDENCIALES INVÁLIDAS - Admin: " << reason << std::endl;
                    }
                } else if (rol == "usuario") {
                    if (usuario == "samuel" && password == "sa") {
                        isValid = true;
                        userRole = "usuario";
                        std::cout << "✅ CREDENCIALES VÁLIDAS - Usuario: samuel" << std::endl;
                    } else {
                        reason = "Credenciales de usuario incorrectas";
                        if (usuario != "samuel") {
                            reason += " (usuario esperado: 'samuel', recibido: '" + usuario + "')";
                        }
                        if (password != "sa") {
                            reason += " (contraseña esperada: 'sa', recibida: '" + password + "')";
                        }
                        std::cout << "❌ CREDENCIALES INVÁLIDAS - Usuario: " << reason << std::endl;
                    }
                } else {
                    reason = "Rol no válido: '" + rol + "' (debe ser 'admin' o 'usuario')";
                    std::cout << "❌ ROL INVÁLIDO: " << reason << std::endl;
                }
                
                if (isValid) {
                    std::cout << "🎉 LOGIN EXITOSO - Enviando respuesta 200" << std::endl;
                    response = "HTTP/1.1 200 OK\r\nContent-Type: application/json\r\nAccess-Control-Allow-Origin: *\r\nAccess-Control-Allow-Methods: POST\r\nAccess-Control-Allow-Headers: Content-Type\r\n\r\n{\"mensaje\":\"Login exitoso\",\"usuario\":\"" + usuario + "\",\"rol\":\"" + userRole + "\",\"token\":\"token_" + usuario + "_" + std::to_string(time(nullptr)) + "\"}";
                } else {
                    std::cout << "🚫 LOGIN FALLIDO - Enviando respuesta 401: " << reason << std::endl;
                    response = "HTTP/1.1 401 Unauthorized\r\nContent-Type: application/json\r\nAccess-Control-Allow-Origin: *\r\nAccess-Control-Allow-Methods: POST\r\nAccess-Control-Allow-Headers: Content-Type\r\n\r\n{\"error\":\"Credenciales inválidas\",\"mensaje\":\"" + reason + "\"}";
                }
                
                std::cout << "📤 Respuesta enviada al cliente" << std::endl;
                std::cout << "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" << std::endl;
            } else if (path == "/api/comando") {
                response = "HTTP/1.1 200 OK\r\nContent-Type: application/json\r\nAccess-Control-Allow-Origin: *\r\n\r\n{\"mensaje\":\"Comando ejecutado correctamente\"}";
            } else {
                response = "HTTP/1.1 404 Not Found\r\nContent-Type: application/json\r\nAccess-Control-Allow-Origin: *\r\n\r\n{\"error\":\"Endpoint no encontrado\"}";
            }
        } else if (method == "OPTIONS") {
            // Handle CORS preflight requests
            response = "HTTP/1.1 200 OK\r\nAccess-Control-Allow-Origin: *\r\nAccess-Control-Allow-Methods: GET, POST, OPTIONS\r\nAccess-Control-Allow-Headers: Content-Type\r\n\r\n";
        } else {
            response = "HTTP/1.1 405 Method Not Allowed\r\nContent-Type: text/plain\r\n\r\nMétodo no permitido";
        }
        
        send(client_socket, response.c_str(), response.length(), 0);
        close(client_socket);
    }
    
    std::string createIndexHTML() {
        std::string html = "HTTP/1.1 200 OK\r\n";
        html += "Content-Type: text/html\r\n\r\n";
        html += "<!DOCTYPE html>\n";
        html += "<html lang=\"es\">\n";
        html += "<head>\n";
        html += "    <meta charset=\"UTF-8\">\n";
        html += "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n";
        html += "    <title>Ctrl+Home - Sistema Integrado</title>\n";
        html += "    <style>\n";
        html += "        body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background: #667eea; color: white; }\n";
        html += "        .container { max-width: 800px; margin: 0 auto; background: rgba(255,255,255,0.1); padding: 20px; border-radius: 10px; }\n";
        html += "        button { background: #4CAF50; color: white; border: none; padding: 10px 20px; margin: 5px; cursor: pointer; }\n";
        html += "        .result { background: rgba(0,0,0,0.3); padding: 10px; margin-top: 10px; border-radius: 5px; }\n";
        html += "    </style>\n";
        html += "</head>\n";
        html += "<body>\n";
        html += "    <div class=\"container\">\n";
        html += "        <h1>🏠 Ctrl+Home</h1>\n";
        html += "        <p>✅ Sistema integrado funcionando correctamente</p>\n";
        html += "        <div>\n";
        html += "            <h3>🔧 API de Dispositivos</h3>\n";
        html += "            <button onclick=\"getDispositivos()\">Obtener Dispositivos</button>\n";
        html += "            <button onclick=\"getHealth()\">Verificar Salud</button>\n";
        html += "            <div id=\"result\" class=\"result\"></div>\n";
        html += "        </div>\n";
        html += "        <div>\n";
        html += "            <h3>📊 Estado del Sistema</h3>\n";
        html += "            <p>MQTT: Conectado</p>\n";
        html += "            <p>HTTP: Funcionando</p>\n";
        html += "        </div>\n";
        html += "    </div>\n";
        html += "    <script>\n";
        html += "        async function apiCall(endpoint) {\n";
        html += "            try {\n";
        html += "                const response = await fetch(endpoint);\n";
        html += "                const result = await response.json();\n";
        html += "                return result;\n";
        html += "            } catch (error) {\n";
        html += "                return { error: error.message };\n";
        html += "            }\n";
        html += "        }\n";
        html += "        async function getDispositivos() {\n";
        html += "            const result = await apiCall('/api/dispositivos');\n";
        html += "            document.getElementById('result').textContent = JSON.stringify(result, null, 2);\n";
        html += "        }\n";
        html += "        async function getHealth() {\n";
        html += "            const result = await apiCall('/api/health');\n";
        html += "            document.getElementById('result').textContent = JSON.stringify(result, null, 2);\n";
        html += "        }\n";
        html += "    </script>\n";
        html += "</body>\n";
        html += "</html>";
        
        return html;
    }
    
    void run() {
        while (true) {
            int client_socket;
            struct sockaddr_in address;
            int addrlen = sizeof(address);
            
            client_socket = accept(server_fd, (struct sockaddr *)&address, (socklen_t*)&addrlen);
            if (client_socket < 0) {
                std::cerr << "Error aceptando conexión" << std::endl;
                continue;
            }
            
            handleRequest(client_socket);
        }
    }
    
    ~SimpleHTTPServer() {
        if (server_fd > 0) {
            close(server_fd);
        }
    }
};

int main() {
    const std::string BROKER_ADDRESS = "tcp://localhost:1883";
    const std::string CLIENT_ID = "ctrl_home_integrated_001";
    const std::string FRONTEND_PATH = "../static";

    try {
        // Inicializar broker MQTT
        Broker mqttBroker(BROKER_ADDRESS, CLIENT_ID);
        mqttBroker.connect();
        
        // Suscribirse a tópicos MQTT
        mqttBroker.subscribe("api/dispositivos/get", 1);
        mqttBroker.subscribe("api/usuarios/login", 1);
        mqttBroker.subscribe("api/estado", 1);
        
        // Configurar callback para mensajes MQTT
        mqttBroker.set_message_callback([](const std::string& topic, const std::string& message) {
            std::cout << "MQTT - Tópico: " << topic << ", Mensaje: " << message << std::endl;
        });
        
        std::cout << "✅ MQTT conectado exitosamente" << std::endl;
        
        // Inicializar servidor HTTP
        SimpleHTTPServer httpServer(mqttBroker, FRONTEND_PATH);
        
        if (!httpServer.start(8080)) {
            std::cerr << "❌ Error iniciando servidor HTTP" << std::endl;
            return 1;
        }
        
        // Ejecutar servidor HTTP en un hilo separado
        std::thread httpThread([&httpServer]() {
            httpServer.run();
        });
        
        std::cout << "🎉 Sistema integrado iniciado correctamente!" << std::endl;
        std::cout << "📱 Frontend: http://localhost:8080" << std::endl;
        std::cout << "🔌 MQTT: " << BROKER_ADDRESS << std::endl;
        
        // Mantener el programa ejecutándose
        while (true) {
            std::this_thread::sleep_for(std::chrono::seconds(1));
        }
        
    } catch (const std::exception& e) {
        std::cerr << "❌ Error: " << e.what() << std::endl;
        return 1;
    }
    
    return 0;
} 