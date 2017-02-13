// TODO: StorageKey
export abstract class LocalStorageRepository {

  protected getItem<T>(key: string): T {
    return <T>JSON.parse(window.localStorage.getItem(key));
  }

  // TODO: setItem<T extends serializable>(key: string, obj: T): void
  //   Define a serializable kind.
  protected setItem(key: string, obj: any): void {
    window.localStorage.setItem(key, JSON.stringify(obj));
  }

}


// this part is only for demo purpose
import { directorDTOs } from '../../sampledata/directors';
let directorsKey = 'localStorageRepository_directors';
if (!localStorage.getItem(directorsKey))
  localStorage.setItem(directorsKey, JSON.stringify(directorDTOs));
