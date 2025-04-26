import { UniqueEntityId } from "src/core/entitys/unique-entity-id";
import { Barber } from "src/domain/barber-shop/barber/enterprise/entities/barber";
import { Cpf } from "src/domain/value-objects/cpf";
import { Email } from "src/domain/value-objects/email";
import { Name } from "src/domain/value-objects/name";
import { NumberPhone } from "src/domain/value-objects/number_phone";
import { randomUUID } from "crypto";

export function makeBarber(override: Partial<Barber> = {}, id?: UniqueEntityId) {
    return Barber.create({
        cpf: new Cpf('62240847344'),
        email: new Email('arturcastrodossantos.com@gmail.com'),
        name: new Name("Luiz Artur Castro dos Santos"),
        numberPhone: new NumberPhone('88996036330'),
        servicesList: [new UniqueEntityId(randomUUID())],
        ...override
    }, id)
}