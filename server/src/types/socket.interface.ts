import { Socket as SocketIoSocket } from "socket.io";
import { UserDocument } from "./user.interface";

export interface Socket extends SocketIoSocket {
  user?: UserDocument;
}
