# 🏠 Ctrl+Home - Sistema Integrado

Este proyecto integra el frontend React con el backend C++ MQTT en una sola aplicación.

## 🚀 Características

- **Backend C++**: Servidor MQTT para comunicación con dispositivos IoT
- **Frontend Integrado**: Interfaz web servida directamente por el backend
- **API REST**: Endpoints para interactuar con el sistema
- **Comunicación en Tiempo Real**: MQTT para mensajes instantáneos

## 📁 Estructura del Proyecto

```
Ctrl-Home/
├── backend/
│   ├── src/
│   │   ├── main_integrated.cpp    # Servidor integrado
│   │   ├── core/                  # Lógica MQTT
│   │   └── ...
│   └── CMakeLists.txt
├── frontend/
│   └── myapp/
│       └── react-src/             # Aplicación React
├── build_and_run.sh               # Script de construcción
└── README_INTEGRADO.md
```

## 🛠️ Instalación y Uso

### Prerrequisitos

1. **MQTT Broker**: Mosquitto instalado y ejecutándose
2. **Compilador C++**: GCC con soporte C++17
3. **CMake**: Versión 3.10 o superior
4. **Paho MQTT C++**: Librería instalada

### Instalación de Dependencias

```bash
# Instalar Mosquitto MQTT Broker
sudo apt update
sudo apt install mosquitto mosquitto-clients

# Instalar Paho MQTT C++
sudo apt install libpaho-mqtt-dev libpaho-mqttpp-dev

# Iniciar Mosquitto
sudo systemctl start mosquitto
sudo systemctl enable mosquitto
```

### Ejecución

1. **Construir y ejecutar el sistema integrado:**
   ```bash
   ./build_and_run.sh
   ```

2. **Acceder a la interfaz web:**
   - Abrir navegador en: http://localhost:8080

3. **Verificar MQTT:**
   - Broker: tcp://localhost:1883

## 🔧 API Endpoints

### GET /api/health
Verifica el estado del servidor.
```json
{
  "status": "ok",
  "message": "Servidor funcionando"
}
```

### GET /api/dispositivos
Obtiene lista de dispositivos.
```json
{
  "dispositivos": [
    {
      "id": 1,
      "nombre": "Lámpara Sala",
      "tipo": "Iluminación"
    }
  ]
}
```

## 📡 Tópicos MQTT

El sistema se suscribe a los siguientes tópicos:

- `api/dispositivos/get` - Obtener dispositivos
- `api/usuarios/login` - Autenticación
- `api/estado` - Estado del sistema

## 🎯 Funcionalidades

### Frontend Integrado
- Interfaz web moderna y responsiva
- Comunicación con API REST
- Visualización de estado del sistema
- Pruebas de conectividad MQTT

### Backend MQTT
- Conexión automática al broker
- Manejo de mensajes en tiempo real
- Suscripción a tópicos relevantes
- Logging de eventos

### Servidor HTTP
- Servidor web integrado
- Servir archivos estáticos
- API REST endpoints
- Manejo de solicitudes concurrentes

## 🔍 Troubleshooting

### Error de Compilación
```bash
# Verificar dependencias
pkg-config --exists paho-mqttpp3 && echo "MQTT OK" || echo "MQTT faltante"

# Reinstalar dependencias
sudo apt install --reinstall libpaho-mqtt-dev libpaho-mqttpp-dev
```

### Error de Conexión MQTT
```bash
# Verificar que Mosquitto esté ejecutándose
sudo systemctl status mosquitto

# Reiniciar Mosquitto
sudo systemctl restart mosquitto
```

### Puerto Ocupado
```bash
# Verificar puerto 8080
netstat -tulpn | grep :8080

# Cambiar puerto en main_integrated.cpp línea 280
```

## 🚀 Desarrollo

### Modificar el Frontend
1. Editar archivos en `frontend/myapp/react-src/`
2. El servidor integrado servirá automáticamente los cambios

### Agregar Endpoints API
1. Modificar `backend/src/main_integrated.cpp`
2. Agregar nuevos casos en `handleRequest()`
3. Recompilar con `./build_and_run.sh`

### Extender MQTT
1. Agregar suscripciones en `setupMQTT()`
2. Implementar lógica en el callback de mensajes
3. Recompilar y probar

## 📝 Logs

El sistema muestra logs en tiempo real:
- ✅ Conexiones exitosas
- ❌ Errores de conexión
- 📡 Mensajes MQTT recibidos
- 🌐 Solicitudes HTTP

## 🔒 Seguridad

- Validación de credenciales en login
- Sanitización de inputs
- Logging de eventos de seguridad
- Control de acceso por roles

## 📞 Soporte

Para problemas o preguntas:
1. Revisar logs del sistema
2. Verificar conectividad MQTT
3. Comprobar dependencias instaladas
4. Consultar este README

---

**¡Disfruta usando Ctrl+Home integrado! 🏠✨** 