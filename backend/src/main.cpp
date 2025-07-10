#include "Postgres/PostgresDB.h"
#include <iostream>
#include <vector>
#include <algorithm>

// ----------- USUARIOS -----------
void crearUsuario(PostgresDB& db) {
    int id, llave;
    std::string ci, nombre1, nombre2, apellido1, apellido2, acceso;


    std::cout << "ID_usuario: "; std::cin >> id;
    std::cout << "CI: "; std::cin >> ci;
    std::cout << "Primer nombre: "; std::cin >> nombre1;
    std::cout << "Segundo nombre: "; std::cin >> nombre2;
    std::cout << "Primer apellido: "; std::cin >> apellido1;
    std::cout << "Segundo apellido: "; std::cin >> apellido2;

    // Mostrar tipos de acceso válidos
    std::vector<std::string> tipos = {
        "administrador",
        "usuario",
        "visitante",
        "personal de servicio",
        "personal de mantenimiento"
    };
    std::cout << "Tipos de acceso:\n";
    for (size_t i = 0; i < tipos.size(); ++i)
        std::cout << "  " << (i+1) << ". " << tipos[i] << "\n";
    int opAcceso = 0;
    do {
        std::cout << "Seleccione tipo de acceso (1-" << tipos.size() << "): ";
        std::cin >> opAcceso;
    } while (opAcceso < 1 || opAcceso > (int)tipos.size());
    acceso = tipos[opAcceso-1];

   

    // Mostrar llaves disponibles
    auto llaves = db.query("SELECT ID_llave FROM domotica.Llaves_de_Acceso");
    std::cout << "Llaves disponibles:\n";
    for (const auto& row : llaves) {
        std::cout << "  " << row.at("id_llave") << "\n";
    } 
    
    std::cout << "Llave (ID_llave de la lista): "; std::cin >> llave;
    std::string sql = "INSERT INTO domotica.usuarios (ID_usuario, CI, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, acceso, llave) VALUES (" +
        std::to_string(id) + ", '" + ci + "', '" + nombre1 + "', '" + nombre2 + "', '" + apellido1 + "', '" + apellido2 + "', '" + acceso + "', " + std::to_string(llave) + ")";
    db.query(sql);
    std::cout << "Usuario creado.\n";
}
void leerUsuarios(PostgresDB& db) {
    auto usuarios = db.query("SELECT * FROM domotica.usuarios");
    for (const auto& row : usuarios) {
        std::cout << "ID: " << row.at("id_usuario") << ", Nombre: " << row.at("primer_nombre") << " " << row.at("primer_apellido") << std::endl;
    }
}
void actualizarUsuario(PostgresDB& db) {
    int id;
    std::string nuevoNombre, nuevoSegundoNombre, nuevoApellido1, nuevoApellido2;
    std::cout << "ID_usuario a modificar: "; std::cin >> id;
    std::cout << "Nuevo primer nombre: "; std::cin >> nuevoNombre;
    std::cout << "Nuevo segundo nombre: "; std::cin >> nuevoSegundoNombre;
    std::cout << "Nuevo primer apellido: "; std::cin >> nuevoApellido1;
    std::cout << "Nuevo segundo apellido: "; std::cin >> nuevoApellido2;
    std::string sql = "UPDATE domotica.usuarios SET primer_nombre = '" + nuevoNombre +
        "', segundo_nombre = '" + nuevoSegundoNombre +
        "', primer_apellido = '" + nuevoApellido1 +
        "', segundo_apellido = '" + nuevoApellido2 +
        "' WHERE ID_usuario = " + std::to_string(id);
    db.query(sql);
    std::cout << "Usuario actualizado.\n";
}
void eliminarUsuario(PostgresDB& db) {
    int id;
    std::cout << "ID_usuario a eliminar: "; std::cin >> id;
    std::string sql = "DELETE FROM domotica.usuarios WHERE ID_usuario = " + std::to_string(id);
    db.query(sql);
    std::cout << "Usuario eliminado.\n";
}

// ----------- LLAVES DE ACCESO -----------
void crearLlave(PostgresDB& db) {
    int id;
    std::string clave, fecha, tipo;

    // Mostrar tipos de llave válidos
    std::vector<std::string> tipos = {
        "temporal",
        "permanente",
    };
    std::cout << "Tipos de llave:\n";
    for (size_t i = 0; i < tipos.size(); ++i)
        std::cout << "  " << (i+1) << ". " << tipos[i] << "\n";
    int opTipo = 0;
    do {
        std::cout << "Seleccione tipo de llave (1-" << tipos.size() << "): ";
        std::cin >> opTipo;
    } while (opTipo < 1 || opTipo > (int)tipos.size());
    tipo = tipos[opTipo-1];

    std::cout << "ID_llave: "; std::cin >> id;
    std::cout << "Clave: "; std::cin >> clave;
    std::cout << "Fecha vencimiento (YYYY-MM-DD): "; std::cin >> fecha;

    std::string sql = "INSERT INTO domotica.Llaves_de_Acceso (ID_llave, clave, tipo, fecha_vencimiento) VALUES (" +
        std::to_string(id) + ", '" + clave + "', '" + tipo + "', '" + fecha + "')";
    db.query(sql);
    std::cout << "Llave creada.\n";
}
void leerLlaves(PostgresDB& db) {
    auto llaves = db.query("SELECT * FROM domotica.Llaves_de_Acceso");
    for (const auto& row : llaves) {
        std::cout << "ID: " << row.at("id_llave") << ", Clave: " << row.at("clave") << std::endl;
    }
}
void actualizarLlave(PostgresDB& db) {
    int id;
    std::string nuevaClave;
    std::cout << "ID_llave a modificar: "; std::cin >> id;
    std::cout << "Nueva clave: "; std::cin >> nuevaClave;
    std::string sql = "UPDATE domotica.Llaves_de_Acceso SET clave = '" + nuevaClave + "' WHERE ID_llave = " + std::to_string(id);
    db.query(sql);
    std::cout << "Llave actualizada.\n";
}
void eliminarLlave(PostgresDB& db) {
    int id;
    std::cout << "ID_llave a eliminar: "; std::cin >> id;
    std::string sql = "DELETE FROM domotica.Llaves_de_Acceso WHERE ID_llave = " + std::to_string(id);
    db.query(sql);
    std::cout << "Llave eliminada.\n";
}

