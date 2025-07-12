#include <string>

// Buffer global compartido entre JS y C++
extern "C" {
    int globalBuffer[2048];

    // Función para obtener el tamaño del buffer
    [[cheerp::jsexport]]
    int getBufferSize() {
        return 2048;
    }

    // Función para escribir en el buffer global
    [[cheerp::jsexport]]
    void writeToBuffer(int offset, int value) {
        if (offset >= 0 && offset < 2048) {
            globalBuffer[offset] = value;
        }
    }

    // Función para leer del buffer global
    [[cheerp::jsexport]]
    int readFromBuffer(int offset) {
        if (offset >= 0 && offset < 2048) {
            return globalBuffer[offset];
        }
        return 0;
    }

    // Validar credenciales: retorna 1 si login exitoso, 0 si fallido
    [[cheerp::jsexport]]
    int validateCredentials(int usernameOffset, int usernameLen, int passwordOffset, int passwordLen, int roleOffset, int roleLen) {
        std::string username, password, role;
        for (int i = 0; i < usernameLen; i++) username += (char)globalBuffer[usernameOffset + i];
        for (int i = 0; i < passwordLen; i++) password += (char)globalBuffer[passwordOffset + i];
        for (int i = 0; i < roleLen; i++) role += (char)globalBuffer[roleOffset + i];

        if (role == "admin" && username == "carlos" && password == "sasa") return 1;
        if (role == "usuario" && username == "samuel" && password == "sa") return 1;
        return 0;
    }
} 