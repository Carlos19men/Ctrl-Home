#include "Postgres/PostgresDB.h"
#include <iostream>

int main() {
    // Cambia los datos de conexión según tu configuración
    PostgresDB db("host=host.docker.internal dbname=ctrl_home user=postgres password=contrac");
    if (!db.connect()) {
        std::cerr << "No se pudo conectar a la base de datos." << std::endl;
        return 1;
    }

    auto usuarios = db.query("SELECT * FROM domotica.usuarios");
    for (const auto& row : usuarios) {
        std::cout << "Usuario: ";
        if (row.count("primer_nombre")) std::cout << row.at("primer_nombre") << " ";
        if (row.count("primer_apellido")) std::cout << row.at("primer_apellido");
        std::cout << std::endl;
    }

    db.disconnect();
    return 0;
}