// ----------- DISPOSITIVOS (ejemplo) -----------
void crearDispositivo(PostgresDB& db) {
    int id;
    std::string nombre, descripcion, estado, tipo;
    std::cout << "ID_dispositivo: "; std::cin >> id;
    std::cout << "Nombre: "; std::cin >> nombre;
    std::cout << "Descripcion: "; std::cin >> descripcion;
    std::cout << "Estado: "; std::cin >> estado;
    std::cout << "Tipo: "; std::cin >> tipo;
    std::string sql = "INSERT INTO domotica.dispositivos (ID_dispositivo, nombre, descripcion, estado, tipo) VALUES (" +
        std::to_string(id) + ", '" + nombre + "', '" + descripcion + "', '" + estado + "', '" + tipo + "')";
    db.query(sql);
    std::cout << "Dispositivo creado.\n";
}
void leerDispositivos(PostgresDB& db) {
    auto dispositivos = db.query("SELECT * FROM domotica.dispositivos");
    for (const auto& row : dispositivos) {
        std::cout << "ID: " << row.at("id_dispositivo") << ", Nombre: " << row.at("nombre") << std::endl;
    }
}
void actualizarDispositivo(PostgresDB& db) {
    int id;
    std::string nuevoEstado;
    std::cout << "ID_dispositivo a modificar: "; std::cin >> id;
    std::cout << "Nuevo estado: "; std::cin >> nuevoEstado;
    std::string sql = "UPDATE domotica.dispositivos SET estado = '" + nuevoEstado + "' WHERE ID_dispositivo = " + std::to_string(id);
    db.query(sql);
    std::cout << "Dispositivo actualizado.\n";
}
void eliminarDispositivo(PostgresDB& db) {
    int id;
    std::cout << "ID_dispositivo a eliminar: "; std::cin >> id;
    std::string sql = "DELETE FROM domotica.dispositivos WHERE ID_dispositivo = " + std::to_string(id);
    db.query(sql);
    std::cout << "Dispositivo eliminado.\n";
}


