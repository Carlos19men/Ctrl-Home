//instaciamos los cuerpos de los metodos estaticos del userModel.h
#include "UserModel.h"

int UserModel::getAll(){
    return 1; 
}


int UserModel::getById(int id){
    return 2; 
}

int UserModel::getByRol(const std::string& rol){
    return 3; 
}