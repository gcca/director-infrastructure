import { Director }
  from '../../../domain/model/director/director';
import { Blockbuster }
  from '../../../domain/model/director/blockbuster';
import { DirectorRepository }
  from '../../../domain/model/director/director.repository';

import { LocalStorageRepository } from './localstorage.repository';


// TODO: make a StorageKey type
let directorsKey = 'localStorageRepository_directors';


interface DirectorDTO {
  name: string;
  sex: string;
  nationality: string;
  city: string;
  dob: number;
  age: number | string;
  blockbuster: string;
}


export class DirectorRepositoryLocalStorage extends LocalStorageRepository
                                            implements DirectorRepository {

  findAll(): Promise<Director[]> {
    let directorDTOs = this.getItem<DirectorDTO[]>(directorsKey);
    return Promise.resolve(
      directorDTOs
        .map(dto => new Director(dto.name,
                                 dto.sex,
                                 dto.nationality,
                                 dto.city,
                                 dto.dob,
                                 dto.age,
                                 [new Blockbuster(dto.blockbuster, 1999)]))
    );
  }

  find(fullName: string): Promise<Director> {
    let directorDTOs = this.getItem<DirectorDTO[]>(directorsKey);
    let dto = directorDTOs.find(d => d.name == fullName);
    return Promise
      .resolve(new Director(dto.name,
                            dto.sex,
                            dto.nationality,
                            dto.city,
                            dto.dob,
                            dto.age,
                            [new Blockbuster(dto.blockbuster, 1999)]));
  }

  store(director: Director): Promise<void> {
    return new Promise((resolve, reject) => {
      let directorDTOs = this.getItem<DirectorDTO[]>(directorsKey);
      let index = directorDTOs.findIndex(d => d.name == director.fullName);
      if (index >= 0) {
        directorDTOs[index] = this.toDTO(director);
        this.setItem(directorsKey, directorDTOs);
        resolve();
      } else {
        reject();
      }
    });
  }

  private toDTO(director: Director): any {
    return {
      name: director.fullName,
      sex: director.sex,
      nationality: director.nationality,
      city: director.city,
      dob: director.dob,
      age: director.age,
      blockbuster: director.blockbusters[0]
    };
  }

}
