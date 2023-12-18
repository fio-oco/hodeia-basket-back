import { Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local'){}

//to make the process more efficient, reduce number of petiticiones to auth service 