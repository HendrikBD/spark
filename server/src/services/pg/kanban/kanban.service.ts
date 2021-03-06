import { Service, Inject } from 'typedi';
import PgService from '../pg.service';

import { Kanban, KanbanInputBody } from '../../../schema/types/common/kanban/kanban.type';
import { QueryMutator } from '../../../schema/types/common/query-mutator.type';

@Service()
export default class KanbanService extends PgService {

  constructor(container) {
    super('kanbans');
  }

  getAll(queryMutator: QueryMutator): Promise<Kanban[]> {

    const query = this.knex('kanbans')
      .select({
        'id': 'kanbans.id',
        'name': 'kanbans.name',
        'boards': 'kanbans_view.boards'
      })
      .innerJoin('kanbans_view', 'kanbans_view.id', 'kanbans.id')
      .innerJoin('kanbans_authorized_users_view', 'kanbans_authorized_users_view.id', 'kanbans.id')
      .innerJoin('kanbans_root_view', 'kanbans_root_view.kanban_id', 'kanbans.id');

    return this.mutateQuery(query, queryMutator);

  }

  getOne(id, userId): Promise<Kanban> {
    return new Promise((resolve, reject) => {

      const queryMutator: QueryMutator = {
          filters: [
            [{
              column: 'kanbans.id',
              op: '=',
              value: id
            }]
          ]
      };

      const query = this.knex('kanbans')
        .select({
          'id': 'kanbans.id',
          'name': 'kanbans.name',
          'boards': 'kanbans_view.boards',
          'authorizedUsers': 'kanbans_authorized_users_view.authorized_users'
        })
        .innerJoin('kanbans_view', 'kanbans_view.id', 'kanbans.id')
        .innerJoin('kanbans_authorized_users_view', 'kanbans_authorized_users_view.id', 'kanbans.id')
        .innerJoin('kanbans_root_view', 'kanbans_root_view.kanban_id', 'kanbans.id');

      this.mutateQuery(query, queryMutator).then(queryResponse => {
        const kanbanResponse: Kanban  = queryResponse[0];
        if (kanbanResponse.authorizedUsers.find(ele => ele === userId)) resolve(kanbanResponse);
        else {
          this.error.log(`Unauthorized user! User: ${userId} trying to access kanban: ${id}`);
          resolve();
        }
      });
    });
  }

  create(newKanban: KanbanInputBody) {
    return new Promise((resolve, reject) => {
      let kanban: Kanban;

      this.knex.insert({name: newKanban.name}).into('kanbans').returning('*').then(res => {
        kanban = res[0];

        return Promise.all([

          ...(
            newKanban.parentCardId ? [
              this.knex.insert({parent_id: newKanban.parentCardId, child_id: kanban.id}).into('kanbans_cards_child_kanbans')
            ] : []
          ),

          ...(
            newKanban.users.map(user => {
              return this.knex.insert({
                kanban_id: kanban.id,
                user_id: user.id
              }).into('kanbans_users_link');
            })
          )

        ]);

      }).then(() => {

        resolve(this.getOne(kanban.id, newKanban.users[0].id));

      }).catch(this.error.log);

    });
  }

}
