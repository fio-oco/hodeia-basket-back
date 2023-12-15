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
    const newSubstitution = this.substitutionRepository.create({
      jugador_entra: createSubstitutionDTO.jugador_entra, 
      jugador_sale: createSubstitutionDTO.jugador_sale, 
      partidoid: createSubstitutionDTO.partidoid,
      marcatiempocambio: new Date(),
    });
  
    try {
      return await this.substitutionRepository.save(newSubstitution);
    } catch (error) {
      throw error;
    }
  } */

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
}
