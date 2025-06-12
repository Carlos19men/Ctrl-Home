// src/core/Broker.cpp

#include "Broker.h"
#include <iostream>
#include <thread>   // Para std::this_thread::sleep_for
#include <chrono>   // Para std::chrono::seconds

// --- Implementación de la clase Callback ---

// Constructor de Callback
Callback::Callback(std::function<void(mqtt::const_message_ptr msg)> on_msg_cb)
    : on_message_callback_(on_msg_cb) {}

void Callback::connection_lost(const std::string& cause) {
    std::cerr << "[Callback] Conexión perdida: " << cause << std::endl;
    // Aquí puedes añadir lógica para intentar reconectar o notificar a la aplicación.
    // Esto se maneja en el ejemplo de main.cpp para async_client
}

void Callback::delivery_complete(mqtt::delivery_token_ptr tok) {
    // std::cout << "[Callback] Entrega completa para token: " << (tok ? tok->get_message_id() : -1) << std::endl;
}

void Callback::message_arrived(mqtt::const_message_ptr msg) {
    if (on_message_callback_) {
        on_message_callback_(msg);
    } else {
        std::cout << "[Callback] Mensaje recibido en tópico: '" << msg->get_topic() << "'"
                  << " | Contenido: '" << msg->to_string() << "'"
                  << " (sin handler externo registrado)" << std::endl;
    }
}

void Callback::on_success(const mqtt::token& tok) {
    std::cout << "[Callback] Operación exitosa (ID Token: " << tok.get_message_id() << ")" << std::endl;
}

void Callback::on_failure(const mqtt::token& tok) {
    std::cerr << "[Callback] ¡Operación fallida! (ID Token: " << tok.get_message_id() << ")";

    // get_reason_code() es relevante para MQTT v5.
    // Aunque el error de compilación inicial ya no está, esta parte es para logging.
    if (tok.get_reason_code() != 0) {
        std::cerr << " | Código de razón MQTT (v5): " << tok.get_reason_code();
    }
    std::cerr << std::endl;
}


// --- Implementación de la clase Broker ---

Broker::Broker(const std::string& address, const std::string& clientId)
    // --- ¡CAMBIO AQUÍ! cli_ es ahora async_client ---
    : cli_(address, clientId), connOpts_() {

    connOpts_.set_clean_session(true);

    auto message_handler_lambda = [this](mqtt::const_message_ptr msg_ptr) {
        this->internal_message_handler(msg_ptr);
    };

    cb_ = Callback(message_handler_lambda);
    cli_.set_callback(cb_);
}

Broker::~Broker() {
    if (cli_.is_connected()) {
        try {
            disconnect();
        } catch (const mqtt::exception& exc) {
            std::cerr << "Error en el destructor al desconectar: " << exc.what() << std::endl;
        }
    }
}

void Broker::connect() {
    try {
        std::cout << "[Broker] Intentando conectar al broker en: " << cli_.get_server_uri() << std::endl;
        // Ahora cli_.connect() devuelve un token, y wait() es válido.
        cli_.connect(connOpts_)->wait();
        std::cout << "[Broker] ¡Conectado exitosamente!" << std::endl;
    } catch (const mqtt::exception& exc) {
        std::cerr << "[Broker] Error de conexión: " << exc.what() << std::endl;
        throw;
    }
}

void Broker::disconnect() {
    try {
        std::cout << "[Broker] Desconectando..." << std::endl;
        // Ahora cli_.disconnect() devuelve un token, y wait() es válido.
        cli_.disconnect()->wait();
        std::cout << "[Broker] Desconectado." << std::endl;
    } catch (const mqtt::exception& exc) {
        std::cerr << "[Broker] Error al desconectar: " << exc.what() << std::endl;
        throw;
    }
}

bool Broker::is_connected() const {
    return cli_.is_connected();
}

void Broker::publish(const std::string& topic, const std::string& payload, int qos, bool retain) {
    try {
        mqtt::message_ptr pubmsg = mqtt::make_message(topic, payload);
        pubmsg->set_qos(qos);
        pubmsg->set_retained(retain);
        // Ahora cli_.publish() devuelve un token, y wait() es válido.
        cli_.publish(pubmsg)->wait();
        std::cout << "[Broker] Publicado: '" << payload << "' en tópico '" << topic << "'" << std::endl;
    } catch (const mqtt::exception& exc) {
        std::cerr << "[Broker] Error al publicar: " << exc.what() << std::endl;
        throw;
    }
}

void Broker::subscribe(const std::string& topic, int qos) {
    try {
        // Ahora cli_.subscribe() devuelve un token, y wait() es válido.
        cli_.subscribe(topic, qos)->wait();
        std::cout << "[Broker] Suscrito al tópico: '" << topic << "'" << std::endl;
    } catch (const mqtt::exception& exc) {
        std::cerr << "[Broker] Error al suscribirse: " << exc.what() << std::endl;
        throw;
    }
}

void Broker::unsubscribe(const std::string& topic) {
    try {
        // Ahora cli_.unsubscribe() devuelve un token, y wait() es válido.
        cli_.unsubscribe(topic)->wait();
        std::cout << "[Broker] Desuscrito del tópico: '" << topic << "'" << std::endl;
    } catch (const mqtt::exception& exc) {
        std::cerr << "[Broker] Error al desuscribirse: " << exc.what() << std::endl;
        throw;
    }
}

void Broker::set_message_callback(std::function<void(const std::string& topic, const std::string& message)> callback) {
    msg_callback_ = callback;
}

void Broker::internal_message_handler(mqtt::const_message_ptr msg_ptr) {
    std::string topic = msg_ptr->get_topic();
    std::string message_payload = msg_ptr->to_string();

    if (msg_callback_) {
        msg_callback_(topic, message_payload);
    } else {
        std::cout << "[Broker::internal_message_handler] Mensaje recibido, pero no hay callback de usuario registrado. Tópico: "
                  << topic << ", Contenido: " << message_payload << std::endl;
    }
}