// ----------- CONFIGURACIONES -----------
void crearConfiguracion(PostgresDB& db) {
    // Mostrar usuarios disponibles
    auto usuarios = db.query("SELECT ID_usuario, primer_nombre, primer_apellido FROM domotica.usuarios");
    std::cout << "Usuarios disponibles:\n";
    for (const auto& row : usuarios)
        std::cout << "  " << row.at("id_usuario") << ": " << row.at("primer_nombre") << " " << row.at("primer_apellido") << "\n";

    // Mostrar dispositivos disponibles
    auto dispositivos = db.query("SELECT ID_dispositivo, nombre FROM domotica.dispositivos");
    std::cout << "Dispositivos disponibles:\n";
    for (const auto& row : dispositivos)
        std::cout << "  " << row.at("id_dispositivo") << ": " << row.at("nombre") << "\n";

    int id_usuario, id_dispositivo;
    std::string fecha, hora, descripcion;
    std::cout << "ID_usuario: "; std::cin >> id_usuario;
    std::cout << "ID_dispositivo: "; std::cin >> id_dispositivo;
    std::cout << "Fecha (YYYY-MM-DD): "; std::cin >> fecha;
    std::cout << "Hora (HH:MM:SS): "; std::cin >> hora;
    std::cout << "Descripcion: "; std::cin.ignore(); std::getline(std::cin, descripcion);

    std::string sql = "INSERT INTO domotica.configuraciones (ID_usuario, ID_dispositivo, fecha, hora, descripcion) VALUES (" +
        std::to_string(id_usuario) + ", " + std::to_string(id_dispositivo) + ", '" + fecha + "', '" + hora + "', '" + descripcion + "')";
    db.query(sql);
    std::cout << "Configuracion creada.\n";
}
void leerConfiguraciones(PostgresDB& db) {
    auto res = db.query("SELECT * FROM domotica.configuraciones");
    for (const auto& row : res) {
        std::cout << "Usuario: " << row.at("id_usuario") << ", Dispositivo: " << row.at("id_dispositivo") << ", Fecha: " << row.at("fecha") << ", Hora: " << row.at("hora") << ", Desc: " << row.at("descripcion") << std::endl;
    }
}
void eliminarConfiguracion(PostgresDB& db) {
    int id_usuario, id_dispositivo;
    std::string fecha, hora;
    std::cout << "ID_usuario: "; std::cin >> id_usuario;
    std::cout << "ID_dispositivo: "; std::cin >> id_dispositivo;
    std::cout << "Fecha (YYYY-MM-DD): "; std::cin >> fecha;
    std::cout << "Hora (HH:MM:SS): "; std::cin >> hora;
    std::string sql = "DELETE FROM domotica.configuraciones WHERE ID_usuario = " + std::to_string(id_usuario) +
        " AND ID_dispositivo = " + std::to_string(id_dispositivo) + " AND fecha = '" + fecha + "' AND hora = '" + hora + "'";
    db.query(sql);
    std::cout << "Configuracion eliminada.\n";
}
void actualizarConfiguracion(PostgresDB& db) {
    int id_usuario, id_dispositivo;
    std::string fecha, hora, nuevaDesc;
    std::cout << "ID_usuario: "; std::cin >> id_usuario;
    std::cout << "ID_dispositivo: "; std::cin >> id_dispositivo;
    std::cout << "Fecha (YYYY-MM-DD): "; std::cin >> fecha;
    std::cout << "Hora (HH:MM:SS): "; std::cin >> hora;
    std::cout << "Nueva descripcion: "; std::cin.ignore(); std::getline(std::cin, nuevaDesc);
    std::string sql = "UPDATE domotica.configuraciones SET descripcion = '" + nuevaDesc +
                      "' WHERE ID_usuario = " + std::to_string(id_usuario) +
                      " AND ID_dispositivo = " + std::to_string(id_dispositivo) +
                      " AND fecha = '" + fecha + "' AND hora = '" + hora + "'";
    db.query(sql);
    std::cout << "Configuracion actualizada.\n";
}
// ----------- ACCESOS_USUARIOS -----------
void crearAccesoUsuario(PostgresDB& db) {
    // Mostrar usuarios y dispositivos igual que arriba...

    int id_usuario, id_dispositivo;
    std::string fecha, hora, resultado;

    // Opciones del dominio resultado_acceso
    std::vector<std::string> resultados = {"concedido", "denegado"};
    std::cout << "Resultado:\n";
    for (size_t i = 0; i < resultados.size(); ++i)
        std::cout << "  " << (i+1) << ". " << resultados[i] << "\n";
    int opRes = 0;
    do {
        std::cout << "Seleccione resultado (1-" << resultados.size() << "): ";
        std::cin >> opRes;
    } while (opRes < 1 || opRes > (int)resultados.size());
    resultado = resultados[opRes-1];

    std::cout << "ID_usuario: "; std::cin >> id_usuario;
    std::cout << "ID_dispositivo: "; std::cin >> id_dispositivo;
    std::cout << "Fecha (YYYY-MM-DD): "; std::cin >> fecha;
    std::cout << "Hora (HH:MM:SS): "; std::cin >> hora;

    std::string sql = "INSERT INTO domotica.Accesos_usuarios (ID_usuario, ID_dispositivo, fecha, hora, resultado) VALUES (" +
        std::to_string(id_usuario) + ", " + std::to_string(id_dispositivo) + ", '" + fecha + "', '" + hora + "', '" + resultado + "')";
    db.query(sql);
    std::cout << "Acceso registrado.\n";
}
void leerAccesosUsuarios(PostgresDB& db) {
    auto res = db.query("SELECT * FROM domotica.Accesos_usuarios");
    for (const auto& row : res) {
        std::cout << "Usuario: " << row.at("id_usuario") << ", Dispositivo: " << row.at("id_dispositivo") << ", Fecha: " << row.at("fecha") << ", Hora: " << row.at("hora") << ", Resultado: " << row.at("resultado") << std::endl;
    }
}
void eliminarAccesoUsuario(PostgresDB& db) {
    int id_usuario, id_dispositivo;
    std::string fecha, hora;
    std::cout << "ID_usuario: "; std::cin >> id_usuario;
    std::cout << "ID_dispositivo: "; std::cin >> id_dispositivo;
    std::cout << "Fecha (YYYY-MM-DD): "; std::cin >> fecha;
    std::cout << "Hora (HH:MM:SS): "; std::cin >> hora;
    std::string sql = "DELETE FROM domotica.Accesos_usuarios WHERE ID_usuario = " + std::to_string(id_usuario) +
        " AND ID_dispositivo = " + std::to_string(id_dispositivo) + " AND fecha = '" + fecha + "' AND hora = '" + hora + "'";
    db.query(sql);
    std::cout << "Acceso eliminado.\n";
}
void actualizarAccesoUsuario(PostgresDB& db) {
    int id_usuario, id_dispositivo;
    std::string fecha, hora, nuevoResultado;
    std::cout << "ID_usuario: "; std::cin >> id_usuario;
    std::cout << "ID_dispositivo: "; std::cin >> id_dispositivo;
    std::cout << "Fecha (YYYY-MM-DD): "; std::cin >> fecha;
    std::cout << "Hora (HH:MM:SS): "; std::cin >> hora;
    std::cout << "Nuevo resultado (concedido/denegado): "; std::cin >> nuevoResultado;
    std::string sql = "UPDATE domotica.Accesos_usuarios SET resultado = '" + nuevoResultado +
                      "' WHERE ID_usuario = " + std::to_string(id_usuario) +
                      " AND ID_dispositivo = " + std::to_string(id_dispositivo) +
                      " AND fecha = '" + fecha + "' AND hora = '" + hora + "'";
    db.query(sql);
    std::cout << "Acceso de usuario actualizado.\n";
}
// ----------- ILUMINACION -----------
void crearIluminacion(PostgresDB& db) {
    // Mostrar dispositivos disponibles
    auto dispositivos = db.query("SELECT ID_dispositivo, nombre FROM domotica.dispositivos");
    std::cout << "Dispositivos disponibles:\n";
    for (const auto& row : dispositivos)
        std::cout << "  " << row.at("id_dispositivo") << ": " << row.at("nombre") << "\n";

    int id, nivel;
    std::cout << "ID_iluminacion (igual a ID_dispositivo): "; std::cin >> id;
    std::cout << "Nivel (1-10): "; std::cin >> nivel;
    std::string sql = "INSERT INTO domotica.iluminacion (ID_iluminacion, nivel_iluminacion) VALUES (" +
        std::to_string(id) + ", " + std::to_string(nivel) + ")";
    db.query(sql);
    std::cout << "Iluminacion creada.\n";
}
void leerIluminacion(PostgresDB& db) {
    auto res = db.query("SELECT * FROM domotica.iluminacion");
    for (const auto& row : res) {
        std::cout << "ID: " << row.at("id_iluminacion") << ", Nivel: " << row.at("nivel_iluminacion") << std::endl;
    }
}
void eliminarIluminacion(PostgresDB& db) {
    int id;
    std::cout << "ID_iluminacion a eliminar: "; std::cin >> id;
    std::string sql = "DELETE FROM domotica.iluminacion WHERE ID_iluminacion = " + std::to_string(id);
    db.query(sql);
    std::cout << "Iluminacion eliminada.\n";
}
void actualizarIluminacion(PostgresDB& db) {
    int id, nuevoNivel;
    std::cout << "ID_iluminacion a modificar: "; std::cin >> id;
    std::cout << "Nuevo nivel (1-10): "; std::cin >> nuevoNivel;
    std::string sql = "UPDATE domotica.iluminacion SET nivel_iluminacion = " + std::to_string(nuevoNivel) +
                      " WHERE ID_iluminacion = " + std::to_string(id);
    db.query(sql);
    std::cout << "Iluminacion actualizada.\n";
}
// ----------- ELECTRODOMESTICOS -----------
void crearElectrodomestico(PostgresDB& db) {
    // Mostrar dispositivos disponibles
    auto dispositivos = db.query("SELECT ID_dispositivo, nombre FROM domotica.dispositivos");
    std::cout << "Dispositivos disponibles:\n";
    for (const auto& row : dispositivos)
        std::cout << "  " << row.at("id_dispositivo") << ": " << row.at("nombre") << "\n";

    int id;
    std::cout << "ID_electrodomestico (igual a ID_dispositivo): "; std::cin >> id;
    std::string sql = "INSERT INTO domotica.electrodomesticos (ID_electrodomestico) VALUES (" + std::to_string(id) + ")";
    db.query(sql);
    std::cout << "Electrodomestico creado.\n";
}
void leerElectrodomesticos(PostgresDB& db) {
    auto res = db.query("SELECT * FROM domotica.electrodomesticos");
    for (const auto& row : res) {
        std::cout << "ID: " << row.at("id_electrodomestico") << std::endl;
    }
}
void eliminarElectrodomestico(PostgresDB& db) {
    int id;
    std::cout << "ID_electrodomestico a eliminar: "; std::cin >> id;
    std::string sql = "DELETE FROM domotica.electrodomesticos WHERE ID_electrodomestico = " + std::to_string(id);
    db.query(sql);
    std::cout << "Electrodomestico eliminado.\n";
}
void actualizarElectrodomestico(PostgresDB& db) {
    int id, nuevoId;
    std::cout << "ID_electrodomestico a modificar: "; std::cin >> id;
    std::cout << "Nuevo ID_dispositivo: "; std::cin >> nuevoId;
    std::string sql = "UPDATE domotica.electrodomesticos SET ID_electrodomestico = " + std::to_string(nuevoId) +
                      " WHERE ID_electrodomestico = " + std::to_string(id);
    db.query(sql);
    std::cout << "Electrodomestico actualizado.\n";
}
// ----------- CLIMATIZACION -----------
void crearClimatizacion(PostgresDB& db) {
    // Mostrar dispositivos disponibles
    auto dispositivos = db.query("SELECT ID_dispositivo, nombre FROM domotica.dispositivos");
    std::cout << "Dispositivos disponibles:\n";
    for (const auto& row : dispositivos)
        std::cout << "  " << row.at("id_dispositivo") << ": " << row.at("nombre") << "\n";

    int id, temp;
    std::cout << "ID_dispositivo: "; std::cin >> id;
    std::cout << "Temperatura promedio: "; std::cin >> temp;
    std::string sql = "INSERT INTO domotica.climatizacion (ID_dispositivo, temperatura_promedio) VALUES (" +
        std::to_string(id) + ", " + std::to_string(temp) + ")";
    db.query(sql);
    std::cout << "Climatizacion creada.\n";
}
void leerClimatizacion(PostgresDB& db) {
    auto res = db.query("SELECT * FROM domotica.climatizacion");
    for (const auto& row : res) {
        std::cout << "ID: " << row.at("id_dispositivo") << ", Temp: " << row.at("temperatura_promedio") << std::endl;
    }
}
void eliminarClimatizacion(PostgresDB& db) {
    int id;
    std::cout << "ID_dispositivo a eliminar: "; std::cin >> id;
    std::string sql = "DELETE FROM domotica.climatizacion WHERE ID_dispositivo = " + std::to_string(id);
    db.query(sql);
    std::cout << "Climatizacion eliminada.\n";
}
void actualizarClimatizacion(PostgresDB& db) {
    int id, nuevaTemp;
    std::cout << "ID_dispositivo a modificar: "; std::cin >> id;
    std::cout << "Nueva temperatura promedio: "; std::cin >> nuevaTemp;
    std::string sql = "UPDATE domotica.climatizacion SET temperatura_promedio = " + std::to_string(nuevaTemp) +
                      " WHERE ID_dispositivo = " + std::to_string(id);
    db.query(sql);
    std::cout << "Climatizacion actualizada.\n";
}
// ----------- SEGURIDAD -----------
void crearSeguridad(PostgresDB& db) {
    // Mostrar dispositivos disponibles
    auto dispositivos = db.query("SELECT ID_dispositivo, nombre FROM domotica.dispositivos");
    std::cout << "Dispositivos disponibles:\n";
    for (const auto& row : dispositivos)
        std::cout << "  " << row.at("id_dispositivo") << ": " << row.at("nombre") << "\n";

    int id;
    std::cout << "ID_seguridad (igual a ID_dispositivo): "; std::cin >> id;
    std::string sql = "INSERT INTO domotica.seguridad (ID_seguridad) VALUES (" + std::to_string(id) + ")";
    db.query(sql);
    std::cout << "Seguridad creada.\n";
}
void leerSeguridad(PostgresDB& db) {
    auto res = db.query("SELECT * FROM domotica.seguridad");
    for (const auto& row : res) {
        std::cout << "ID: " << row.at("id_seguridad") << std::endl;
    }
}
void eliminarSeguridad(PostgresDB& db) {
    int id;
    std::cout << "ID_seguridad a eliminar: "; std::cin >> id;
    std::string sql = "DELETE FROM domotica.seguridad WHERE ID_seguridad = " + std::to_string(id);
    db.query(sql);
    std::cout << "Seguridad eliminada.\n";
}
void actualizarSeguridad(PostgresDB& db) {
    int id, nuevoId;
    std::cout << "ID_seguridad a modificar: "; std::cin >> id;
    std::cout << "Nuevo ID_dispositivo: "; std::cin >> nuevoId;
    std::string sql = "UPDATE domotica.seguridad SET ID_seguridad = " + std::to_string(nuevoId) +
                      " WHERE ID_seguridad = " + std::to_string(id);
    db.query(sql);
    std::cout << "Seguridad actualizada.\n";
}
// ----------- INTRUSIONES -----------
void crearIntrusion(PostgresDB& db) {
    // Mostrar IDs de seguridad disponibles
    auto seguridades = db.query("SELECT ID_seguridad FROM domotica.seguridad");
    std::cout << "Seguridades disponibles:\n";
    for (const auto& row : seguridades)
        std::cout << "  " << row.at("id_seguridad") << "\n";

    int id, id_seg;
    std::string desc, fecha, hora, nivel;

    // Opciones del dominio nivel_intrusion
    std::vector<std::string> niveles = {"bajo", "medio", "alto"};
    std::cout << "Nivel de intrusión:\n";
    for (size_t i = 0; i < niveles.size(); ++i)
        std::cout << "  " << (i+1) << ". " << niveles[i] << "\n";
    int opNivel = 0;
    do {
        std::cout << "Seleccione nivel (1-" << niveles.size() << "): ";
        std::cin >> opNivel;
    } while (opNivel < 1 || opNivel > (int)niveles.size());
    nivel = niveles[opNivel-1];

    std::cout << "ID_intrusion: "; std::cin >> id;
    std::cout << "Descripcion: "; std::cin.ignore(); std::getline(std::cin, desc);
    std::cout << "Fecha (YYYY-MM-DD): "; std::cin >> fecha;
    std::cout << "Hora (HH:MM:SS): "; std::cin >> hora;
    std::cout << "ID_seguridad: "; std::cin >> id_seg;

    std::string sql = "INSERT INTO domotica.intrusiones (ID_intrusion, descripcion, fecha, hora, nivel, ID_seguridad) VALUES (" +
        std::to_string(id) + ", '" + desc + "', '" + fecha + "', '" + hora + "', '" + nivel + "', " + std::to_string(id_seg) + ")";
    db.query(sql);
    std::cout << "Intrusion creada.\n";
}

