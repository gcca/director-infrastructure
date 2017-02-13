import { Director }
  from '../../../domain/model/director/director';
import { Blockbuster }
  from '../../../domain/model/director/blockbuster';
import { DirectorRepository }
  from '../../../domain/model/director/director.repository';

import { directorDTOs } from '../../sampledata/directors';


export class DirectorRepositoryMemory implements DirectorRepository {

  findAll(): Promise<Director[]> {
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
    return Promise.resolve();
  }

}
