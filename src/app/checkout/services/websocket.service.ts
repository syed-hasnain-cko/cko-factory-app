import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebSocketSubject } from 'rxjs/webSocket';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private socket!: WebSocket;

  public connect(paymentId: string): Observable<any> {
    if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
    this.socket = new WebSocket(`ws://localhost:3081/${paymentId}`);
    }
    return new Observable(observer => {
      this.socket.onmessage = (event) => {
        observer.next(event.data);
      };
      
      this.socket.onerror = (event) => {
        observer.error(event);
      };
      
      this.socket.onclose = () => {
        observer.complete();
      };
    });
  
}
  
  public disconnect(): void {
    if (this.socket) {
      this.socket.close();
    }
  }
}
