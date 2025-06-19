#include "crow.h"
#include "core/Broker.h"
#include <iostream>
#include <fstream>
#include <sstream>
#include <thread>
#include <filesystem>

class IntegratedServer {
private:
    crow::SimpleApp app;
    Broker mqttBroker;
    std::string frontendPath;
    
public:
    IntegratedServer(const std::string& brokerAddress, const std::string& clientId, const std::string& frontendDir)
        : mqttBroker(brokerAddress, clientId), frontendPath(frontendDir) {
        
        setupRoutes();
        setupMQTT();
    }
    
    void setupRoutes() {
        // Ruta principal - servir index.html
        CROW_ROUTE(app, "/")([this]() {
            return serveFile("index.html");
        });
        
        // Servir archivos estáticos del frontend
        CROW_ROUTE(app, "/<path>")([this](std::string path) {
            return serveFile(path);
        });
        
        // API endpoints
        CROW_ROUTE(app, "/api/dispositivos")
        .methods("GET"_method, "POST"_method)
        ([this](const crow::request& req) {
            return handleDispositivosAPI(req);
        });
        
        CROW_ROUTE(app, "/api/usuarios/login")
        .methods("POST"_method)
        ([this](const crow::request& req) {
            return handleLoginAPI(req);
        });
        
        CROW_ROUTE(app, "/api/estado")
        .methods("GET"_method)
        ([this]() {
            return handleEstadoAPI();
        });
        
        // Endpoint para verificar que el servidor está funcionando
        CROW_ROUTE(app, "/api/health")([]() {
            crow::json::wvalue response;
            response["status"] = "ok";
            response["message"] = "Servidor funcionando correctamente";
            return crow::response(200, response);
        });
    }
    
    void setupMQTT() {
        try {
            mqttBroker.connect();
            
            // Suscribirse a tópicos MQTT
            mqttBroker.subscribe("api/dispositivos/get", 1);
            mqttBroker.subscribe("api/usuarios/login", 1);
            mqttBroker.subscribe("api/estado", 1);
            
            // Configurar callback para mensajes MQTT
            mqttBroker.set_message_callback([this](const std::string& topic, const std::string& message) {
                std::cout << "MQTT - Tópico: " << topic << ", Mensaje: " << message << std::endl;
            });
            
        } catch (const std::exception& e) {
            std::cerr << "Error conectando MQTT: " << e.what() << std::endl;
        }
    }
    
    crow::response serveFile(const std::string& filename) {
        std::string filePath = frontendPath + "/" + filename;
        
        // Si es index.html y no existe, crear uno básico
        if (filename == "index.html" && !std::filesystem::exists(filePath)) {
            return createBasicIndex();
        }
        
        std::ifstream file(filePath, std::ios::binary);
        if (!file.is_open()) {
            return crow::response(404, "Archivo no encontrado");
        }
        
        std::stringstream buffer;
        buffer << file.rdbuf();
        
        crow::response response(buffer.str());
        
        // Determinar el tipo MIME basado en la extensión
        if (filename.ends_with(".html")) {
            response.set_header("Content-Type", "text/html");
        } else if (filename.ends_with(".js")) {
            response.set_header("Content-Type", "application/javascript");
        } else if (filename.ends_with(".css")) {
            response.set_header("Content-Type", "text/css");
        } else if (filename.ends_with(".png")) {
            response.set_header("Content-Type", "image/png");
        } else if (filename.ends_with(".jpg") || filename.ends_with(".jpeg")) {
            response.set_header("Content-Type", "image/jpeg");
        }
        
        return response;
    }
    
