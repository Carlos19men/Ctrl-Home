// En src/app.cpp
#include "core/Broker.h" // Asegúrate de que la ruta sea correcta
#include <iostream>
#include <thread>

int main() {
    const std::string BROKER_ADDRESS = "tcp://localhost:1883"; // Verifica que esta sea la IP y puerto correctos
    const std::string CLIENT_ID = "mi_aplicacion_cliente_unico_001"; // Debe ser único para cada cliente conectado

    try {
        Broker myBroker(BROKER_ADDRESS, CLIENT_ID);

        // --- ¡IMPORTANTE! Primero conectar ---
        myBroker.connect(); // Esto intentará conectar al broker

        // Suscribirse a los tópicos de dispositivos
        myBroker.subscribe("api/dispositivos/get", 1);                // Listar dispositivos
        myBroker.subscribe("api/dispositivos/get/uso-frecuente", 1);  // Dispositivos más usados
        myBroker.subscribe("api/dispositivos/post", 1);               // Registrar nuevo dispositivo
        myBroker.subscribe("api/dispositivos/post/solicitud", 1);     // Solicitar acceso al dispositivo IOT
        myBroker.subscribe("api/dispositivos/patch", 1);              // Configurar dispositivo
        myBroker.subscribe("api/datos", 1); // Mandar datos desde el arduino al sistema (dispositivo IoT)
        myBroker.subscribe("api/estado", 1); // Obtener estado actual de un dispositivo (todos los roles)
        myBroker.subscribe("api/estado/escanear", 1); // Escanear estado general del sistema (mantenimiento, admin)
        myBroker.subscribe("api/estado/version", 1); // Verificar versión actual del firmware/software (admin, mantenimiento)
        myBroker.subscribe("api/estado/version/actualizar", 1); // Instalar actualización de software (admin, mantenimiento)
        myBroker.subscribe("api/estado/fallas", 1); // Ver historial de fallas (admin, mantenimiento)
        myBroker.subscribe("api/comando", 1); // Enviar comandos a un dispositivo (admin, usuario, mantenimiento)
        myBroker.subscribe("api/usuarios/login", 1); // Autenticación (admin, usuario)
        myBroker.subscribe("api/usuarios/perfil", 1); // Consultar datos del usuario autenticado (admin, usuario)
        myBroker.subscribe("api/usuarios/crear", 1); // Crear nuevo usuario (admin, usuario)
        myBroker.subscribe("api/usuarios/eliminar", 1); // Eliminar usuario (admin, usuario)
        myBroker.subscribe("api/roles/permisos", 1); // Consultar permisos asociados a un rol (admin)
        myBroker.subscribe("api/reportes", 1); // Generar reportes del sistema (admin)
        myBroker.subscribe("api/historial", 1); // Consultar historial de datos que ha enviado un dispositivo al sistema (admin, usuario)
        myBroker.subscribe("api/consumo", 1); // Ver consumo actual del dispositivo (todos los roles)
        myBroker.subscribe("api/consumo/comparar", 1); // Comparar consumo histórico (admin, usuario)
        myBroker.subscribe("api/consumo/recomendacion", 1); // Sugerencias de ahorro energético
        myBroker.subscribe("api/luz/zona", 1); // Encender/apagar luces (admin, usuario, invitado)
        myBroker.subscribe("api/luz/zona/programar", 1); // Programar iluminación automática (admin, usuario)
        myBroker.subscribe("api/clima/zona", 1); // Ajustar temperatura (admin, usuario, invitado)
        myBroker.subscribe("api/clima/zona/programar", 1); // Programar climatización automática (admin, usuario)
        myBroker.subscribe("api/backups", 1); // Ver respaldos existentes (admin)
        myBroker.subscribe("api/backups/crear", 1); // Crear respaldo manual (admin)
        myBroker.subscribe("api/backups/programar", 1); // Programar respaldos automáticos (admin)

        // Configurar el callback para manejar mensajes recibidos
        myBroker.set_message_callback([](const std::string& topic, const std::string& message) {
            std::cout << "Mensaje recibido en tópico: '" << topic << "'" << std::endl;
            std::cout << "Contenido: '" << message << "'" << std::endl;

            // Verificar permisos según el tópico
            if (topic == "api/dispositivos/get") {
                if (message.find("admin") != std::string::npos || message.find("usuario") != std::string::npos || message.find("mantenimiento") != std::string::npos) {
                    std::cout << "Acceso permitido: Listar dispositivos" << std::endl;
                } else {
                    std::cout << "Acceso denegado: Listar dispositivos" << std::endl;
                }
            } else if (topic == "api/dispositivos/get/uso-frecuente") {
                if (message.find("admin") != std::string::npos || message.find("usuario") != std::string::npos || message.find("mantenimiento") != std::string::npos) {
                    std::cout << "Acceso permitido: Dispositivos más usados" << std::endl;
                } else {
                    std::cout << "Acceso denegado: Dispositivos más usados" << std::endl;
                }
            } else if (topic == "api/dispositivos/post") {
                if (message.find("admin") != std::string::npos || message.find("usuario") != std::string::npos) {
                    std::cout << "Acceso permitido: Registrar nuevo dispositivo" << std::endl;
                } else {
                    std::cout << "Acceso denegado: Registrar nuevo dispositivo" << std::endl;
                }
            } else if (topic == "api/dispositivos/post/solicitud") {
                if (message.find("dispositivo IOT") != std::string::npos) {
                    std::cout << "Acceso permitido: Solicitar acceso al dispositivo IOT" << std::endl;
                } else {
                    std::cout << "Acceso denegado: Solicitar acceso al dispositivo IOT" << std::endl;
                }
            } else if (topic == "api/dispositivos/patch") {
                if (message.find("admin") != std::string::npos || message.find("usuario") != std::string::npos || message.find("mantenimiento") != std::string::npos) {
                    std::cout << "Acceso permitido: Configurar dispositivo" << std::endl;
                } else {
                    std::cout << "Acceso denegado: Configurar dispositivo" << std::endl;
                }
            } else if (topic == "api/datos") {
                if (message.find("dispositivo IOT") != std::string::npos) {
                    std::cout << "Datos recibidos desde el dispositivo IoT: '" << message << "'" << std::endl;
                } else {
                    std::cout << "Acceso denegado: Solo los dispositivos IoT pueden enviar datos." << std::endl;
                }
            } else if (topic == "api/estado") {
                std::cout << "Estado actual del dispositivo: '" << message << "'" << std::endl;
            } else if (topic == "api/estado/escanear") {
                if (message.find("admin") != std::string::npos || message.find("usuario") != std::string::npos || message.find("mantenimiento") != std::string::npos) {
                    std::cout << "Escaneando estado general del sistema: '" << message << "'" << std::endl;
                } else {
                    std::cout << "Acceso denegado: Solo admin, usuario y mantenimiento pueden escanear el sistema." << std::endl;
                }
            } else if (topic == "api/estado/version") {
                if (message.find("admin") != std::string::npos || message.find("usuario") != std::string::npos || message.find("mantenimiento") != std::string::npos) {
                    std::cout << "Versión actual del firmware/software: '" << message << "'" << std::endl;
                } else {
                    std::cout << "Acceso denegado: Solo admin, usuario y mantenimiento pueden verificar la versión." << std::endl;
                }
            } else if (topic == "api/estado/version/actualizar") {
                if (message.find("admin") != std::string::npos || message.find("usuario") != std::string::npos || message.find("mantenimiento") != std::string::npos) {
                    std::cout << "Actualizando software: '" << message << "'" << std::endl;
                } else {
                    std::cout << "Acceso denegado: Solo admin, usuario y mantenimiento pueden actualizar el software." << std::endl;
                }
            } else if (topic == "api/estado/fallas") {
                if (message.find("admin") != std::string::npos || message.find("usuario") != std::string::npos || message.find("mantenimiento") != std::string::npos) {
                    std::cout << "Historial de fallas: '" << message << "'" << std::endl;
                } else {
                    std::cout << "Acceso denegado: Solo admin, usuario y mantenimiento pueden ver el historial de fallas." << std::endl;
                }
            } else if (topic == "api/comando") {
                if (message.find("admin") != std::string::npos || message.find("usuario") != std::string::npos || message.find("mantenimiento") != std::string::npos) {
                    std::string dispositivo = message.substr(message.find(":") + 1); // Extraer el nombre del dispositivo
                    dispositivo.erase(0, dispositivo.find_first_not_of(" ")); // Eliminar espacios al inicio
                    std::cout << "Comando enviado al dispositivo: '" << dispositivo << "'" << std::endl;
                    // Logica segun el dispositivo
                    
                } else {
                    std::cout << "Acceso denegado: Solo admin, usuario y mantenimiento pueden enviar comandos." << std::endl;
                }
            } else if (topic == "api/usuarios/login") {
                if (message.find("admin") != std::string::npos || message.find("usuario") != std::string::npos) {
                    // Extraer el nombre de usuario y contraseña
                    size_t pos_rol = message.find(":");
                    size_t pos_pass = message.find(":", pos_rol + 1);
                    
                    if (pos_rol != std::string::npos && pos_pass != std::string::npos) {
                        std::string rol = message.substr(0, pos_rol);
                        std::string username = message.substr(pos_rol + 1, pos_pass - (pos_rol + 1));
                        std::string password = message.substr(pos_pass + 1);
                        
                        // Eliminar espacios en blanco
                        username.erase(0, username.find_first_not_of(" "));
                        username.erase(username.find_last_not_of(" ") + 1);
                        password.erase(0, password.find_first_not_of(" "));
                        
                        std::cout << "Intento de login - Rol: '" << rol << "', Usuario: '" << username << "'" << std::endl;
                        
                        // Validación simple de credenciales
                        bool loginExitoso = false;
                        std::string response;
                        
                        if (rol == "admin") {
                            if (username == "carlos" && password == "sasa") {
                                loginExitoso = true;
                                response = "Autenticación exitosa para administrador: " + username;
                                std::cout << "✓ Login exitoso como administrador" << std::endl;
                            } else {
                                response = "Error de autenticación: Credenciales de administrador inválidas";
                                std::cout << "✗ Login fallido como administrador" << std::endl;
                            }
                        } else if (rol == "usuario") {
                            if (username == "samuel" && password == "sa") {
                                loginExitoso = true;
                                response = "Autenticación exitosa para usuario: " + username;
                                std::cout << "✓ Login exitoso como usuario normal" << std::endl;
                            } else {
                                response = "Error de autenticación: Credenciales de usuario inválidas";
                                std::cout << "✗ Login fallido como usuario normal" << std::endl;
                            }
                        } else {
                            response = "Error: Rol no válido. Use 'admin' o 'usuario'";
                            std::cout << "✗ Rol no válido" << std::endl;
                        }
                    } else {
                        std::cout << "Formato de login inválido. Use: rol: usuario: contraseña" << std::endl;
                    }
                } else {
                    std::cout << "Acceso denegado: Solo admin y usuario pueden autenticarse." << std::endl;
                }
            } else if (topic == "api/usuarios/perfil") {
                if (message.find("admin") != std::string::npos || message.find("usuario") != std::string::npos) {
                    std::string nombreUsuario = message.substr(message.find(":") + 1); // Extraer el nombre del usuario
                    nombreUsuario.erase(0, nombreUsuario.find_first_not_of(" ")); // Eliminar espacios al inicio
                    std::cout << "Datos del usuario autenticado: '" << nombreUsuario << "'" << std::endl;
                } else {
                    std::cout << "Acceso denegado: Solo admin y usuario pueden consultar su perfil." << std::endl;
                }
            } else if (topic == "api/usuarios/crear") {
                if (message.find("admin") != std::string::npos || message.find("usuario") != std::string::npos) {
                    std::string nombreUsuario = message.substr(message.find(":") + 1); // Extraer el nombre del usuario
                    nombreUsuario.erase(0, nombreUsuario.find_first_not_of(" ")); // Eliminar espacios al inicio
                    std::cout << "Nuevo usuario creado: '" << nombreUsuario << "'" << std::endl;
                } else {
                    std::cout << "Acceso denegado: Solo admin y usuario pueden crear nuevos usuarios." << std::endl;
                }
            } else if (topic == "api/usuarios/eliminar") {
                if (message.find("admin") != std::string::npos || message.find("usuario") != std::string::npos) {
                    std::string nombreUsuario = message.substr(message.find(":") + 1); // Extraer el nombre del usuario
                    nombreUsuario.erase(0, nombreUsuario.find_first_not_of(" ")); // Eliminar espacios al inicio
                    std::cout << "Usuario eliminado: '" << nombreUsuario << "'" << std::endl;
                } else {
                    std::cout << "Acceso denegado: Solo admin y usuario pueden eliminar usuarios." << std::endl;
                }
            } else if (topic == "api/roles/permisos") {
                if (message.find("admin") != std::string::npos) {
                    std::string rol = message.substr(message.find(":") + 1); // Extraer el rol
                    rol.erase(0, rol.find_first_not_of(" ")); // Eliminar espacios al inicio
                    std::cout << "Permisos asociados al rol: '" << rol << "'" << std::endl;
                    if (rol == "usuario") {
                        std::cout << "El usuario puede realizar las siguientes acciones:" << std::endl;
                        std::cout << "- Ver el estado actual de un dispositivo." << std::endl;
                        std::cout << "- Escanear el estado general del sistema." << std::endl;
                        std::cout << "- Verificar la versión actual del firmware/software." << std::endl;
                        std::cout << "- Instalar actualizaciones de software." << std::endl;
                        std::cout << "- Ver el historial de fallas." << std::endl;
                        std::cout << "- Enviar comandos a un dispositivo." << std::endl;
                        std::cout << "- Autenticarse." << std::endl;
                        std::cout << "- Consultar datos del usuario autenticado." << std::endl;
                        std::cout << "- Crear nuevos usuarios." << std::endl;
                        std::cout << "- Eliminar usuarios." << std::endl;
                        std::cout << "- Ajustar la temperatura en una zona." << std::endl;
                        std::cout << "- Programar iluminación automática." << std::endl;
                        std::cout << "- Ver respaldos existentes." << std::endl;
                        std::cout << "- Crear respaldos manuales." << std::endl;
                        std::cout << "- Programar respaldos automáticos." << std::endl;
                    } else if (rol == "admin") {
                        std::cout << "El admin puede realizar todas las acciones disponibles." << std::endl;
                    } else if (rol == "mantenimiento") {
                        std::cout << "El mantenimiento puede realizar las siguientes acciones:" << std::endl;
                        std::cout << "- Ver el estado actual de un dispositivo." << std::endl;
                        std::cout << "- Escanear el estado general del sistema." << std::endl;
                        std::cout << "- Verificar la versión actual del firmware/software." << std::endl;
                        std::cout << "- Instalar actualizaciones de software." << std::endl;
                        std::cout << "- Ver el historial de fallas." << std::endl;
                        std::cout << "- Enviar comandos a un dispositivo." << std::endl;
                        std::cout << "- Ajustar la temperatura en una zona." << std::endl;
                        std::cout << "- Programar iluminación automática." << std::endl;
                        std::cout << "- Ver respaldos existentes." << std::endl;
                        std::cout << "- Crear respaldos manuales." << std::endl;
                        std::cout << "- Programar respaldos automáticos." << std::endl;
                    } else if (rol == "dispositivo IOT") {
                        std::cout << "El dispositivo IOT puede realizar las siguientes acciones:" << std::endl;
                        std::cout << "- Enviar datos al sistema." << std::endl;
                    } else if (rol == "invitado") {
                        std::cout << "El invitado puede realizar las siguientes acciones:" << std::endl;
                        std::cout << "- Ajustar la temperatura en una zona." << std::endl;
                        std::cout << "- Encender/apagar luces en una zona." << std::endl;
                    }
                } else {
                    std::cout << "Acceso denegado: Solo el admin puede consultar los permisos de un rol." << std::endl;
                }
            } else if (topic == "api/reportes") {
                if (message.find("admin") != std::string::npos) {
                    std::cout << "Generando reportes del sistema: '" << message << "'" << std::endl;
                    // Aquí puedes agregar lógica para generar los reportes
                } else {
                    std::cout << "Acceso denegado: Solo el admin puede generar reportes del sistema." << std::endl;
                }
            } else if (topic == "api/historial") {
                if (message.find("admin") != std::string::npos || message.find("usuario") != std::string::npos || message.find("mantenimiento") != std::string::npos) {
                    std::string dispositivo = message.substr(message.find(":") + 1); // Extraer el nombre del dispositivo
                    dispositivo.erase(0, dispositivo.find_first_not_of(" ")); // Eliminar espacios al inicio
                    std::cout << "Consultando historial de datos del dispositivo: '" << dispositivo << "'" << std::endl;
                    // Aquí puedes agregar lógica para consultar el historial
                } else {
                    std::cout << "Acceso denegado: Solo admin, usuario y mantenimiento pueden consultar el historial de datos." << std::endl;
                }
            } else if (topic == "api/consumo") {
                std::string dispositivo = message.substr(message.find(":") + 1); // Extraer el nombre del dispositivo
                dispositivo.erase(0, dispositivo.find_first_not_of(" ")); // Eliminar espacios al inicio
                std::cout << "Consumo actual del dispositivo: '" << dispositivo << "'" << std::endl;
            } else if (topic == "api/consumo/comparar") {
                if (message.find("admin") != std::string::npos || message.find("usuario") != std::string::npos || message.find("mantenimiento") != std::string::npos) {
                    std::string dispositivo = message.substr(message.find(":") + 1); // Extraer el nombre del dispositivo
                    dispositivo.erase(0, dispositivo.find_first_not_of(" ")); // Eliminar espacios al inicio
                    std::cout << "Comparando consumo histórico del dispositivo: '" << dispositivo << "'" << std::endl;
                } else {
                    std::cout << "Acceso denegado: Solo admin, usuario y mantenimiento pueden comparar el consumo histórico." << std::endl;
                }
            } else if (topic == "api/consumo/recomendacion") {
                std::string dispositivo = message.substr(message.find(":") + 1); // Extraer el nombre del dispositivo
                dispositivo.erase(0, dispositivo.find_first_not_of(" ")); // Eliminar espacios al inicio
                std::cout << "Sugerencias de ahorro energético para el dispositivo: '" << dispositivo << "'" << std::endl;
            } else if (topic == "api/luz/zona") {
                if (message.find("admin") != std::string::npos || message.find("usuario") != std::string::npos || message.find("invitado") != std::string::npos) {
                    // Extraer la zona
                    size_t pos_rol = message.find(":");
                    size_t pos_accion = message.find("accion:");
                    std::string zona;
                    if (pos_rol != std::string::npos && pos_accion != std::string::npos) {
                        zona = message.substr(pos_rol + 1, pos_accion - (pos_rol + 1));
                        zona.erase(0, zona.find_first_not_of(" "));
                        zona.erase(zona.find_last_not_of(" ") + 1);
                    } else {
                        zona = "desconocida";
                    }
                    // Extraer la acción
                    std::string accion = message.substr(pos_accion + 7);
                    accion.erase(0, accion.find_first_not_of(" "));
                    std::cout << "Acción en la zona: '" << zona << "' - " << accion << std::endl;
                } else {
                    std::cout << "Acceso denegado: Solo admin, usuario e invitado pueden encender/apagar luces." << std::endl;
                }
            } else if (topic == "api/luz/zona/programar") {
                if (message.find("admin") != std::string::npos || message.find("usuario") != std::string::npos) {
                    std::string zona = message.substr(message.find(":") + 1); // Extraer el nombre de la zona
                    zona.erase(0, zona.find_first_not_of(" ")); // Eliminar espacios al inicio
                    std::cout << "Programando iluminación automática en la zona: '" << zona << "'" << std::endl;
                } else {
                    std::cout << "Acceso denegado: Solo admin y usuario pueden programar iluminación automática." << std::endl;
                }
            } else if (topic == "api/clima/zona") {
                if (message.find("admin") != std::string::npos || message.find("usuario") != std::string::npos || message.find("invitado") != std::string::npos) {
                    // Extraer la zona
                    size_t pos_rol = message.find(":");
                    size_t pos_temp = message.find("temperatura:");
                    std::string zona;
                    if (pos_rol != std::string::npos && pos_temp != std::string::npos) {
                        zona = message.substr(pos_rol + 1, pos_temp - (pos_rol + 1));
                        zona.erase(0, zona.find_first_not_of(" "));
                        zona.erase(zona.find_last_not_of(" ") + 1);
                    } else {
                        zona = "desconocida";
                    }
                    // Extraer la temperatura
                    std::string temperatura = message.substr(pos_temp + 12);
                    temperatura.erase(0, temperatura.find_first_not_of(" "));
                    std::cout << "Ajustando temperatura en la zona: '" << zona << "' a temperatura: '" << temperatura << "'" << std::endl;
                } else {
                    std::cout << "Acceso denegado: Solo admin, usuario e invitado pueden ajustar la temperatura." << std::endl;
                }
            } else if (topic == "api/clima/zona/programar") {
                if (message.find("admin") != std::string::npos || message.find("usuario") != std::string::npos) {
                    std::string zona = message.substr(message.find(":") + 1); // Extraer el nombre de la zona
                    zona.erase(0, zona.find_first_not_of(" ")); // Eliminar espacios al inicio
                    std::cout << "Programando climatización automática en la zona: '" << zona << "'" << std::endl;
                } else {
                    std::cout << "Acceso denegado: Solo admin y usuario pueden programar la climatización automática." << std::endl;
                }
            } else if (topic == "api/backups") {
                if (message.find("admin") != std::string::npos) {
                    std::cout << "Ver respaldos existentes: '" << message << "'" << std::endl;
                } else {
                    std::cout << "Acceso denegado: Solo el admin puede ver los respaldos existentes." << std::endl;
                }
            } else if (topic == "api/backups/crear") {
                if (message.find("admin") != std::string::npos) {
                    std::cout << "Creando respaldo manual: '" << message << "'" << std::endl;
                } else {
                    std::cout << "Acceso denegado: Solo el admin puede crear respaldos manuales." << std::endl;
                }
            } else if (topic == "api/backups/programar") {
                if (message.find("admin") != std::string::npos) {
                    std::cout << "Programando respaldos automáticos: '" << message << "'" << std::endl;
                } else {
                    std::cout << "Acceso denegado: Solo el admin puede programar respaldos automáticos." << std::endl;
                }
            }
        });

        // Mantener el servidor en ejecución
        std::cout << "Servidor MQTT en ejecución. Presiona Ctrl+C para detener." << std::endl;
        while (true) {
            std::this_thread::sleep_for(std::chrono::seconds(1));
        }

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