import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { Uploader, UploadParams } from "../../domain/clients/application/storage/uploader.repository"
import { ConfigService } from "@nestjs/config";
import { Env } from "../env";
import { randomUUID } from "crypto";
import { Injectable } from "@nestjs/common";


@Injectable()
export class StorageR2 implements Uploader {
    
    private client: S3Client
    
    constructor(private envConfig: ConfigService<Env>) {

        this.envConfig = envConfig
        
        this.client = new S3Client({
            endpoint: `https://${envConfig.get('CLOUD_FLARE_ID')}.r2.cloudflarestorage.com/barber-api`,
            region: 'auto', 
            credentials: {
                accessKeyId: envConfig.get('ACCESS_KEY_CLOUD_FLARE'),
                secretAccessKey: envConfig.get('SECRET_KEY_CLOUF_FLARE')
            }
        })

    }

    async upload({ body, fileName, fileType }: UploadParams): Promise<{ url: string; }> {
        const uniqueId = randomUUID()
        const uniqueFileName = `${uniqueId}-${fileName}`

        const attachment = await this.client.send(new PutObjectCommand({
            Bucket: this.envConfig.get('BUCKET_NAME'),
            Key: uniqueFileName,
            ContentType: fileType,
            Body: body,

        }))

        return {
            url: uniqueFileName
        }

    }
    
}