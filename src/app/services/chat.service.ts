import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { MessageInterface } from '../interfaces/MessageInterface';

import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private itemsCollection: AngularFirestoreCollection<MessageInterface>;

  public chats: MessageInterface[] = [];

  constructor( private afs: AngularFirestore ) { }

  // El valueChanges() es para estar pendiente de todos los cambios que ocurran el elemento, en este caso, en el itemsCollection
  public loadMessages() {

    this.itemsCollection = this.afs.collection<MessageInterface>('chats');

    // Regresamos este objeto, al cual nos tenemos que suscribir en otro lado, en este caso, nos suscribimos a él en el chat.component.ts
    return this.itemsCollection.valueChanges().pipe(


      map((mensajes: MessageInterface[]) =>{

        console.log( mensajes );

        this.chats = mensajes;

        

      })




    )
    


  }

  // Agregamos un mensaje a la bd 
  public addMessage( texto: string ) {

    let mensaje: MessageInterface = {

      name: 'Marcus',
      mensaje: texto,
      date: new Date()


    }

    // Hacemos la insercion a la bd; esto regresa una Promesa, entonces en cualquier otro lado que usemos la funcion addMessage debemos de utilizar el then y el catch

    console.log( mensaje );

    return this.itemsCollection.add( mensaje );



  }

}
