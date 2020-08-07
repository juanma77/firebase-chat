import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  public mensaje: string = '';

  constructor( private chatService: ChatService ) {

    // Aqui nos suscribimos al Observable que esta en el metodo de loadMessages en el chat.service.ts 
    this.chatService.loadMessages().subscribe( (mensajes: any[]) =>{

      // Estos son los campos que corresponden a los mensajes que estan en la bd de Firebase 
      console.log( mensajes );

    })


  }

  ngOnInit() {



  }

  public sendMessage() {

    //console.log( this.mensaje ); 

   

   

  }

}
