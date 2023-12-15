import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { Substitution } from './substitution.entity';
import { SubstitutionService } from './substitution.service';
import { CreateSubstitutionDTO } from './create-substitution.dto';

@Controller('substitutions')
export class SubstitutionController {
  constructor(private readonly substitutionService: SubstitutionService) {}

  @Get('byMatch/:partidoid')
  async find(
    @Param('partidoid') partido_id: string,
  ): Promise<Substitution[] | null> {
    return await this.substitutionService.findSubstitutionsByMatch(partido_id);
  }

/*   @Post('new')
  async createSubstitution(
    @Body(new ValidationPipe()) createSubstitutionDTO: CreateSubstitutionDTO,
  ) {
    try {
      const createdSubstitution =
        await this.substitutionService.createSubstitution(
          createSubstitutionDTO,
        );
      return createdSubstitution;
    } catch (error) {
      throw error;
    }
  } */
}
