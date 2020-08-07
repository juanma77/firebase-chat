import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  public mensaje: string = '';

  constructor() { }

  ngOnInit() {
  }

  public sendMessage() {

    console.log( this.mensaje ); 

  }

}
