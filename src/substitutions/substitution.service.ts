import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository } from 'typeorm';
import { Substitution } from './substitution.entity';
import { CreateSubstitutionDTO } from './create-substitution.dto';
import { Player } from 'src/players/player.entity';

@Injectable()
export class SubstitutionService {
  constructor(
    @InjectRepository(Substitution)
    private readonly substitutionRepository: Repository<Substitution>,
    @InjectRepository(Player)
    private readonly playerRepository: Repository<Player>,
  ) {}

  async findSubstitutionsByMatch(
    partido_id: string,
  ): Promise<Substitution[] | null> {
    return await this.substitutionRepository.find({ where: { partido_id: Equal(partido_id)  } });
  }

/*   async createSubstitution(createSubstitutionDTO: CreateSubstitutionDTO): Promise<Substitution> {
    const { jugador_entra, jugador_sale, partidoid, marcatiempocambio } = createSubstitutionDTO;
  
    // Parse the received date string into a Date object
    const parsedDate = new Date(marcatiempocambio);
  
    const newSubstitution = this.substitutionRepository.create({
      jugador_entra: { jugadorid: jugador_entra},
      jugador_sale,
      partido_id,
      marcatiempocambio: parsedDate, // Assign the parsed date here
    });
  
    try {
      return await this.substitutionRepository.save(newSubstitution);
    } catch (error) {
      throw error;
    }
  } */
  
//second attempt, getting an error for the timestamp being in the incorrect format
/*   async createSubstitution(createSubstitutionDTO: CreateSubstitutionDTO): Promise<Substitution>{
    const newSubstitution = this.substitutionRepository.create({
      ...createSubstitutionDTO,
      marcatiempocambio: Date(),
    });
    try {
      return await this.substitutionRepository.save(newSubstitution);
    } catch (error) {
      throw error;
  }
} */

  async createSubstitution(createSubstitutionDTO: CreateSubstitutionDTO): Promise<Substitution>{
    const newSubstitution = this.substitutionRepository.create({
      ...createSubstitutionDTO,
      marcatiempocambio: new Date(),
    });
    try{
      return await this.substitutionRepository.save(newSubstitution);
    } catch (error){
      throw error;
    }
  }

}
  /*async createSubstitution(createSubstitutionDTO: CreateSubstitutionDTO): Promise<Substitution> {
    const newSubstitution = this.substitutionRepository.create({
      jugador_entra: createSubstitutionDTO.jugador_entra, 
      jugador_sale: createSubstitutionDTO.jugador_sale, 
      partido_id: createSubstitutionDTO.partido_id,
      marcatiempocambio: new Date(),
    });
  
    try {
      return await this.substitutionRepository.save(newSubstitution);
    } catch (error) {
      throw error;
    }
  }

  // getting lots of errors here, don't understand why. need to come back to it tomrorrow. 

/*   async createSubstitution(
    createSubstitutionDTO: CreateSubstitutionDTO,
  ): Promise<Substitution> {
    const { jugador_entra, jugador_sale } = createSubstitutionDTO;

    const [jugadorEntra, jugadorSale] = await Promise.all([
      this.playerRepository
        .createQueryBuilder('jugador')
        .leftJoin('jugador.equipoid', 'equipoid')
        .where('jugador.jugadorid = :jugadorid', { jugadorid: jugador_entra })
        .getOne(),

      this.playerRepository
        .createQueryBuilder('jugador')
        .leftJoin('jugador.equipoid', 'equipoid')
        .where('jugador.jugadorid = :jugadorid', { jugadorid: jugador_sale })
        .getOne(),
    ]);

    if (jugadorEntra?.equipoid?.equipoid !== jugadorSale?.equipoid?.equipoid) {
      throw new Error('Both players should belong to the same team.');
    }

const newSubstitution = this.substitutionRepository.create({
  jugador_entra: jugadorEntra as Player, 
  jugador_sale: jugadorSale as Player, 
  partidoid: createSubstitutionDTO.partidoid,
  marcatiempocambio: new Date(),
});

    try {
      return await this.substitutionRepository.save(newSubstitution);
    } catch (error) {
      throw error;
    }
  } */

