#include <cstring>
#include <iostream>
#include <string>

// Función auxiliar para convertir array de enteros a std::string
std::string intArrayToString(const int* arr, int length) {
    std::string result;
    for (int i = 0; i < length; i++) {
        result += static_cast<char>(arr[i]);
    }
    return result;
}

// Función auxiliar para convertir std::string a array de enteros
void stringToIntArray(const std::string& str, int* output, int maxLen) {
    int len = std::min(static_cast<int>(str.length()), maxLen - 1);
    for (int i = 0; i < len; i++) {
        output[i] = static_cast<int>(str[i]);
    }
    output[len] = 0; // Null terminator
}

// Función exportada para Cheerp - Validar credenciales
[[cheerp::jsexport]]
int validateCredentials(const int* username, int usernameLen, const int* password, int passwordLen, const int* role, int roleLen) {
    std::string userStr = intArrayToString(username, usernameLen);
    std::string passStr = intArrayToString(password, passwordLen);
    std::string roleStr = intArrayToString(role, roleLen);
    
    // Validación de credenciales
    if (roleStr == "admin") {
        if (userStr == "carlos" && passStr == "sasa") {
            return 1; // Login exitoso
        }
    } else if (roleStr == "usuario") {
        if (userStr == "samuel" && passStr == "sa") {
            return 1; // Login exitoso
        }
    }
    
    return 0; // Login fallido
}

// Función exportada para Cheerp - Obtener permisos del rol
[[cheerp::jsexport]]
int getRolePermissions(const int* role, int roleLen, int* permissions, int maxLen) {
    std::string roleStr = intArrayToString(role, roleLen);
    std::string perms;
    
    if (roleStr == "admin") {
        perms = "all:read,write,delete,create,update";
    } else if (roleStr == "usuario") {
        perms = "limited:read,write,update";
    } else if (roleStr == "invitado") {
        perms = "basic:read";
    } else {
        perms = "none";
    }
    
    stringToIntArray(perms, permissions, maxLen);
    return perms.length();
}

// Función exportada para Cheerp - Verificar si un rol puede acceder a un recurso
[[cheerp::jsexport]]
int canAccessResource(const int* role, int roleLen, const int* resource, int resourceLen, const int* action, int actionLen) {
    std::string roleStr = intArrayToString(role, roleLen);
    std::string resourceStr = intArrayToString(resource, resourceLen);
    std::string actionStr = intArrayToString(action, actionLen);
    
    // Lógica de permisos
    if (roleStr == "admin") {
        return 1; // Admin puede todo
    } else if (roleStr == "usuario") {
        if (resourceStr == "dispositivos" && (actionStr == "read" || actionStr == "write")) {
            return 1;
        } else if (resourceStr == "luz" && (actionStr == "read" || actionStr == "write")) {
            return 1;
        } else if (resourceStr == "clima" && (actionStr == "read" || actionStr == "write")) {
            return 1;
        }
    } else if (roleStr == "invitado") {
        if (resourceStr == "luz" && actionStr == "read") {
            return 1;
        }
    }
    
    return 0; // Acceso denegado
}

// Función exportada para Cheerp - Procesar comando MQTT
[[cheerp::jsexport]]
int processMQTTCommand(const int* topic, int topicLen, const int* message, int messageLen, int* response, int maxLen) {
    std::string topicStr = intArrayToString(topic, topicLen);
    std::string messageStr = intArrayToString(message, messageLen);
    std::string responseStr;
    
    if (topicStr == "api/usuarios/login") {
        // Extraer credenciales del mensaje
        size_t pos1 = messageStr.find(":");
        size_t pos2 = messageStr.find(":", pos1 + 1);
        
        if (pos1 != std::string::npos && pos2 != std::string::npos) {
            std::string role = messageStr.substr(0, pos1);
            std::string username = messageStr.substr(pos1 + 1, pos2 - pos1 - 1);
            std::string password = messageStr.substr(pos2 + 1);
            
            // Limpiar espacios
            username.erase(0, username.find_first_not_of(" "));
            password.erase(0, password.find_first_not_of(" "));
            
            // Convertir a arrays de enteros para la validación
            int userArr[50], passArr[50], roleArr[50];
            stringToIntArray(username, userArr, 50);
            stringToIntArray(password, passArr, 50);
            stringToIntArray(role, roleArr, 50);
            
            int isValid = validateCredentials(userArr, username.length(), passArr, password.length(), roleArr, role.length());
            
            if (isValid) {
                responseStr = "SUCCESS:Login exitoso para " + username;
            } else {
                responseStr = "ERROR:Credenciales inválidas";
            }
        } else {
            responseStr = "ERROR:Formato de mensaje inválido";
        }
    } else if (topicStr == "api/dispositivos/get") {
        responseStr = "SUCCESS:Lista de dispositivos obtenida";
    } else if (topicStr == "api/luz/zona") {
        responseStr = "SUCCESS:Comando de iluminación procesado";
    } else if (topicStr == "api/clima/zona") {
        responseStr = "SUCCESS:Comando de climatización procesado";
    } else {
        responseStr = "ERROR:Tópico no reconocido";
    }
    
    stringToIntArray(responseStr, response, maxLen);
    return responseStr.length();
}

// Función exportada para Cheerp - Obtener estado del sistema
[[cheerp::jsexport]]
int getSystemStatus(int* status, int maxLen) {
    std::string statusStr = "ONLINE:MQTT Broker conectado, 5 dispositivos activos";
    stringToIntArray(statusStr, status, maxLen);
    return statusStr.length();
}

// Función exportada para Cheerp - Convertir string a array de enteros
[[cheerp::jsexport]]
int stringToIntArrayHelper(const int* input, int inputLen, int* output, int maxLen) {
    std::string inputStr = intArrayToString(input, inputLen);
    stringToIntArray(inputStr, output, maxLen);
    return inputStr.length();
}

// Función exportada para Cheerp - Convertir array de enteros a string
[[cheerp::jsexport]]
int intArrayToStringHelper(const int* input, int inputLen, int* output, int maxLen) {
    std::string inputStr = intArrayToString(input, inputLen);
    stringToIntArray(inputStr, output, maxLen);
    return inputStr.length();
} 