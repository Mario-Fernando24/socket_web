const { io } = require('../index');

io.on('connect', client => {
    
    console.log("Cliente Conectado");



    //notifica cuando el cliente se desconecta
    client.on('disconnect', () => { 
        console.log("Cliente desconectado");
     });


    //escuchando 
     client.on('mensaje',(payload)=>{
        console.log('Mensaje Mario !!!',payload);
        //enviarle mensaje a todas las personas conectadas
        client.emit('mensaje', {admin: 'Nuevo mensaje'})
     });



     client.on('emitir-mensaje',(payload)=>{
      
      console.log('Mensaje Marioooooooooooooooooo!!!',payload);
    
         //emite a todos los dispositivos
         //io.emit('nuevo-mensaje', payload)
         //todos menos al que lo emitio
         client.broadcast.emit('nuevo-mensaje', payload)


   });
     
  });
