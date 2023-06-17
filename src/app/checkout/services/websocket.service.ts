import { EventEmitter, Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { WebSocketSubject } from 'rxjs/webSocket';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private socket: WebSocket;
  private webhookSubject: Subject<any> = new Subject<any>();

  constructor() {

    this.socket = new WebSocket('ws://localhost:3081/');

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      this.webhookSubject.next(data);
    };
  }

  public getwebhookSubject() {
    return this.webhookSubject.asObservable();
  }
}