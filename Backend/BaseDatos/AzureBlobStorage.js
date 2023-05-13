const { BlobServiceClient } = require('@azure/storage-blob');

class AzureBlobStorage {
    constructor() {
        if (AzureBlobStorage.instance) {
            return AzureBlobStorage.instance;
        }
        AzureBlobStorage.instance = this;

        this.blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING);
    }
}

const instance = new AzureBlobStorage();
Object.freeze(instance);

const subirArchivoABlobStorage = async (containerName, file) => {

    try {
        //Accedemos al contenedor
        const container = instance.blobServiceClient.getContainerClient(containerName);

        // Sube el archivo a Azure Blob Storage y obtenmos la URL.
        const blobName = Date.now() + file.originalname;
        const blockBlob = container.getBlockBlobClient(blobName);
        const uploadBlobResponse = await blockBlob.uploadFile(file.path,{
            blobHTTPHeaders:{contentType:file.mimetype}
        });
        const archivoUrl = blockBlob.url;

        return archivoUrl;
    } catch (error) {
        console.error(error);
    }

}

module.exports = { subirArchivoABlobStorage };
