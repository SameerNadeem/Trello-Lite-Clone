import { Injectable } from '@angular/core';
import { CurrentUserInterface } from 'src/app/auth/types/currentUser.interface';
import { io, Socket } from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class SocketService {
  socket: Socket | undefined;

  setupSocketConnection(currentUser: CurrentUserInterface): void {
    this.socket = io(environment.socketUrl, {
      auth: {
        token: currentUser.token,
      },
    });
  }

  disconnect(): void {
    if (!this.socket) {
      throw new Error('Socket connection is not established');
    }
    this.socket.disconnect();
  }

  emit(eventName: string, message: any): void {
    if (!this.socket) {
      throw new Error('Socket connection is not established');
    }
    this.socket.emit(eventName, message);
  }

  listen<T>(eventName: string): Observable<T> {
    const socket = this.socket;
    if (!socket) {
      throw new Error('Socket connection is not established');
    }

    return new Observable((subscriber) => {
      socket.on(eventName, (data) => {
        subscriber.next(data);
      });
    });
  }
}
