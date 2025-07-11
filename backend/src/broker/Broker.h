#pragma once

#include <string>
#include <functional>
#include <mqtt/async_client.h>

class Broker {
public:
    Broker(const std::string& address, const std::string& clientId);
    ~Broker();

    void connect();
    void disconnect();
    void publish(const std::string& topic, const std::string& payload, int qos = 1, bool retain = false);
    void subscribe(const std::string& topic, int qos = 1);
    void set_message_callback(std::function<void(const std::string&, const std::string&)> callback);

private:
    mqtt::async_client* client_;
    mqtt::connect_options connOpts_;
    std::function<void(const std::string&, const std::string&)> msg_callback_;

    class Callback : public virtual mqtt::callback {
        Broker& broker_;
    public:
        Callback(Broker& broker) : broker_(broker) {}
        void message_arrived(mqtt::const_message_ptr msg) override {
            if (broker_.msg_callback_) {
                broker_.msg_callback_(msg->get_topic(), msg->to_string());
            }
        }
    };
    Callback* cb_;
};