# --- Variables de Configuración ---
CXX = g++
CXXFLAGS = -std=c++17

PROJECT_ROOT = .
BACKEND_ROOT = $(PROJECT_ROOT)/backend
SRC_DIR = $(BACKEND_ROOT)/src
OBJ_DIR = $(BACKEND_ROOT)/obj
BIN_DIR = $(BACKEND_ROOT)/bin

INCLUDE_DIRS = -I$(SRC_DIR)

# --- Archivos Fuente (.cpp) ---
CPP_SOURCES = \
    $(SRC_DIR)/app.cpp \
    $(wildcard $(SRC_DIR)/controllers/*.cpp) \
    $(wildcard $(SRC_DIR)/models/postgres/*.cpp)

# --- Archivos Objeto (.o) ---
OBJECTS = \
    $(OBJ_DIR)/app.o \
    $(OBJ_DIR)/controllers/UserController.o \
    $(OBJ_DIR)/models/postgres/UserModel.o

# --- Ejecutable Final ---
TARGET = $(BIN_DIR)/app_executable

# --- Reglas de Make ---

.PHONY: all clean run rebuild

# Objetivo principal: 'all'
all: $(TARGET)

# Regla para enlazar los archivos objeto y crear el ejecutable
$(TARGET): $(OBJECTS) | $(BIN_DIR)
	@echo "----------------------------------------"
	@echo "🔨 Enlazando ejecutable: $@"
	$(CXX) $(CXXFLAGS) $^ -o $@
	@echo "¡✅ Compilación y Enlazado Completado!"
	@echo "----------------------------------------"

# Reglas específicas para compilar cada archivo .cpp en su .o
$(OBJ_DIR)/app.o: $(SRC_DIR)/app.cpp | $(OBJ_DIR)
	@echo "⚙️ Compilando app.cpp -> $@"
	$(CXX) $(CXXFLAGS) $(INCLUDE_DIRS) -c $< -o $@

$(OBJ_DIR)/controllers/UserController.o: $(SRC_DIR)/controllers/UserController.cpp | $(OBJ_DIR)/controllers
	@echo "⚙️ Compilando controladores -> $@"
	$(CXX) $(CXXFLAGS) $(INCLUDE_DIRS) -c $< -o $@

$(OBJ_DIR)/models/postgres/UserModel.o: $(SRC_DIR)/models/postgres/UserModel.cpp | $(OBJ_DIR)/models/postgres
	@echo "⚙️ Compilando modelos -> $@"
	$(CXX) $(CXXFLAGS) $(INCLUDE_DIRS) -c $< -o $@

# --- Creación de Directorios ---
$(OBJ_DIR):
	@echo "⚙️ Creando directorio: $(OBJ_DIR)"
	mkdir -p $(OBJ_DIR)

$(BIN_DIR):
	@echo "⚙️ Creando directorio: $(BIN_DIR)"
	mkdir -p $(BIN_DIR)

$(OBJ_DIR)/controllers:
	@echo "⚙️ Creando directorio: $(OBJ_DIR)/controllers"
	mkdir -p $(OBJ_DIR)/controllers

$(OBJ_DIR)/models/postgres:
	@echo "Creando directorio: $(OBJ_DIR)/models/postgres"
	mkdir -p $(OBJ_DIR)/models/postgres

# --- Reglas de Ayuda ---
run: $(TARGET)
	@echo "----------------------------------------"
	@echo "✅ Ejecutando Backend"
	$(TARGET)
	@echo "\r\n\r\n"
	@echo "----------------------------------------"

clean:
	@echo "⚙️ Limpiando archivos de compilación..."
	$(RM) -r $(OBJ_DIR) $(BIN_DIR)
	@echo "✅ Archivos de compilación limpiados.\r\n\r\n"

rebuild: clean all
	@echo "✅ Reconstrucción completa \r\n\r\n"