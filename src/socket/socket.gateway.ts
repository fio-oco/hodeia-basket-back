import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MatchService } from 'src/matches/match.service';

@WebSocketGateway()
export class SocketGateway {
  @WebSocketServer()
  private server: Server;
  //private matchRooms: Record<string, string[]> = {}; //to store the ids of match rooms

  constructor(private readonly matchService: MatchService){}

  handleConnection(client: Socket){
    console.log(`Client connected: ${client.id}`);
  //need logic for joining rooms here
  }

  handleDisconnect(client: Socket){
    console.log(`Client disconnected: ${client.id}`);
  //need logic for disconnecting ie. leaving the room, closing the connection etc. 
  }

  handleJoinMatchRoom(client: Socket, partidoid: string){
    const match = this.matchService.getMatchById(partidoid);

    client.join(partidoid);
    client.to(partidoid).emit('roomCreated', {room: partidoid});
    client.emit('matchDetails', match);
    //return {event: 'roomCreated', room: partidoid};
  }

  emitFoulUpdate(partidoid: string, newFoul: any){
    this.server.to(partidoid).emit('foulCreated', newFoul);
  }

  emitScoreUpdate(partidoid: string, newScore: any){
    this.server.to(partidoid).emit('scoreCreated', newScore);
  }

  emitSubstitutionUpdate(partidoid: string, newSubstitution: any){
    this.server.to(partidoid).emit('gameCreated', newSubstitution);
  }

  // I need to thing 
/*   @SubscribeMessage('events')
  handleEvent(
    @MessageBody() match: string,
    @ConnectedSocket() client: Socket,
  ): string {
    return data;
  } */
  }

