import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private itemsCollection: AngularFirestoreCollection<any>;

  public chats: any[] = [];

  constructor( private afs: AngularFirestore ) { }

  // El valueChanges() es para estar pendiente de todos los cambios que ocurran el elemento, en este caso, en el itemsCollection
  public loadMessages() {

    this.itemsCollection = this.afs.collection<any>('chats');

    // Regresamos este objeto, al cual nos tenemos que suscribir en otro lado, en este caso, nos suscribimos a él en el chat.component.ts
    return this.itemsCollection.valueChanges();


  }

}
