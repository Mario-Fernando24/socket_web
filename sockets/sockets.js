const { io } = require('../index');

io.on('connection', client => {
    
    console.log("Cliente Conectado");

    //notifica cuando el cliente se desconecta
    client.on('disconnect', () => { 
        console.log("Cliente desconectado");
     });


    //escuchando 
     client.on('mensaje',(payload)=>{
        console.log('Mensaje Mario !!!',payload);
        //enviarle mensaje a todas las personas conectadas
        io.emit('mensaje', {admin: 'Nuevo mensaje'})
     });
     
  });
