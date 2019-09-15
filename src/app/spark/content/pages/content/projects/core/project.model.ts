import { AnyEntity } from '../../../../common/entities/core/entity.model';

export interface Project {
  id: number;
  name: string;
  rootEntity: AnyEntity;
}
