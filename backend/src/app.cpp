// En src/app.cpp
#include "core/Broker.h" // Asegúrate de que la ruta sea correcta

int main() {
    const std::string BROKER_ADDRESS = "tcp://localhost:1883"; // Verifica que esta sea la IP y puerto correctos
    const std::string CLIENT_ID = "mi_aplicacion_cliente_unico_001"; // Debe ser único para cada cliente conectado

    try {
        Broker myBroker(BROKER_ADDRESS, CLIENT_ID);

        // --- ¡IMPORTANTE! Primero conectar ---
        myBroker.connect(); // Esto intentará conectar al broker

        // Luego de conectar, puedes publicar o suscribir
        myBroker.publish("test/topic", "Hola desde C++!", 1, false);

        // ... (resto de tu lógica, suscripciones, etc.) ...

        // Antes de terminar, desconectar
        myBroker.disconnect();

    } catch (const mqtt::exception& exc) {
        std::cerr << "Excepción crítica en main: " << exc.what() << std::endl;
        return 1; // Devuelve un código de error
    } catch (const std::exception& exc) { // Captura cualquier otra excepción estándar
        std::cerr << "Otra excepción en main: " << exc.what() << std::endl;
        return 1;
    }

    return 0;
}