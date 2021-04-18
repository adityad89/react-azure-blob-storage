import  Axios  from 'axios-observable';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BlobStorageRequest } from '../types/azure-storage';

export class SasGeneratorService {
  getSasToken(): Observable<BlobStorageRequest> {
    return Axios.get<BlobStorageRequest>(
      process.env.AZURE_SAS_GENERATOR_URI ? process.env.AZURE_SAS_GENERATOR_URI : ""
    ).pipe(map(res => res.data));
  }
}