void leerIntrusiones(PostgresDB& db) {
    auto res = db.query("SELECT * FROM domotica.intrusiones");
    for (const auto& row : res) {
        std::cout << "ID: " << row.at("id_intrusion") << ", Desc: " << row.at("descripcion") << ", Nivel: " << row.at("nivel") << std::endl;
    }
}
void eliminarIntrusion(PostgresDB& db) {
    int id;
    std::cout << "ID_intrusion a eliminar: "; std::cin >> id;
    std::string sql = "DELETE FROM domotica.intrusiones WHERE ID_intrusion = " + std::to_string(id);
    db.query(sql);
    std::cout << "Intrusion eliminada.\n";
}
void actualizarIntrusion(PostgresDB& db) {
    int id;
    std::string nuevaDesc, nuevaFecha, nuevaHora, nuevoNivel;
    std::cout << "ID_intrusion a modificar: "; std::cin >> id;
    std::cout << "Nueva descripcion: "; std::cin.ignore(); std::getline(std::cin, nuevaDesc);
    std::cout << "Nueva fecha (YYYY-MM-DD): "; std::cin >> nuevaFecha;
    std::cout << "Nueva hora (HH:MM:SS): "; std::cin >> nuevaHora;
    std::cout << "Nuevo nivel (bajo/medio/alto): "; std::cin >> nuevoNivel;
    std::string sql = "UPDATE domotica.intrusiones SET descripcion = '" + nuevaDesc +
                      "', fecha = '" + nuevaFecha +
                      "', hora = '" + nuevaHora +
                      "', nivel = '" + nuevoNivel +
                      "' WHERE ID_intrusion = " + std::to_string(id);
    db.query(sql);
    std::cout << "Intrusion actualizada.\n";
}
// ----------- CRONOGRAMA DISPOSITIVO -----------
void crearCronograma(PostgresDB& db) {
    // Mostrar dispositivos disponibles
    auto dispositivos = db.query("SELECT ID_dispositivo, nombre FROM domotica.dispositivos");
    std::cout << "Dispositivos disponibles:\n";
    for (const auto& row : dispositivos)
        std::cout << "  " << row.at("id_dispositivo") << ": " << row.at("nombre") << "\n";

    int id;
    std::string dia, hora, accion;
    std::cout << "ID_dispositivo: "; std::cin >> id;
    std::cout << "Dia de semana: "; std::cin >> dia;
    std::cout << "Hora (HH:MM:SS): "; std::cin >> hora;
    std::cout << "Accion (encendido/apagado/en espera): "; std::cin >> accion;
    std::string sql = "INSERT INTO domotica.cronograma_dispositivo (ID_dispositivo, dia_semana, hora, accion) VALUES (" +
        std::to_string(id) + ", '" + dia + "', '" + hora + "', '" + accion + "')";
    db.query(sql);
    std::cout << "Cronograma creado.\n";
}
void leerCronograma(PostgresDB& db) {
    auto res = db.query("SELECT * FROM domotica.cronograma_dispositivo");
    for (const auto& row : res) {
        std::cout << "ID: " << row.at("id_dispositivo") << ", Dia: " << row.at("dia_semana") << ", Hora: " << row.at("hora") << ", Accion: " << row.at("accion") << std::endl;
    }
}
void eliminarCronograma(PostgresDB& db) {
    int id;
    std::string dia, hora;
    std::cout << "ID_dispositivo: "; std::cin >> id;
    std::cout << "Dia de semana: "; std::cin >> dia;
    std::cout << "Hora (HH:MM:SS): "; std::cin >> hora;
    std::string sql = "DELETE FROM domotica.cronograma_dispositivo WHERE ID_dispositivo = " + std::to_string(id) +
        " AND dia_semana = '" + dia + "' AND hora = '" + hora + "'";
    db.query(sql);
    std::cout << "Cronograma eliminado.\n";
}
void actualizarCronograma(PostgresDB& db) {
    int id;
    std::string dia, hora, nuevaAccion;
    std::cout << "ID_dispositivo: "; std::cin >> id;
    std::cout << "Dia de semana: "; std::cin >> dia;
    std::cout << "Hora (HH:MM:SS): "; std::cin >> hora;
    std::cout << "Nueva accion (encendido/apagado/en espera): "; std::cin >> nuevaAccion;
    std::string sql = "UPDATE domotica.cronograma_dispositivo SET accion = '" + nuevaAccion +
                      "' WHERE ID_dispositivo = " + std::to_string(id) +
                      " AND dia_semana = '" + dia + "' AND hora = '" + hora + "'";
    db.query(sql);
    std::cout << "Cronograma actualizado.\n";
}
// ----------- ACCESOS -----------
void crearAcceso(PostgresDB& db) {
    // Mostrar dispositivos disponibles
    auto dispositivos = db.query("SELECT ID_dispositivo, nombre FROM domotica.dispositivos");
    std::cout << "Dispositivos disponibles:\n";
    for (const auto& row : dispositivos)
        std::cout << "  " << row.at("id_dispositivo") << ": " << row.at("nombre") << "\n";

    // Mostrar tipos de acceso válidos
    std::vector<std::string> tipos = {
        "administrador",
        "usuario",
        "visitante",
        "personal de servicio",
        "personal de mantenimiento"
    };
    std::cout << "Tipos de acceso:\n";
    for (size_t i = 0; i < tipos.size(); ++i)
        std::cout << "  " << (i+1) << ". " << tipos[i] << "\n";
    int opAcceso = 0;
    do {
        std::cout << "Seleccione tipo de acceso (1-" << tipos.size() << "): ";
        std::cin >> opAcceso;
    } while (opAcceso < 1 || opAcceso > (int)tipos.size());
    std::string acceso = tipos[opAcceso-1];

    int id;
    std::cout << "ID_dispositivo: "; std::cin >> id;

    std::string sql = "INSERT INTO domotica.Accesos (ID_dispositivo, acceso) VALUES (" +
        std::to_string(id) + ", '" + acceso + "')";
    db.query(sql);
    std::cout << "Acceso creado.\n";
}
void leerAccesos(PostgresDB& db) {
    auto res = db.query("SELECT * FROM domotica.Accesos");
    for (const auto& row : res) {
        std::cout << "ID: " << row.at("id_dispositivo") << ", Acceso: " << row.at("acceso") << std::endl;
    }
}
void eliminarAcceso(PostgresDB& db) {
    int id;
    std::string acceso;
    std::cout << "ID_dispositivo: "; std::cin >> id;
    std::cout << "Acceso: "; std::cin >> acceso;
    std::string sql = "DELETE FROM domotica.Accesos WHERE ID_dispositivo = " + std::to_string(id) + " AND acceso = '" + acceso + "'";
    db.query(sql);
    std::cout << "Acceso eliminado.\n";
}
void actualizarAcceso(PostgresDB& db) {
    int id;
    std::string acceso, nuevoAcceso;
    std::cout << "ID_dispositivo: "; std::cin >> id;
    std::cout << "Acceso actual: "; std::cin >> acceso;
    std::cout << "Nuevo acceso: "; std::cin >> nuevoAcceso;
    std::string sql = "UPDATE domotica.Accesos SET acceso = '" + nuevoAcceso +
                      "' WHERE ID_dispositivo = " + std::to_string(id) +
                      " AND acceso = '" + acceso + "'";
    db.query(sql);
    std::cout << "Acceso actualizado.\n";
}
// ----------- CONSUMOS -----------
void crearConsumo(PostgresDB& db) {
    // Mostrar dispositivos disponibles
    auto dispositivos = db.query("SELECT ID_dispositivo, nombre FROM domotica.dispositivos");
    std::cout << "Dispositivos disponibles:\n";
    for (const auto& row : dispositivos)
        std::cout << "  " << row.at("id_dispositivo") << ": " << row.at("nombre") << "\n";

    int id, consumo;
    std::string fecha, descripcion;
    std::cout << "ID_dispositivo: "; std::cin >> id;
    std::cout << "Fecha (YYYY-MM-DD): "; std::cin >> fecha;
    std::cout << "Consumo: "; std::cin >> consumo;
    std::cout << "Descripcion: "; std::cin.ignore(); std::getline(std::cin, descripcion);
    std::string sql = "INSERT INTO domotica.consumos (ID_dispositivo, fecha, consumo, descripcion) VALUES (" +
        std::to_string(id) + ", '" + fecha + "', " + std::to_string(consumo) + ", '" + descripcion + "')";
    db.query(sql);
    std::cout << "Consumo creado.\n";
}
void leerConsumos(PostgresDB& db) {
    auto res = db.query("SELECT * FROM domotica.consumos");
    for (const auto& row : res) {
        std::cout << "ID: " << row.at("id_dispositivo") << ", Fecha: " << row.at("fecha") << ", Consumo: " << row.at("consumo") << ", Desc: " << row.at("descripcion") << std::endl;
    }
}
void eliminarConsumo(PostgresDB& db) {
    int id;
    std::string fecha;
    std::cout << "ID_dispositivo: "; std::cin >> id;
    std::cout << "Fecha (YYYY-MM-DD): "; std::cin >> fecha;
    std::string sql = "DELETE FROM domotica.consumos WHERE ID_dispositivo = " + std::to_string(id) + " AND fecha = '" + fecha + "'";
    db.query(sql);
    std::cout << "Consumo eliminado.\n";
}
void actualizarConsumo(PostgresDB& db) {
    int id, nuevoConsumo;
    std::string fecha, nuevaDesc;
    std::cout << "ID_dispositivo: "; std::cin >> id;
    std::cout << "Fecha (YYYY-MM-DD): "; std::cin >> fecha;
    std::cout << "Nuevo consumo: "; std::cin >> nuevoConsumo;
    std::cout << "Nueva descripcion: "; std::cin.ignore(); std::getline(std::cin, nuevaDesc);
    std::string sql = "UPDATE domotica.consumos SET consumo = " + std::to_string(nuevoConsumo) +
                      ", descripcion = '" + nuevaDesc +
                      "' WHERE ID_dispositivo = " + std::to_string(id) +
                      " AND fecha = '" + fecha + "'";
    db.query(sql);
    std::cout << "Consumo actualizado.\n";
}
// --- Menú principal ---
int main() {

    //host.docker.internal   para el host en docker
    //localhost para el host en linux
    std::string host, dbname, user, password;
    std::cout << "Host de la base de datos: "; std::getline(std::cin, host);
    std::cout << "Nombre de la base de datos: "; std::getline(std::cin, dbname);
    std::cout << "Usuario: "; std::getline(std::cin, user);
    std::cout << "Contraseña: "; std::getline(std::cin, password);

    std::string conn = "host=" + host + " dbname=" + dbname + " user=" + user + " password=" + password;
    PostgresDB db(conn);
    if (!db.connect()) {
        std::cerr << "No se pudo conectar a la base de datos." << std::endl;
        return 1;
    }
    int opcion;
    do {
        std::cout << "\n--- MENU CRUD GENERAL ---\n";
        std::cout << "1. Usuarios\n2. Llaves de Acceso\n3. Dispositivos\n4. Configuraciones\n5. Accesos Usuarios\n6. Iluminacion\n7. Electrodomesticos\n8. Climatizacion\n9. Seguridad\n10. Intrusiones\n11. Cronograma Dispositivo\n12. Accesos\n13. Consumos\n0. Salir\nOpcion: ";
        std::cin >> opcion;
        std::cin.ignore();

        switch (opcion) {
            case 1: {
                int op;
                do {
                    std::cout << "\n--- CRUD USUARIOS ---\n1. Crear\n2. Leer\n3. Actualizar\n4. Eliminar\n0. Volver\nOpcion: ";
                    std::cin >> op; std::cin.ignore();
                    switch (op) {
                        case 1: crearUsuario(db); break;
                        case 2: leerUsuarios(db); break;
                        case 3: actualizarUsuario(db); break;
                        case 4: eliminarUsuario(db); break;
                    }
                } while (op != 0);
                break;
            }
            case 2: {
                int op;
                do {
                    std::cout << "\n--- CRUD LLAVES ---\n1. Crear\n2. Leer\n3. Actualizar\n4. Eliminar\n0. Volver\nOpcion: ";
                    std::cin >> op; std::cin.ignore();
                    switch (op) {
                        case 1: crearLlave(db); break;
                        case 2: leerLlaves(db); break;
                        case 3: actualizarLlave(db); break;
                        case 4: eliminarLlave(db); break;
                    }
                } while (op != 0);
                break;
            }
            case 3: {
                int op;
                do {
                    std::cout << "\n--- CRUD DISPOSITIVOS ---\n1. Crear\n2. Leer\n3. Actualizar\n4. Eliminar\n0. Volver\nOpcion: ";
                    std::cin >> op; std::cin.ignore();
                    switch (op) {
                        case 1: crearDispositivo(db); break;
                        case 2: leerDispositivos(db); break;
                        case 3: actualizarDispositivo(db); break;
                        case 4: eliminarDispositivo(db); break;
                    }
                } while (op != 0);
                break;
            }
            case 4: {
                int op;
                do {
                    std::cout << "\n--- CRUD CONFIGURACIONES ---\n1. Crear\n2. Leer\n3. Actualizar\n4. Eliminar\n0. Volver\nOpcion: ";
                    std::cin >> op; std::cin.ignore();
                    switch (op) {
                        case 1: crearConfiguracion(db); break;
                        case 2: leerConfiguraciones(db); break;
                        case 3: actualizarConfiguracion(db); break;
                        case 4: eliminarConfiguracion(db); break;
                    }
                } while (op != 0);
                break;
            }
            case 5: {
                int op;
                do {
                    std::cout << "\n--- CRUD ACCESOS USUARIOS ---\n1. Crear\n2. Leer\n3. Actualizar\n4. Eliminar\n0. Volver\nOpcion: ";
                    std::cin >> op; std::cin.ignore();
                    switch (op) {
                        case 1: crearAccesoUsuario(db); break;
                        case 2: leerAccesosUsuarios(db); break;
                        case 3: actualizarAccesoUsuario(db); break;
                        case 4: eliminarAccesoUsuario(db); break;
                    }
                } while (op != 0);
                break;
            }
            case 6: {
                int op;
                do {
                    std::cout << "\n--- CRUD ILUMINACION ---\n1. Crear\n2. Leer\n3. Actualizar\n4. Eliminar\n0. Volver\nOpcion: ";
                    std::cin >> op; std::cin.ignore();
                    switch (op) {
                        case 1: crearIluminacion(db); break;
                        case 2: leerIluminacion(db); break;
                        case 3: actualizarIluminacion(db); break;
                        case 4: eliminarIluminacion(db); break;
                    }
                } while (op != 0);
                break;
            }
            case 7: {
                int op;
                do {
                    std::cout << "\n--- CRUD ELECTRODOMESTICOS ---\n1. Crear\n2. Leer\n3. Actualizar\n4. Eliminar\n0. Volver\nOpcion: ";
                    std::cin >> op; std::cin.ignore();
                    switch (op) {
                        case 1: crearElectrodomestico(db); break;
                        case 2: leerElectrodomesticos(db); break;
                        case 3: actualizarElectrodomestico(db); break;
                        case 4: eliminarElectrodomestico(db); break;
                    }
                } while (op != 0);
                break;
            }
            case 8: {
                int op;
                do {
                    std::cout << "\n--- CRUD CLIMATIZACION ---\n1. Crear\n2. Leer\n3. Actualizar\n4. Eliminar\n0. Volver\nOpcion: ";
                    std::cin >> op; std::cin.ignore();
                    switch (op) {
                        case 1: crearClimatizacion(db); break;
                        case 2: leerClimatizacion(db); break;
                        case 3: actualizarClimatizacion(db); break;
                        case 4: eliminarClimatizacion(db); break;
                    }
                } while (op != 0);
                break;
            }
            case 9: {
                int op;
                do {
                    std::cout << "\n--- CRUD SEGURIDAD ---\n1. Crear\n2. Leer\n3. Actualizar\n4. Eliminar\n0. Volver\nOpcion: ";
                    std::cin >> op; std::cin.ignore();
                    switch (op) {
                        case 1: crearSeguridad(db); break;
                        case 2: leerSeguridad(db); break;
                        case 3: actualizarSeguridad(db); break;
                        case 4: eliminarSeguridad(db); break;
                    }
                } while (op != 0);
                break;
            }
            case 10: {
                int op;
                do {
                    std::cout << "\n--- CRUD INTRUSIONES ---\n1. Crear\n2. Leer\n3. Actualizar\n4. Eliminar\n0. Volver\nOpcion: ";
                    std::cin >> op; std::cin.ignore();
                    switch (op) {
                        case 1: crearIntrusion(db); break;
                        case 2: leerIntrusiones(db); break;
                        case 3: actualizarIntrusion(db); break;
                        case 4: eliminarIntrusion(db); break;
                    }
                } while (op != 0);
                break;
            }
            case 11: {
                int op;
                do {
                    std::cout << "\n--- CRUD CRONOGRAMA DISPOSITIVO ---\n1. Crear\n2. Leer\n3. Actualizar\n4. Eliminar\n0. Volver\nOpcion: ";
                    std::cin >> op; std::cin.ignore();
                    switch (op) {
                        case 1: crearCronograma(db); break;
                        case 2: leerCronograma(db); break;
                        case 3: actualizarCronograma(db); break;
                        case 4: eliminarCronograma(db); break;
                    }
                } while (op != 0);
                break;
            }
            case 12: {
                int op;
                do {
                    std::cout << "\n--- CRUD ACCESOS ---\n1. Crear\n2. Leer\n3. Actualizar\n4. Eliminar\n0. Volver\nOpcion: ";
                    std::cin >> op; std::cin.ignore();
                    switch (op) {
                        case 1: crearAcceso(db); break;
                        case 2: leerAccesos(db); break;
                        case 3: actualizarAcceso(db); break;
                        case 4: eliminarAcceso(db); break;
                    }
                } while (op != 0);
                break;
            }
            case 13: {
                int op;
                do {
                    std::cout << "\n--- CRUD CONSUMOS ---\n1. Crear\n2. Leer\n3. Actualizar\n4. Eliminar\n0. Volver\nOpcion: ";
                    std::cin >> op; std::cin.ignore();
                    switch (op) {
                        case 1: crearConsumo(db); break;
                        case 2: leerConsumos(db); break;
                        case 3: actualizarConsumo(db); break;
                        case 4: eliminarConsumo(db); break;
                    }
                } while (op != 0);
                break;
            }
            case 0: break;
            default: std::cout << "Opcion invalida.\n";
        }
    } while (opcion != 0);

    db.disconnect();
    return 0;
}