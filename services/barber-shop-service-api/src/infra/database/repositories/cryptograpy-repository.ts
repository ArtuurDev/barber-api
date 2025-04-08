import {hash, compare} from 'bcrypt'
import { Injectable } from "@nestjs/common";
import { CryptograpyRepository } from 'services/barber-shop-service-api/src/domain/clients/application/cryptograpy/cryptograpy-repository';

@Injectable()
export class PasswordHash implements CryptograpyRepository {
    async hash(value: string): Promise<string> {
        const hashed = await hash(value, 8)
        return hashed
    }
    async compare(value: string, valueHash: string): Promise<boolean> {
        return compare(value, valueHash)
    }

}