    crow::response createBasicIndex() {
        std::string html = R"(
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ctrl+Home - Sistema Integrado</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            min-height: 100vh;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 15px;
            padding: 30px;
            backdrop-filter: blur(10px);
        }
        h1 {
            text-align: center;
            margin-bottom: 30px;
            font-size: 2.5em;
        }
        .status {
            background: rgba(0, 255, 0, 0.2);
            padding: 15px;
            border-radius: 10px;
            margin: 20px 0;
            text-align: center;
        }
        .api-section {
            background: rgba(255, 255, 255, 0.1);
            padding: 20px;
            border-radius: 10px;
            margin: 20px 0;
        }
        .api-section h3 {
            margin-top: 0;
        }
        button {
            background: #4CAF50;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            margin: 5px;
        }
        button:hover {
            background: #45a049;
        }
        .result {
            background: rgba(0, 0, 0, 0.3);
            padding: 10px;
            border-radius: 5px;
            margin-top: 10px;
            white-space: pre-wrap;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🏠 Ctrl+Home</h1>
        <div class="status">
            ✅ Sistema integrado funcionando correctamente
        </div>
        
        <div class="api-section">
            <h3>🔧 API de Dispositivos</h3>
            <button onclick="getDispositivos()">Obtener Dispositivos</button>
            <button onclick="postDispositivo()">Agregar Dispositivo</button>
            <div id="dispositivos-result" class="result"></div>
        </div>
        
        <div class="api-section">
            <h3>👤 Autenticación</h3>
            <button onclick="loginAdmin()">Login Admin</button>
            <button onclick="loginUsuario()">Login Usuario</button>
            <div id="login-result" class="result"></div>
        </div>
        
        <div class="api-section">
            <h3>📊 Estado del Sistema</h3>
            <button onclick="getEstado()">Ver Estado</button>
            <button onclick="getHealth()">Verificar Salud</button>
            <div id="estado-result" class="result"></div>
        </div>
    </div>

    <script>
        async function apiCall(endpoint, method = 'GET', data = null) {
            try {
                const options = {
                    method: method,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                };
                
                if (data) {
                    options.body = JSON.stringify(data);
                }
                
                const response = await fetch(endpoint, options);
                const result = await response.json();
                return result;
            } catch (error) {
                return { error: error.message };
            }
        }
        
        async function getDispositivos() {
            const result = await apiCall('/api/dispositivos');
            document.getElementById('dispositivos-result').textContent = JSON.stringify(result, null, 2);
        }
        
        async function postDispositivo() {
            const data = {
                nombre: 'Nuevo Dispositivo',
                tipo: 'IoT',
                ubicacion: 'Sala'
            };
            const result = await apiCall('/api/dispositivos', 'POST', data);
            document.getElementById('dispositivos-result').textContent = JSON.stringify(result, null, 2);
        }
        
        async function loginAdmin() {
            const data = {
                rol: 'admin',
                usuario: 'carlos',
                password: 'sasa'
            };
            const result = await apiCall('/api/usuarios/login', 'POST', data);
            document.getElementById('login-result').textContent = JSON.stringify(result, null, 2);
        }
        
        async function loginUsuario() {
            const data = {
                rol: 'usuario',
                usuario: 'samuel',
                password: 'sa'
            };
            const result = await apiCall('/api/usuarios/login', 'POST', data);
            document.getElementById('login-result').textContent = JSON.stringify(result, null, 2);
        }
        
        async function getEstado() {
            const result = await apiCall('/api/estado');
            document.getElementById('estado-result').textContent = JSON.stringify(result, null, 2);
        }
        
        async function getHealth() {
            const result = await apiCall('/api/health');
            document.getElementById('estado-result').textContent = JSON.stringify(result, null, 2);
        }
    </script>
</body>
</html>
        )";
        
        crow::response response(html);
        response.set_header("Content-Type", "text/html");
        return response;
    }
    
    crow::response handleDispositivosAPI(const crow::request& req) {
        crow::json::wvalue response;
        
        if (req.method == "GET"_method) {
            response["dispositivos"] = crow::json::load(R"([
                {"id": 1, "nombre": "Lámpara Sala", "tipo": "Iluminación", "estado": "encendida"},
                {"id": 2, "nombre": "Termostato", "tipo": "Climatización", "estado": "funcionando"},
                {"id": 3, "nombre": "Sensor Movimiento", "tipo": "Seguridad", "estado": "activo"}
            ])");
            response["mensaje"] = "Dispositivos obtenidos correctamente";
        } else if (req.method == "POST"_method) {
            auto body = crow::json::load(req.body);
            if (body.has("nombre") && body.has("tipo")) {
                response["mensaje"] = "Dispositivo agregado correctamente";
                response["dispositivo"] = body;
            } else {
                response["error"] = "Datos incompletos";
                return crow::response(400, response);
            }
        }
        
        return crow::response(200, response);
    }
    
    crow::response handleLoginAPI(const crow::request& req) {
        auto body = crow::json::load(req.body);
        crow::json::wvalue response;
        
        if (body.has("rol") && body.has("usuario") && body.has("password")) {
            std::string rol = body["rol"].s();
            std::string usuario = body["usuario"].s();
            std::string password = body["password"].s();
            
            bool loginExitoso = false;
            
            if (rol == "admin" && usuario == "carlos" && password == "sasa") {
                loginExitoso = true;
            } else if (rol == "usuario" && usuario == "samuel" && password == "sa") {
                loginExitoso = true;
            }
            
            if (loginExitoso) {
                response["mensaje"] = "Login exitoso";
                response["usuario"] = usuario;
                response["rol"] = rol;
                response["token"] = "token_" + usuario + "_" + std::to_string(time(nullptr));
            } else {
                response["error"] = "Credenciales inválidas";
                return crow::response(401, response);
            }
        } else {
            response["error"] = "Datos incompletos";
            return crow::response(400, response);
        }
        
        return crow::response(200, response);
    }
    
    crow::response handleEstadoAPI() {
        crow::json::wvalue response;
        response["sistema"] = "Ctrl+Home";
        response["version"] = "1.0.0";
        response["estado"] = "funcionando";
        response["mqtt"] = "conectado";
        response["timestamp"] = std::to_string(time(nullptr));
        
        return crow::response(200, response);
    }
    
    void run(int port = 8080) {
        std::cout << "🚀 Servidor integrado iniciando en puerto " << port << std::endl;
        std::cout << "📁 Frontend path: " << frontendPath << std::endl;
        std::cout << "🔗 URL: http://localhost:" << port << std::endl;
        
        app.port(port).multithreaded().run();
    }
}; 