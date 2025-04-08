export abstract class CryptograpyRepository  {

    abstract hash(value: string): Promise<string>
    abstract compare(value: string, valueHash: string): Promise<boolean>

}