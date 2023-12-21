import { InjectRepository } from '@nestjs/typeorm';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
//import { createServer } from 'http';
import { MatchService } from 'src/matches/match.service';
import { Match } from 'src/matches/match.entity';
import { FoulService } from 'src/fouls/foul.service';
import { Player } from 'src/players/player.entity';
//import { SubstitutionService } from 'src/substitutions/substitution.service';
import { ScoreService } from 'src/scores/score.service';
import { TeamService } from 'src/teams/team.service';
import { Repository } from 'typeorm';

@WebSocketGateway(3001, { cors: 'http://localhost:5173' })
export class SocketGateway {

  constructor(
    private readonly foulService: FoulService,
    //private readonly substitutionService: SubstitutionService,
    private readonly scoreService: ScoreService,
    private readonly matchService: MatchService,
    private readonly teamService: TeamService,
    @InjectRepository(Match)
    private readonly matchRepository: Repository<Match>,
    @InjectRepository(Player)
    private readonly playerRepository: Repository<Player>,
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

  handleTeamPoints(){

  }
  //maybe if I send the equipoid from the front too in the payload..

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
    //aqui enviará a la sala del partidoId, al evento del emit, los valores del payload. 
    //Esto se verá allá donde haya un socket.on('foulUpdate') en mi rama --> userScreen
    this.server.to(payload.partidoId).emit('foulUpdate', payload);
  }

  @SubscribeMessage('scoreUpdate')
  emitScoreUpdate(@MessageBody() payload) {
    console.log(payload);
    this.scoreService.createScore(payload)
    //need the logic for dividing the points here before it is sent to the
    this.server.to(payload.partidoId).emit('scoreUpdate', payload);
  }

  @SubscribeMessage('scoreUpdateTeams')
  async handleScoreUpdate(@MessageBody() payload): Promise<any> {
    console.log(payload);
    try {
      const match = await this.matchRepository.findOne({ where: { partidoid: payload.partidoId }, relations: ['localid', 'visitanteid'] });
      console.log(match);
      const player = await this.playerRepository.findOne({ where: { jugadorid: payload.jugadorId } }); 
      console.log(player);
      if (!match || !player) {
        console.log('Match/ Player not found');
      }

      let equipoToUpdate: any;
      if (player.equipoid === match.localid.equipoid) {  
        equipoToUpdate = match.localid.equipoid;
        console.log(equipoToUpdate); 
      } else if (player.equipoid === match.visitanteid.equipoid) {
        equipoToUpdate = match.visitanteid.equipoid;     //'visitanteid'
        console.log(equipoToUpdate);
      } else {  
        console.log('Player on neither tem' );
      }

      const puntos = payload.puntos;

      // Update the score --> equipoToUpdate (local/ visitante)
      if (equipoToUpdate === match.localid.equipoid) {
        match.puntuacion_equipo_local += puntos;
      } else if (equipoToUpdate === match.visitanteid.equipoid){
        match.puntuacion_equipo_visitante += puntos;
      }

/*       await this.matchRepository.save(match);
      await this.playerRepository.save(player); */

      this.scoreService.createScore(payload);
      // Data --> client espero que sí
      this.server.to(payload.partidoId).emit('scoreUpdateTeams', {equipoToUpdate, puntos}); 

      return { success: true, message: 'Updated successfully' };
    } catch (error) {
      console.error('Error updating scores:', error);
    }
  }
/*   emitSubstitutionUpdate(partidoid: string, newSubstitution: any) {
    this.server.to(partidoid).emit('substitutionUpdate', newSubstitution);
  } */

}