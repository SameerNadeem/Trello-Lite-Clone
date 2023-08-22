import { Request, Response, NextFunction } from "express";
import { Server } from "socket.io";
import { Socket } from "../types/socket.interface";
import BoardModel from "../models/board";
import { ExpressRequestInterface } from "../types/expressRequest.interface";
import { SocketEventsEnum } from "../types/socketEvents.enum";
import { getErrorMessage } from "../helpers";

export const getBoards = async (
  req: ExpressRequestInterface,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const boards = await BoardModel.find({ userId: req.user.id });
    res.send(boards);
  } catch (err) {
    next(err);
  }
};

export const getBoard = async (
  req: ExpressRequestInterface,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const board = await BoardModel.findById(req.params.boardId);
    res.send(board);
  } catch (err) {
    next(err);
  }
};

export const createBoard = async (
  req: ExpressRequestInterface,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const newBoard = new BoardModel({
      title: req.body.title,
      userId: req.user.id,
    });
    const savedBoard = await newBoard.save();
    res.send(savedBoard);
  } catch (err) {
    next(err);
  }
};

export const joinBoard = (
  io: Server,
  socket: Socket,
  data: { boardId: string }
) => {
  console.log("server socket io join", socket.user);
  socket.join(data.boardId);
};

export const leaveBoard = (
  io: Server,
  socket: Socket,
  data: { boardId: string }
) => {
  console.log("server socket io leave", data.boardId);
  socket.leave(data.boardId);
};

export const updateBoard = async (
  io: Server,
  socket: Socket,
  data: { boardId: string; fields: { title: string } }
) => {
  try {
    if (!socket.user) {
      socket.emit(
        SocketEventsEnum.boardsUpdateFailure,
        "User is not authorized"
      );
      return;
    }
    const updatedBoard = await BoardModel.findByIdAndUpdate(
      data.boardId,
      data.fields,
      { new: true }
    );
    io.to(data.boardId).emit(
      SocketEventsEnum.boardsUpdateSuccess,
      updatedBoard
    );
  } catch (err) {
    socket.emit(SocketEventsEnum.boardsUpdateFailure, getErrorMessage(err));
  }
};

export const deleteBoard = async (
  io: Server,
  socket: Socket,
  data: { boardId: string }
) => {
  try {
    if (!socket.user) {
      socket.emit(
        SocketEventsEnum.boardsDeleteFailure,
        "User is not authorized"
      );
      return;
    }
    await BoardModel.deleteOne({ _id: data.boardId });
    io.to(data.boardId).emit(SocketEventsEnum.boardsDeleteSuccess);
  } catch (err) {
    socket.emit(SocketEventsEnum.boardsDeleteFailure, getErrorMessage(err));
  }
};
