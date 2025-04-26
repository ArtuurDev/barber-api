import { Email } from "src/domain/value-objects/email";
import { UniqueEntityId } from "../../../core/entitys/unique-entity-id";
import { Customer, customerProps } from "../../barber-shop/customer/enterprise/entities/customer";
import { Cpf } from "../../value-objects/cpf";
import { Name } from "../../value-objects/name";
import { NumberPhone } from "../../value-objects/number_phone";
import { DateVo } from "src/domain/value-objects/date";

export function makeCustomer(override: Partial<customerProps> = {}, id?: UniqueEntityId) {

    return Customer.create({
        full_name: new Name('Luiz Artur'),
        cpf: new Cpf('62240847344'),
        email: new Email('arturcastrodossantos.com@gmail.com'),
        birthDateAt: new DateVo('2006-02-24'),
        numberPhone: new NumberPhone('88996036330'),
        ...override
    }, id ?? new UniqueEntityId())

}