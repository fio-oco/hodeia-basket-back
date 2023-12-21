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
    this.server
      .to(payload.roomname)
      .emit('gameUpdate', { partido: payload.roomname });
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

  @SubscribeMessage('foulUpdate')
  async emitFoulUpdate(@MessageBody() payload) {
    console.log(payload);
    const player = await this.playerRepository.findOne({
      where: { jugadorid: payload.jugadorId },
    });
    this.foulService.createFoul(payload);
    //aqui enviará a la sala del partidoId, al evento del emit, los valores del payload.
    //Esto se verá allá donde haya un socket.on('foulUpdate') en mi rama --> userScreen
    this.server.to(payload.partidoId).emit('foulUpdate', {...payload, player: `${player.nombre} ${player.apellido}`});
  }

  /*   @SubscribeMessage('scoreUpdate')
  emitScoreUpdate(@MessageBody() payload) {
    console.log(payload);
    this.scoreService.createScore(payload);
    this.server.to(payload.partidoId).emit('scoreUpdate', payload);
  } */

  @SubscribeMessage('scoreUpdateTeams')
  async handleScoreUpdate(@MessageBody() payload): Promise<any> {
    console.log(payload);
    try {
      const match = await this.matchRepository.findOne({
        where: { partidoid: payload.partidoid },
        relations: ['localid', 'visitanteid'],
      });
      console.log(match);
      const player = await this.playerRepository.findOne({
        where: { jugadorid: payload.jugadorid },
      });
      console.log(player);
      if (!match || !player) {
        console.log('Match/ Player not found');
      }

      let equipoToUpdate: any;
      console.log(match.localid.equipoid);
      console.log(match.visitanteid.equipoid);
      if (player.equipoid === match.localid.equipoid) {
        equipoToUpdate = match.localid.equipoid;
        console.log(equipoToUpdate);
      } else if (player.equipoid === match.visitanteid.equipoid) {
        equipoToUpdate = match.visitanteid.equipoid; //'visitanteid'
        console.log(equipoToUpdate);
      } else {
        console.log('Player on neither team');
      }

      const puntos = payload.puntos;

      // Update the score --> equipoToUpdate (local/ visitante)
      if (equipoToUpdate === match.localid.equipoid) {
        match.puntuacion_equipo_local += puntos;
      } else if (equipoToUpdate === match.visitanteid.equipoid) {
        match.puntuacion_equipo_visitante += puntos;
      }
      console.log(equipoToUpdate);

      /*       await this.matchRepository.save(match);
      await this.playerRepository.save(player); */

      this.server
        .to(payload.partidoid)
        .emit('scoreUpdateTeams', { equipoToUpdate, puntos, player: `${player.nombre} ${player.apellido}` });
      console.log('all g');

      this.scoreService.createScore(payload);
      // Data --> client espero que sí
      return { success: true, message: 'Updated successfully' };
    } catch (error) {
      console.error('Error updating scores:', error);
    }
  }

  @SubscribeMessage('substitutionUpdate')
  emitSubstitutionUpdate(@MessageBody() payload) {
    console.log(payload);
    
    this.server.to(payload.partidoid).emit('substitutionUpdate', payload);
  }

  @SubscribeMessage("startingPlayers")
  emitStartingPlayers(@MessageBody() payload){

    this.server.to(payload.matchID).emit('startingPlayers', payload)
  }

  @SubscribeMessage('timerUpdate')
  emitTimerUpdate(@MessageBody() payload) {
    this.server.to(payload.partidoId).emit('timerUpdate', payload);
  }
}
