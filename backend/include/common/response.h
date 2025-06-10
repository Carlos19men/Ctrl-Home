#ifndef ClassResponse
#define ClassResponse

#include <string>
#include <map>
#include "../json.hpp"

using json = nlohmann::json;

// Estructura para representar una respuesta HTTP saliente
struct Response {
    int status_code;             // Ej., 200, 201, 404, 500
    json body;                   // El cuerpo de la respuesta como JSON
    std::string content_type;    // Ej., "application/json", "text/html", "text/plain"
    std::map<std::string, std::string> headers; // Encabezados de la respuesta HTTP

    // Constructor para conveniencia
    Response(int code = 200, const json& body_ = json::object(), const std::string& type_ = "application/json")
        : status_code(code), body(body_), content_type(type_) {
            headers["Content-Type"] = content_type;
        }

    // Constructor que acepta string body y lo convierte a JSON
    Response(int code, const std::string& bodyStr, const std::string& type_ = "application/json")
        : status_code(code), content_type(type_) {
        try {
            body = json::parse(bodyStr);
        } catch (const json::parse_error& e) {
            body = json::object();
        }
        headers["Content-Type"] = content_type;
    }

    // Métodos para manipular el body JSON
    template<typename T>
    T getBodyValue(const std::string& key, const T& defaultValue = T()) const {
        try {
            return body.value(key, defaultValue);
        } catch (const json::exception& e) {
            return defaultValue;
        }
    }

    template<typename T>
    void setBodyValue(const std::string& key, const T& value) {
        body[key] = value;
    }

    // Método para obtener el body como string JSON
    std::string getBodyString() const {
        return body.dump();
    }

    //setters a

    /**
     * @brief Set the Status Code object
     * 
     * @param code 
     */
    void setStatusCode(int code){
        status_code = code; 
    }

    /**
     * @brief Set the Body object
     * 
     * @param newBody 
     */
    void setBody(const json& newBody){
        body = newBody; 
    }

    /**
     * @brief 
     * 
     * @param key 
     * @param value 
     */
    void addHeader(const std::string& key, const std::string& value){
        headers[key] = value; 
    }

    // Métodos de conveniencia para respuestas comunes (static factory methods)

    /**
     * @brief Creates an HTTP 200 OK response.
     *
     * @param body The optional body content for the response.
     * @return A Response object configured for HTTP 200 OK.
     */
    static Response ok(const json& body = json::object()){
        return Response(200, body); 
    }

  /**
     * @brief Creates an HTTP 201 Created response.
     *
     * Useful after a successful resource creation.
     *
     * @param body The optional body content (e.g., the created resource's JSON).
     * @return A Response object configured for HTTP 201 Created.
     */
    static Response created(const json& body = json::object()){
        return Response(201, body); 
    }


    /**
     * @brief Creates an HTTP 204 No Content response.
     *
     * Used when a successful response has no body (e.g., DELETE).
     *
     * @return A Response object configured for HTTP 204 No Content.
     */
    static Response noContent(){
        return Response(204, json::object()); 
    }

       /**
     * @brief Creates an HTTP 400 Bad Request response.
     *
     * Indicates that the server cannot process the request due to client error.
     *
     * @param body The optional body content, usually an error message.
     * @return A Response object configured for HTTP 400 Bad Request.
     */
    static Response badRequest(const std::string& message = "Bad Request") {
        json error = {
            {"error", message}
        };
        return Response(400, error); 
    }

    /**
     * @brief Creates an HTTP 401 Unauthorized response.
     *
     * Indicates that authentication is required or has failed.
     *
     * @param body The optional body content, usually an error message.
     * @return A Response object configured for HTTP 401 Unauthorized.
     */
    static Response unauthorized(const std::string& message = "Unauthorized") {
        json error = {
            {"error", message}
        };
        return Response(401, error); 
    }


    /**
     * @brief Creates an HTTP 403 Forbidden response.
     *
     * Indicates that the client does not have access rights to the content.
     *
     * @param body The optional body content, usually an error message.
     * @return A Response object configured for HTTP 403 Forbidden.
     */
    static Response forbidden(const std::string& message = "Forbidden") {
        json error = {
            {"error", message}
        };
        return Response(403, error); 
    }

    /**
     * @brief Creates an HTTP 404 Not Found response.
     *
     * Indicates that the requested resource could not be found.
     *
     * @param body The optional body content, usually an error message.
     * @return A Response object configured for HTTP 404 Not Found.
     */
    static Response notFound(const std::string& message = "Not Found") {
        json error = {
            {"error", message}
        };
        return Response(404, error); 
    }


    /**
     * @brief Creates an HTTP 405 Method Not Allowed response.
     *
     * Indicates that the request method is known by the server but has been disabled.
     *
     * @param body The optional body content, usually an error message.
     * @return A Response object configured for HTTP 405 Method Not Allowed.
     */
    static Response methodNotAllowed(const std::string& message = "Method Not Allowed") {
        json error = {
            {"error", message}
        };
        return Response(405, error);
    }

    /**
     * @brief Creates an HTTP 500 Internal Server Error response.
     *
     * Indicates that the server encountered an unexpected condition.
     *
     * @param body The optional body content, usually an error message.
     * @return A Response object configured for HTTP 500 Internal Server Error.
     */
    static Response internalServerError(const std::string& message = "Internal Server Error") {
        json error = {
            {"error", message}
        };
        return Response(500, error);
    }

};

#endif // RESPONSE_H