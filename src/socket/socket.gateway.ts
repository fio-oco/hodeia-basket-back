import { InjectRepository } from '@nestjs/typeorm';
import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { createServer } from "http";
import { Match } from 'src/matches/match.entity';
import { MatchService } from 'src/matches/match.service';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

@WebSocketGateway(3001, { cors: 'http://localhost:5173' })
export class SocketGateway {
  @WebSocketServer()
   private  server: Server;
   private  matchRooms: Record<string, string[]> = {}; //to store the ids of match rooms

  constructor(
    //@InjectRepository(Match) private readonly matchRepository: Repository<Match>){}
    //private readonly foulService: FoulService){}
    private readonly matchService: MatchService){
      const httpServer = createServer();
      const io = new Server(httpServer, {
        cors: {
          origin: "http://localhost:5173",
          methods: ['GET', 'POST', 'PATCH'],
          allowedHeaders: ['Content-Type', 'Authorization'],
          // credentials: true,
        }
      });
      /* const io = require('socket.io')(this.server, {
        cors: {
          origin: 'http://localhost:5173',
          methods: ['GET', 'POST', 'PATCH'],
          allowedHeaders: ['Content-Type', 'Authorization'],
          credentials: true,
        },
      }); */

      io.on('connection', (socket) => {
        console.log('Socket connected:', socket.id);
      });

      // httpServer.listen(3001, () => {
      //   console.log('Socket.IO server running on port 3001')
      // })
    }

    
  handleConnection(socket: Socket){
    socket.on('joinMatchRoom', (partidoid: string) => {
      socket.join(partidoid);
      console.log(`Client connected: ${socket.id} in match room ${partidoid}` );
    });
    
  //need logic for joining rooms here
  }

  handleRefereeData(client: Socket, partidoid: string, data: any){
    this.server.emit('gameUpdate', data);
  }

  handleJoinMatchRoom(client: Socket, partidoid: string) {
    client.join(partidoid); // Client joins the room
    if (!this.matchRooms[partidoid]) {
      this.matchRooms[partidoid] = [];
    }
    this.matchRooms[partidoid].push(client.id); // Store client in the room
    client.to(partidoid).emit('roomCreated', { room: partidoid });
  }

/*   handleDisconnect(client: Socket){
    console.log(`Client disconnected: ${client.id}`);
  //need logic for disconnecting ie. leaving the room, closing the connection etc. 
  } */

  emitFoulUpdate(partidoid: string, newFoul: any){
    this.server.to(partidoid).emit('foulUpdate', newFoul);
  }

  emitScoreUpdate(partidoid: string, newScore: any){
    this.server.to(partidoid).emit('scoreUpdate', newScore);
  }

  emitSubstitutionUpdate(partidoid: string, newSubstitution: any){
    this.server.to(partidoid).emit('substitutionUpdate', newSubstitution);
  }
  }

