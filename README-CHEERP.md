# 🚀 Integración C++ con React - Guía del Equipo

## 📋 Resumen
Este proyecto integra un backend C++ con un frontend React usando **Cheerp** (compilador C++ a JavaScript/WebAssembly).

## 🛠️ Comandos Rápidos

### **1. Compilar Backend C++**
```bash
./scripts/cheerp-build.sh
```
- Compila `backend/src/cheerp_backend.cpp` a JavaScript
- Genera `frontend/myapp/react-src/public/cheerp_backend.js`

### **2. Probar Backend**
```bash
./scripts/cheerp-test.sh
```
- Inicia servidor en `http://localhost:8000`
- Abre `test_cheerp_integration.html` para pruebas

### **3. Iniciar React**
```bash
./scripts/react-dev.sh
```
- Inicia servidor de desarrollo en `http://localhost:3000`
- Abre `/login` para probar la integración

## 🔧 Funcionalidades Disponibles

### **Credenciales Válidas:**
- **Admin:** `carlos` / `sasa` / `admin`
- **Usuario:** `samuel` / `sa` / `usuario`

### **Funciones C++ Exportadas:**
```javascript
// Escribir en buffer global
window.writeToBuffer(offset, value)

// Leer del buffer global  
window.readFromBuffer(offset)

// Validar credenciales
window.validateCredentials(usernameOffset, usernameLen, passwordOffset, passwordLen, roleOffset, roleLen)

// Obtener tamaño del buffer
window.getBufferSize()
```

## 📁 Estructura de Archivos

```
Ctrl-Home/
├── backend/src/cheerp_backend.cpp    # Código C++ del backend
├── frontend/myapp/react-src/
│   ├── public/cheerp_backend.js      # Módulo compilado
│   └── src/pages/Login.jsx           # Componente con integración
├── test_cheerp_integration.html      # Archivo de prueba
├── scripts/
│   ├── cheerp-build.sh               # Script de compilación
│   ├── cheerp-test.sh                # Script de pruebas
│   └── react-dev.sh                  # Script de desarrollo
└── README-CHEERP.md                  # Esta documentación
```

## 🔄 Flujo de Trabajo

### **Para Desarrolladores:**

1. **Modificar Backend C++:**
   ```bash
   # Editar backend/src/cheerp_backend.cpp
   nano backend/src/cheerp_backend.cpp
   
   # Recompilar
   ./scripts/cheerp-build.sh
   ```

2. **Probar Cambios:**
   ```bash
   # Probar backend
   ./scripts/cheerp-test.sh
   
   # Probar en React
   ./scripts/react-dev.sh
   ```

3. **Usar en React:**
   ```javascript
   // En cualquier componente React
   useEffect(() => {
     const script = document.createElement('script');
     script.src = '/cheerp_backend.js';
     script.onload = () => {
       // Usar funciones C++
       const isValid = window.validateCredentials(...);
     };
     document.head.appendChild(script);
   }, []);
   ```

## 🐛 Solución de Problemas

### **Error: "cheerp_backend.js no encontrado"**
```bash
./scripts/cheerp-build.sh
```

### **Error: "Docker no disponible"**
```bash
# Instalar Docker
sudo apt-get install docker.io
sudo usermod -aG docker $USER
# Reiniciar sesión
```

### **Error: "Imagen cheerp-dev no encontrada"**
```bash
docker build -f Dockerfile.cheerp -t cheerp-dev .
```

### **Error: "Funciones no disponibles"**
- Verificar que `cheerp_backend.js` esté en `/public/`
- Verificar que el script se cargue correctamente
- Revisar consola del navegador para errores

## 📝 Agregar Nuevas Funciones

### **1. En C++ (`backend/src/cheerp_backend.cpp`):**
```cpp
[[cheerp::jsexport]]
int nuevaFuncion(int parametro) {
    // Tu código C++
    return resultado;
}
```

### **2. Recompilar:**
```bash
./scripts/cheerp-build.sh
```

### **3. Usar en React:**
```javascript
// La función estará disponible como window.nuevaFuncion
const resultado = window.nuevaFuncion(123);
```

## 🎯 Casos de Uso

### **Validación de Credenciales:**
- ✅ Implementado en `Login.jsx`
- ✅ Usa backend C++ real
- ✅ Manejo de errores

### **Procesamiento de Datos:**
- ✅ Buffer global compartido
- ✅ Funciones de lectura/escritura
- ✅ Tipos de datos compatibles

### **Integración con APIs:**
- 🔄 Pendiente de implementar
- 📋 Usar buffer global para datos
- 📋 Funciones C++ para procesamiento

## 📞 Soporte

### **Para Problemas Técnicos:**
1. Revisar logs en consola del navegador
2. Verificar que scripts tengan permisos de ejecución
3. Confirmar que Docker esté funcionando
4. Verificar rutas de archivos

### **Para Nuevas Funcionalidades:**
1. Agregar función en C++ con `[[cheerp::jsexport]]`
2. Recompilar con `./scripts/cheerp-build.sh`
3. Usar en React como `window.nombreFuncion`

---

**¡Listo para usar! 🚀** 