#pragma once
#include <postgresql/libpq-fe.h>
#include <string>
#include <vector>
#include <map>

class PostgresDB {
public:
    PostgresDB(const std::string& conninfo);
    ~PostgresDB();

    bool connect();
    void disconnect();
    bool isConnected() const;

    // Ejecuta una consulta SELECT y devuelve los resultados como vector de mapas
    std::vector<std::map<std::string, std::string>> query(const std::string& sql);

private:
    PGconn* conn;
    std::string conninfo;
};