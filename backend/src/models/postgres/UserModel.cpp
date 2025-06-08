//instaciamos los cuerpos de los metodos estaticos del userModel.h
#include "UserModel.h"
#include <iostream>


void UserModel::getAll(){
    std::cout << "Obteniendo todos los usuarios " <<std::endl; 
}


void UserModel::getById(int id){
    std::cout << "Obteniendo el usuarios del id "<< id <<std::endl; 
}

void UserModel::getByRol(const std::string& rol){
    std::cout << "Obteniendo todos los usuarios que tengan el rol de: "<< rol <<std::endl; 
}