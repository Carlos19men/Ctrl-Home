#include "PostgresDB.h"
#include <iostream>

PostgresDB::PostgresDB(const std::string& conninfo) : conn(nullptr), conninfo(conninfo) {}

PostgresDB::~PostgresDB() {
    disconnect();
}

bool PostgresDB::connect() {
    conn = PQconnectdb(conninfo.c_str());
    if (PQstatus(conn) != CONNECTION_OK) {
        std::cerr << "Error de conexión: " << PQerrorMessage(conn) << std::endl;
        return false;
    }
    return true;
}

void PostgresDB::disconnect() {
    if (conn) {
        PQfinish(conn);
        conn = nullptr;
    }
}

bool PostgresDB::isConnected() const {
    return conn && PQstatus(conn) == CONNECTION_OK;
}

std::vector<std::map<std::string, std::string>> PostgresDB::query(const std::string& sql) {
    std::vector<std::map<std::string, std::string>> results;
    if (!isConnected()) return results;

    PGresult* res = PQexec(conn, sql.c_str());
    ExecStatusType status = PQresultStatus(res);

    if (status == PGRES_TUPLES_OK) {
        int rows = PQntuples(res);
        int cols = PQnfields(res);
        for (int i = 0; i < rows; ++i) {
            std::map<std::string, std::string> row;
            for (int j = 0; j < cols; ++j) {
                row[PQfname(res, j)] = PQgetvalue(res, i, j);
            }
            results.push_back(row);
        }
    } else if (status != PGRES_COMMAND_OK) {
        std::cerr << "Error en la consulta: " << PQerrorMessage(conn) << std::endl;
    }
    PQclear(res);
    return results;
}