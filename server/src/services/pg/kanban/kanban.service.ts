import { Service, Inject } from 'typedi';
import PgService from '../pg.service';

import { Kanban } from '../../../schema/types/kanban/kanban.type';
import { QueryMutator } from '../../../schema/types/common/query-mutator.type';

@Service()
export default class KanbanService extends PgService {

  constructor(container) {
    super();
  }

  getAll(queryMutator: QueryMutator): Promise<Kanban[]> {

    const query = this.knex('kanbans')
      .select({
        'id': 'kanbans.id',
        'label': 'kanbans.label',
        'boards': 'kanbans_view.boards'
      })
      .innerJoin('kanbans_view', 'kanbans_view.id', 'kanbans.id')
      .innerJoin('kanbans_authorized_users_view', 'kanbans_authorized_users_view.id', 'kanbans.id');

    return this.mutateQuery(query, queryMutator);

  }

}
