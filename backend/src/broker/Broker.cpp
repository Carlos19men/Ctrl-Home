#include "broker/Broker.h"
#include <iostream>

Broker::Broker(const std::string& address, const std::string& clientId)
    : client_(new mqtt::async_client(address, clientId)), cb_(nullptr)
{
    connOpts_.set_clean_start(true);
    cb_ = new Callback(*this);
    client_->set_callback(*cb_);
}

Broker::~Broker() {
    disconnect();
    delete cb_;
    delete client_;
}

void Broker::connect() {
    try {
        std::cout << "[Broker] Connecting..." << std::endl;
        client_->connect(connOpts_)->wait();
        std::cout << "[Broker] Connected!" << std::endl;
    } catch (const mqtt::exception& e) {
        std::cerr << "[Broker] Connect failed: " << e.what() << std::endl;
    }
}

void Broker::disconnect() {
    try {
        if (client_->is_connected()) {
            client_->disconnect()->wait();
            std::cout << "[Broker] Disconnected." << std::endl;
        }
    } catch (const mqtt::exception& e) {
        std::cerr << "[Broker] Disconnect failed: " << e.what() << std::endl;
    }
}

void Broker::subscribe(const std::string& topic, int qos) {
    try {
        client_->subscribe(topic, qos)->wait();
        std::cout << "[Broker] Subscribed to: " << topic << std::endl;
    } catch (const mqtt::exception& e) {
        std::cerr << "[Broker] Subscribe failed: " << e.what() << std::endl;
    }
}

void Broker::set_message_callback(std::function<void(const std::string&, const std::string&)> callback) {
    msg_callback_ = callback;
}