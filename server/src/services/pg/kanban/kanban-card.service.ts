import { Service, Inject } from 'typedi';
import PgService from '../pg.service';

import { QueryMutator } from '../../../schema/types/common/query-mutator.type';
import { KanbanCard, KanbanCardInputBody } from '../../../schema/types/kanban/kanban-card.type';

@Service()
export default class KanbanCardService extends PgService {

  constructor(container) {
    super();
  }

  getAll(): Promise<KanbanCard[]> {
    return new Promise((resolve, reject) => {
      this.knex.select({
        'id': 'kanban_cards.id',
        'label': 'kanban_cards.label',
        'description': 'kanban_cards.description'
      }).from('kanban_cards')
        .then(resolve);
    });
  }

  getOne(id): Promise<KanbanCard> {
    return new Promise((resolve, reject) => {

      const queryMutator: QueryMutator = {
          filters: [
            [{
              column: 'kanban_cards.id',
              op: '=',
              value: id
            }]
          ]
      };

      const query = this.knex('kanban_cards')
        .select({
          'id': 'kanban_cards.id',
          'label': 'kanban_cards.label',
          'description': 'kanban_cards.description'
        });

      this.mutateQuery(query, queryMutator).then(queryResponse => {
        const kanbanCardResponse: KanbanCard = queryResponse[0];
        resolve(kanbanCardResponse);
      });

    });
  }

  create(newKanbanCard: KanbanCardInputBody): Promise<KanbanCard> {
    return new Promise((resolve, reject) => {
      let kanbanCard: KanbanCard;

      this.knex.insert({
        label: newKanbanCard.label,
        description: newKanbanCard.description,
        board_id: newKanbanCard.parentBoardId
      }).into('kanban_cards').returning('*').then(res => {

        kanbanCard = res[0];
        resolve(this.getOne(kanbanCard.id));

      }).catch(this.error.log);

    });
  }

}
