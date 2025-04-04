import { PasswordHashRepository } from "services/barber-shop-service-api/src/domain/application/repositories/password-hash-repository";
import {hash, compare} from 'bcrypt'
import { Injectable } from "@nestjs/common";

@Injectable()
export class PasswordHash implements PasswordHashRepository {
    async hash(value: string): Promise<string> {
        const hashed = await hash(value, 8)
        return hashed
    }
    async compare(value: string, valueHash: string): Promise<boolean> {
        return compare(value, valueHash)
    }

}