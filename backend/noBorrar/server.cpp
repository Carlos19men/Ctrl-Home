#include <iostream> 
#include <sys/socket.h>
#include <netinet/in.h>
#include <unistd.h> 
#include <cstring>

//

void starServer(){
    //datos para el servidor 
    int server_fd; 
    struct sockaddr_in address; 
    int opt = 1; 
    int port = 8080; 

    //1. creamos el socket 
    if((server_fd = socket(AF_INET,SOCK_STREAM,0)) == -1){
        //En caso de que no se pudo crear el sokect
        perror("error al crear el socket"); 
        exit(EXIT_FAILURE); 
    }

    //2. definir la direccíon el servidor 
    address.sin_family = AF_INET; 
    address.sin_addr.s_addr = INADDR_ANY; 
    address.sin_port = htons(port); 

    //3. enlazar el socket a la dirección y al puerto 
    if(bind(server_fd,(struct sockaddr*)&address, sizeof(address)) == -1){
        perror("error en el bind");
        close(server_fd); 
        exit(EXIT_FAILURE);
    }

    //4. ponemos al servidor en modo de escucha
    if(listen(server_fd,50) == -1){
        perror("error en el listen");
        close(server_fd); 
        exit(EXIT_FAILURE);
    }

    //5.creamos un bucle infinito y empezamos a escuchar y recibir solicitudes 
    std::cout << "Servidor corriendo http://localhost:" << port << std::endl;
    while(true){


        std::cout << "Esperando una solicitud" << std::endl;

        //creamos un socketclient para recibir las solicitudes 
        int socket_client_fd = accept(server_fd,(struct sockaddr *)&address,(socklen_t*)&address);

        //vefircamos en caso de error 
        if(socket_client_fd == -1){
            perror("Error al aceptar conexion");

            continue; 
        }

        std::cout << "Conexion aceptada. Nuevo socket de cliente: " << socket_client_fd << std::endl;


        //creamos un proceso hijo para que este evalue la solicitud mientras 
        //que el padre sigue escuchando más solicitudes 

        pid_t pid = fork();

        if(pid < 0){
            perror("Error en fork");
            close(socket_client_fd);
            continue;
        }

        //para el hijo 
        if(pid == 0){

            // el hijo no necesita seguir escuchando al servidor, solo tiene que evaluar la solicitud 
            close(server_fd);

            std::cout << "  (Hijo " << getpid() << "): Manejando la solicitud del cliente " << socket_client_fd << std::endl;
            
            //armamos la respuesta a la solicitud 
            const char* http_response = "HTTP/1.1 200 OK\r\nContent-Length: 12\r\n\r\nHello World!";
            
            //enviamos la respuesta 
            send(socket_client_fd, http_response, strlen(http_response),0);

            std::cout << "  (Hijo " << getpid() << "): envio la respuesta " << socket_client_fd << std::endl;
            
            //cerramos el socket del cliente una vez finalizado el proceso 
            close(socket_client_fd);

            //finalizamos el proceso para el hijo 
            exit(0);

        }else{
            //el padre no necesita el socket del hijo ya que este lo va a usar es el hijo 
            close(socket_client_fd);
        }



    }

    //cerramos el socket 
    close(server_fd); 
    std::cout << "Socket cerrado." <<std::endl; 

}

int main(){

    starServer(); 

    return 0; 
}