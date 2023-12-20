import { InjectRepository } from '@nestjs/typeorm';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { createServer } from 'http';
import { Match } from 'src/matches/match.entity';
import { MatchService } from 'src/matches/match.service';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { FoulService } from 'src/fouls/foul.service';
//import { SubstitutionService } from 'src/substitutions/substitution.service';
import { ScoreService } from 'src/scores/score.service';

@WebSocketGateway(3001, { cors: 'http://localhost:5173' })
export class SocketGateway {

  constructor(
    private readonly foulService: FoulService,
    //private readonly substitutionService: SubstitutionService,
    private readonly scoreService: ScoreService,
  ) {}

  @WebSocketServer()
  server: Server;
  matchRooms: Record<string, string[]> = {}; //to store the ids of match rooms

  handleConnection(socket: Socket) {
    socket.on('joinMatchRoom', (partidoid: string) => {
      console.log('cuando me llaman desde el front');

      socket.join(partidoid);
      // this.server.in(socket.id).socketsJoin(partidoid)
      console.log(`Client connected: ${socket.id} in match room ${partidoid}`);
    });
  }
  // handleRefereeData(client: Socket, partidoid: string, data: any){
  //   this.server.emit('gameUpdate', data);
  // }

  @SubscribeMessage('gameUpdate')
  handleGameUpdate(@MessageBody() payload) {
    console.log(payload);
    this.server.to(payload.roomname).emit('gameUpdate', { partido: payload.roomname });
  }

  handleJoinMatchRoom(client: Socket, partidoid: string) {
    client.join(partidoid); // --> 'client' se conecta a la sala
    if (!this.matchRooms[partidoid]) {
      this.matchRooms[partidoid] = [];
    }
    this.matchRooms[partidoid].push(client.id); // --> para guardar el id del cliente 
    client.to(partidoid).emit('roomCreated', { room: partidoid });
  }

  /*   handleDisconnect(client: Socket){
    console.log(`Client disconnected: ${client.id}`);
  //need logic for disconnecting ie. leaving the room, closing the connection etc. 
  } */

  //etiqueta que conecta el evento del front con la funcion del back
  @SubscribeMessage('foulUpdate')
  emitFoulUpdate(@MessageBody() payload) {
    console.log(payload);
    //aqui irá al service, que irá a la base de datos
    this.foulService.createFoul(payload)
    //aqui enviará a la sala del partidoId, al evento del emit, los valores del payload (o lo que queráis pasar). 
    //Esto se verá allá donde haya un socket.on('foulUpdate') en mi rama --> userScreen
    this.server.to(payload.partidoId).emit('foulUpdate', payload);
  }

  @SubscribeMessage('scoreUpdate')
  emitScoreUpdate(@MessageBody() payload) {
    console.log(payload);
    this.scoreService.createScore(payload)
    this.server.to(payload.partidoId).emit('scoreUpdate', payload);
  }

  

/*   emitSubstitutionUpdate(partidoid: string, newSubstitution: any) {
    this.server.to(partidoid).emit('substitutionUpdate', newSubstitution);
  } */
}