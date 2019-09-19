import { AnyEntity } from '../../../../common/entities/core/types/entity.type';

export interface Project {
  id: number;
  name: string;
  rootEntity: AnyEntity;
}
