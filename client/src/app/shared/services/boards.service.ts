import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BoardInterface } from '../types/board.interface';
import { SocketEventsEnum } from '../types/socketEvents.enum';
import { SocketService } from './socket.service';

@Injectable()
export class BoardsService {
  constructor(private http: HttpClient, private socketService: SocketService) {}

  getBoards(): Observable<BoardInterface[]> {
    const url = environment.apiUrl + '/boards';
    return this.http.get<BoardInterface[]>(url);
  }

  getBoard(boardId: string): Observable<BoardInterface> {
    const url = `${environment.apiUrl}/boards/${boardId}`;
    return this.http.get<BoardInterface>(url);
  }

  createBoard(title: string): Observable<BoardInterface> {
    const url = environment.apiUrl + '/boards';
    return this.http.post<BoardInterface>(url, { title });
  }

  updateBoard(boardId: string, fields: { title: string }): void {
    this.socketService.emit(SocketEventsEnum.boardsUpdate, { boardId, fields });
  }

  deleteBoard(boardId: string): void {
    this.socketService.emit(SocketEventsEnum.boardsDelete, { boardId });
  }
}
