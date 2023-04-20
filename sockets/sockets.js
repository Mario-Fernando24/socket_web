const { io } = require('../index');
const Bands = require('../models/bands');
const Band = require('../models/band');
const { emit } = require('nodemon');

 const bands = new Bands();

 bands.addBand( new Band( 'CHAMPETA' ) );
 bands.addBand( new Band( 'VALLENATO' ) );
 bands.addBand( new Band( 'PORRO' ) );
 bands.addBand( new Band( 'CUMBIA' ) );
 bands.addBand( new Band( 'POP' ) );
 bands.addBand( new Band( 'ROCK' ) );
 bands.addBand( new Band( 'BOLERO' ) );
 bands.addBand( new Band( 'RANCHERA' ) );
 bands.addBand( new Band( 'DESPECHO' ) );


// // console.log(bands);


io.on('connect', client => {
    
    console.log("Cliente Conectado");

   //  //EMITIR LOS GENEROS A LOS CLIENTES QUE ESTAN CONECTADOS
     client.emit('active-gender', bands.getBands());


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

      //votacion  
      client.on('vote-gender',(gender)=>{
         bands.voreBand(gender.id)
         io.emit('active-gender', bands.getBands());

      });

        //agregar genero  
        client.on('add-gender',(gender)=>{
         const newGender= new Band(gender.name)
         bands.addBand(newGender)
         io.emit('active-gender', bands.getBands());
      });

        //eliminar genero  
        client.on('delete-gender',(gender)=>{
         bands.deleteBand(gender.id)
         io.emit('active-gender', bands.getBands());
      });
      




       client.on('emitir-mensaje',(payload)=>{

      console.log('Mensaje Marioooooooooooooooooo!!!',payload);
    
         //emite a todos los dispositivos
         //io.emit('nuevo-mensaje', payload)
         //todos menos al que lo emitio
         client.broadcast.emit('nuevo-mensaje', payload)
   });

   
 
     
  });
