#ifndef Request
#define ClassRequest

#include <string>
#include <map> // Para encabezados y parámetros de consulta

// Estructura para representar una solicitud HTTP entrante
struct Request {
    std::string method;         // Ej., "GET", "POST", "PUT", "DELETE"
    std::string path;           // Ej., "/users/123", "/products"
    std::string body;           // El cuerpo de la solicitud (ej., payload JSON)
    std::map<std::string, std::string> headers;       // Encabezados HTTP
    std::map<std::string, std::string> queryParams;  // Parámetros de consulta de la URL (ej., ?id=1)
    std::map<std::string, std::string> pathParams;


    // Constructor para conveniencia (puede extenderse)
    /**
     * @brief Construct a new Request object
     * 
     * @param method_ 
     * @param path_ 
     * @param body_ 
     */
    Request(const std::string& method_ = "", const std::string& path_ = "", const std::string& body_ = "")
        : method(method_), path(path_), body(body_) {}


    // Implementación inline directamente en el .h

    /**
     * @brief 
     * 
     * @param key 
     * @param value 
     */
    void addHeader(const std::string& key, const std::string& value) {
        headers[key] = value;
    }

    /**
     * @brief 
     * 
     * @param key 
     * @param value 
     */
    void addQueryParam(const std::string& key, const std::string& value) {
        queryParams[key] = value;
    }

    /**
     * @brief 
     * 
     * @param key 
     * @param value 
     */
    void addPathParam(const std::string& key, const std::string& value) {
        pathParams[key] = value;
    }

    /*  
     * @brief Get the Header object
     * 
     * @param key 
     * @return std::string 
     */
    std::string getHeader(const std::string& key) const {
        auto it = headers.find(key);
        return (it != headers.end()) ? it->second : "";
    }

    /**
     * @brief Get the Query Param object
     * 
     * @param key 
     * @return std::string 
     */
    std::string getQueryParam(const std::string& key) const {
        auto it = queryParams.find(key);
        return (it != queryParams.end()) ? it->second : "";
    }

    /**
     * @brief Get the Path Param object
     * 
     * @param key 
     * @return std::string 
     */
    std::string getPathParam(const std::string& key) const {
        auto it = pathParams.find(key);
        return (it != pathParams.end()) ? it->second : "";
    }
};

#endif // REQUEST_H