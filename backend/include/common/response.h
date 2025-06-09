#ifndef ClassResponse
#define ClassResponse

#include <string>
#include <map>

// Estructura para representar una respuesta HTTP saliente
struct Response {
    int status_code;             // Ej., 200, 201, 404, 500
    std::string body;            // El cuerpo de la respuesta (ej., datos JSON, HTML)
    std::string content_type;    // Ej., "application/json", "text/html", "text/plain"
    std::map<std::string, std::string> headers; // Encabezados de la respuesta HTTP

    // Constructor para conveniencia
    Response(int code = 200, const std::string& body_ = "", const std::string& type_ = "text/plain")
        : status_code(code), body(body_), content_type(type_) {
            headers["Content-Type"] = content_type; // Establece el encabezado Content-Type por defecto
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
    void setBody(const std::string& newBody){
        body = newBody; 
    }

    /**
     * @brief 
     * 
     * @param key 
     * @param value 
     */
    void addHeder(const std::string& key,const std::string& value){
        headers[key] = value; 
    }

    // Métodos de conveniencia para respuestas comunes (static factory methods)

    /**
     * @brief Creates an HTTP 200 OK response.
     *
     * @param body The optional body content for the response.
     * @return A Response object configured for HTTP 200 OK.
     */
    static Response ok(const std::string& body = ""){
        Response res; 
        res.setStatusCode(200);
        res.setBody(body);
        return res; 
    }

  /**
     * @brief Creates an HTTP 201 Created response.
     *
     * Useful after a successful resource creation.
     *
     * @param body The optional body content (e.g., the created resource's JSON).
     * @return A Response object configured for HTTP 201 Created.
     */
    static Response created(const std::string& body = ""){
        Response res; 
        res.setStatusCode(201);
        res.setBody(body);
        return res; 
    }


    /**
     * @brief Creates an HTTP 204 No Content response.
     *
     * Used when a successful response has no body (e.g., DELETE).
     *
     * @return A Response object configured for HTTP 204 No Content.
     */
    static Response noContent(){
        Response res; 
        res.setStatusCode(204);
        res.setBody("");
        return res; 
    }

       /**
     * @brief Creates an HTTP 400 Bad Request response.
     *
     * Indicates that the server cannot process the request due to client error.
     *
     * @param body The optional body content, usually an error message.
     * @return A Response object configured for HTTP 400 Bad Request.
     */
    static Response badRequest(const std::string& body = "Bad Request") {
        Response res;
        res.setStatusCode(400);
        res.setBody(body);
        return res; 
    }

    /**
     * @brief Creates an HTTP 401 Unauthorized response.
     *
     * Indicates that authentication is required or has failed.
     *
     * @param body The optional body content, usually an error message.
     * @return A Response object configured for HTTP 401 Unauthorized.
     */
    static Response unauthorized(const std::string& body = "Unauthorized") {
        Response res;
        res.setStatusCode(401);
        res.setBody(body);
        return res; 
    }


    /**
     * @brief Creates an HTTP 403 Forbidden response.
     *
     * Indicates that the client does not have access rights to the content.
     *
     * @param body The optional body content, usually an error message.
     * @return A Response object configured for HTTP 403 Forbidden.
     */
    static Response forbidden(const std::string& body = "Forbidden") {
        Response res;
        res.setStatusCode(403);
        res.setBody(body);
        return res; 
    }

    /**
     * @brief Creates an HTTP 404 Not Found response.
     *
     * Indicates that the requested resource could not be found.
     *
     * @param body The optional body content, usually an error message.
     * @return A Response object configured for HTTP 404 Not Found.
     */
    static Response notFound(const std::string& body = "Not Found") {
        Response res;
        res.setStatusCode(404);
        res.setBody(body);
        return res; 
    }


    /**
     * @brief Creates an HTTP 405 Method Not Allowed response.
     *
     * Indicates that the request method is known by the server but has been disabled.
     *
     * @param body The optional body content, usually an error message.
     * @return A Response object configured for HTTP 405 Method Not Allowed.
     */
    static Response methodNotAllowed(const std::string& body = "Method Not Allowed") {
        Response res;
        res.setStatusCode(405);
        res.setBody(body);
        return res;
    }

    /**
     * @brief Creates an HTTP 500 Internal Server Error response.
     *
     * Indicates that the server encountered an unexpected condition.
     *
     * @param body The optional body content, usually an error message.
     * @return A Response object configured for HTTP 500 Internal Server Error.
     */
    static Response internalServerError(const std::string& body = "Internal Server Error") {
        Response res;
        res.setStatusCode(500);
        res.setBody(body);
        return res;
    }

};

#endif // RESPONSE_H