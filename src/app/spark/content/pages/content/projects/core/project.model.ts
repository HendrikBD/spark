import { EntitySimple } from '../../../../common/entities/core/entity.model';

export interface Project {
  id: number;
  name: string;
  rootEntity: EntitySimple;
}
