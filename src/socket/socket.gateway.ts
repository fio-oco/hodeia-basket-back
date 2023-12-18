import { InjectRepository } from '@nestjs/typeorm';
import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Match } from 'src/matches/match.entity';
import { MatchService } from 'src/matches/match.service';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

@WebSocketGateway()
export class SocketGateway {
  @WebSocketServer()
  private server: Server;
  private matchRooms: Record<string, string[]> = {}; //to store the ids of match rooms

  constructor(
    //@InjectRepository(Match) private readonly matchRepository: Repository<Match>){}
private readonly matchService: MatchService){}
//private readonly foulService: FoulService){}

  handleConnection(client: Socket){
    console.log(`Client connected: ${client.id}`);
  //need logic for joining rooms here
  }

  handleRefereeData(data: any){
    this.server.emit('gameUpdate', data);
  }

/*   handleJoinMatchRoom(client: Socket, partidoid: string){
    const match = this.matchService.getMatchById(partidoid);

    client.join(partidoid);
    client.to(partidoid).emit('roomCreated', {room: partidoid});
    client.emit('matchDetails', match);
    //return {event: 'roomCreated', room: partidoid};
  } */

  handleJoinMatchRoom(client: Socket, partidoid: string) {
    client.join(partidoid); // Client joins the room
    if (!this.matchRooms[partidoid]) {
      this.matchRooms[partidoid] = [];
    }
    this.matchRooms[partidoid].push(client.id); // Store client in the room
    client.to(partidoid).emit('roomCreated', { room: partidoid });
  }

  handleDisconnect(client: Socket){
    console.log(`Client disconnected: ${client.id}`);
  //need logic for disconnecting ie. leaving the room, closing the connection etc. 
  }

  emitFoulUpdate(partidoid: string, newFoul: any){
    this.server.to(partidoid).emit('foulUpdate', newFoul);
  }

  emitScoreUpdate(partidoid: string, newScore: any){
    this.server.to(partidoid).emit('scoreCreated', newScore);
  }

  emitSubstitutionUpdate(partidoid: string, newSubstitution: any){
    this.server.to(partidoid).emit('gameCreated', newSubstitution);
  }

  }

