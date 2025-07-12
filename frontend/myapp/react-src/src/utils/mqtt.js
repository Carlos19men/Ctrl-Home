import mqtt from 'mqtt';

let client = null;

export const connectMQTT = () => {
  if (client) return client;

  // Conectar al broker MQTT a través de WebSocket
  client = mqtt.connect('ws://localhost:9001', {
    username: '',
    password: ''
  });

  client.on('connect', () => {
    console.log('✅ Conectado al broker MQTT');
    client.subscribe('api/comando', (err) => {
      if (!err) {
        console.log('🟢 Suscrito al tópico: api/comando');
      } else {
        console.error('❌ Error al suscribirse:', err);
      }
    });
    client.subscribe('arduino/respuesta', (err) => {
      if (!err) {
        console.log('🟢 Suscrito al tópico: arduino/respuesta');
      }
    });
  });

  client.on('error', (err) => {
    console.error('❌ Error de conexión MQTT:', err);
  });

  client.on('close', () => {
    console.warn('⚠️ Conexión MQTT cerrada');
  });

  client.on('message', (topic, message) => {
    console.log('📩 Mensaje recibido:', topic, message.toString());
    if (topic === 'arduino/respuesta') {
      try {
        const respuesta = JSON.parse(message.toString());
        console.log('Respuesta del Arduino:', respuesta);
      } catch (e) {
        console.error('Error al procesar respuesta:', e);
      }
    }
  });

  return client;
};

export const publishCommand = (command) => {
  if (!client || !client.connected) {
    console.error('❌ Cliente MQTT no conectado');
    return;
  }

  const mensaje = {
    comando: command
  };

  console.log('📤 Enviando comando:', mensaje);
  client.publish('api/comando', JSON.stringify(mensaje), { qos: 1 }, (err) => {
    if (err) {
      console.error('❌ Error al enviar comando:', err);
    } else {
      console.log('✅ Comando enviado correctamente');
    }
  });
}; 