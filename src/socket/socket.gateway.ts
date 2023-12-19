import { InjectRepository } from '@nestjs/typeorm';
import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { createServer } from "http";
import { Match } from 'src/matches/match.entity';
import { MatchService } from 'src/matches/match.service';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { FoulService } from 'src/fouls/foul.service';

@WebSocketGateway(3001, { cors: 'http://localhost:5173' })
export class SocketGateway {
  @WebSocketServer()
   private  server: Server;
   private  matchRooms: Record<string, string[]> = {}; //to store the ids of match rooms

  constructor(
    //@InjectRepository(Match) private readonly matchRepository: Repository<Match>){}
    //private readonly matchService: MatchService, 
    //private readonly foulService: FoulService){
    /* private readonly matchService: MatchService) */){
      const httpServer = createServer();
      const io = new Server(httpServer, {
        cors: {
          origin: "http://localhost:5173",
          methods: ['GET', 'POST', 'PATCH'],
          allowedHeaders: ['Content-Type', 'Authorization'],
          // credentials: true,
        }
      });

      // io.on('connection', (socket: Socket) => {
      //   console.log('User connected:', socket.id);

      //   socket.on('foulUpdate', (data: any) => {

      //     io.emit('foulUpate', {
      //       partidoid: data.partidoid,
      //       foulData:data,
      //     })
      //   });
        
      //   socket.on('gameUpdate', (data: any) => {
      //     console.log(data);
      //     socket.emit('gameUpdate', data)
          
      //   })


      // });
      // httpServer.listen(3001, () => {
      //   console.log('Socket.IO server running on port 3001')

      // })
    }

  handleConnection(socket: Socket){
    socket.on('joinMatchRoom', (partidoid: string) => {
      console.log('cuando me llaman desde el front');
      
      socket.join(partidoid);
      console.log(`Client connected: ${socket.id} in match room ${partidoid}` );
    });
    
  }
  // handleRefereeData(client: Socket, partidoid: string, data: any){
  //   this.server.emit('gameUpdate', data);
  // }

  handleGameUpdate(socket: Socket) {
    console.log(socket);
    socket.on('gameUpdate', (data: any) => {
      console.log(data);
      
      socket.emit('gameUpdate', {data});
    })
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

        /* const io = require('socket.io')(this.server, {
        cors: {
          origin: 'http://localhost:5173',
          methods: ['GET', 'POST', 'PATCH'],
          allowedHeaders: ['Content-Type', 'Authorization'],
          credentials: true,
        },
      }); */


      //I don't know where this is supposed to be. 
/*       handleFoulUpdate(partidoid: string, data: any){
        this.foulService.createFoul(foulData)
        .then((createdFoul) => {
          io.to(partidoid).emit('foulCreated', {
            partidoid: data.partidoid,
            foulData: createdFoul,
          });
        })
        .catch((error) => {
          console.error('Error creating foul:', error);
          io.to(partidoid).emit('foulCreationError', { message: 'Failed to create foul' });
        });
      } */
