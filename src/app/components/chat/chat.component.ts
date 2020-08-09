import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  public mensaje: string = '';

  public elemento: any; 

  constructor( public chatService: ChatService ) {

    // Aqui nos suscribimos al Observable que esta en el metodo de loadMessages en el chat.service.ts 
    this.chatService.loadMessages().subscribe( ()=> {


      setTimeout(() => {
        

        this.elemento.scrollTop = this.elemento.scrollHeight;

      }, 20 );



    });


  }

  ngOnInit() {

    this.elemento = document.getElementById('app-mensajes');



  }

  public sendMessage() {

    //console.log( this.mensaje ); 

    if( this.mensaje.length == 0 ) {

      return;


    }

    // Aqui hacemos el then y catch; aqui enviamos el mensaje 
    this.chatService.addMessage( this.mensaje ).then( ()=>{

      console.log( 'Mensaje enviado con éxito' );

      this.mensaje = '';


    } ).catch( ( err )=> {
    
      console.log( 'Error al enviar el mensaje', err );

      this.mensaje = '';


    })

   

   

  }

}
