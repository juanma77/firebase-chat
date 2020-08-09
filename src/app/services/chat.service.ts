import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { MessageInterface } from '../interfaces/MessageInterface';

import { map } from 'rxjs/operators';

// Para la autenticacion con Google
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private itemsCollection: AngularFirestoreCollection<MessageInterface>;

  public chats: MessageInterface[] = [];

  public usuario: any = {}; 

  constructor( private afs: AngularFirestore, public auth: AngularFireAuth ) {


    this.auth.authState.subscribe( user => {

      console.log( 'Estado del usuario: ', user );

      if ( !user ) {

        return;

      }

      this.usuario.nombre = user.displayName;
      this.usuario.uid = user.uid; 


    });

  }

  // El valueChanges() es para estar pendiente de todos los cambios que ocurran el elemento, en este caso, en el itemsCollection
  public loadMessages() {

    // La ref es para hacer un query y ordenar los mensajes en forma descendete y obtenemos los ultimos 5 mensajes
    this.itemsCollection = this.afs.collection<MessageInterface>('chats', ref => ref.orderBy( 'date', 'desc').limit(5));

    // Regresamos este objeto, al cual nos tenemos que suscribir en otro lado, en este caso, nos suscribimos a él en el chat.component.ts; unshift() es para insertar un elemento en la primera posicion del array 
    return this.itemsCollection.valueChanges().pipe(


      map((mensajes: MessageInterface[]) =>{

        console.log( mensajes );

        this.chats = [];

        for( let mensaje of mensajes ) {

          this.chats.unshift( mensaje );

        }

        return this.chats; 

        //this.chats = mensajes;

        

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

  // Este metodo viene por defecto en la pagina de autenticacion con google de firebase
  login( proveedor: string ) {
    this.auth.auth.signInWithPopup( new auth.GoogleAuthProvider() );
  }

  // Este metodo viene por defecto en la pagina de autenticacion con google de firebase
  logout() {
    this.auth.auth.signOut();
  }

}
