// src/core/Broker.h

#ifndef BROKER_H
#define BROKER_H

#include <string>
#include <vector>
#include <functional> // Para std::function
#include <mqtt/async_client.h> // <--- ¡CAMBIO AQUÍ! Usa async_client
#include <mqtt/callback.h>
#include <mqtt/properties.h>

// --- Declaración y Definición Completa de la Clase Callback ---
class Callback : public virtual mqtt::callback,
                 public virtual mqtt::iaction_listener
{
public:
    Callback(std::function<void(mqtt::const_message_ptr msg)> on_msg_cb = nullptr);

    void connection_lost(const std::string& cause) override;
    void delivery_complete(mqtt::delivery_token_ptr tok) override;
    void message_arrived(mqtt::const_message_ptr msg) override;

    void on_success(const mqtt::token& asyncActionToken) override;
    void on_failure(const mqtt::token& asyncActionToken) override;

private:
    std::function<void(mqtt::const_message_ptr msg)> on_message_callback_;
};


// --- Declaración de la clase Broker ---
class Broker {
public:
    Broker(const std::string& address, const std::string& clientId);
    ~Broker();

    void connect();
    void disconnect();
    bool is_connected() const;

    void publish(const std::string& topic, const std::string& payload, int qos = 1, bool retain = false);
    void subscribe(const std::string& topic, int qos = 1);
    void unsubscribe(const std::string& topic);

    void set_message_callback(std::function<void(const std::string& topic, const std::string& message)> callback);

private:
    // --- ¡CAMBIO CRÍTICO AQUÍ! Ahora es async_client ---
    mqtt::async_client cli_;
    mqtt::connect_options connOpts_;
    Callback cb_;

    std::function<void(const std::string& topic, const std::string& message)> msg_callback_;

    void internal_message_handler(mqtt::const_message_ptr msg_ptr);
};

#endif // BROKER_H