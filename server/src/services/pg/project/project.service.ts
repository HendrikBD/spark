import { Service, Inject } from 'typedi';
import PgService from '../pg.service';

import { Project, ProjectInputBody } from '../../../schema/types/projects/project.type';
import { QueryMutator } from '../../../schema/types/common/query-mutator.type';

@Service()
export default class ProjectService extends PgService {

  constructor(container) {
    super();
  }

  getAll(queryMutator: QueryMutator = {}): Promise<Project[]> {
    console.log('getting all projects');

    const query = this.knex('projects')
      .select({
        'id': 'projects.id',
        'name': 'projects.name'
      })
      .innerJoin('projects_authorized_users', 'projects_authorized_users.project_id', 'projects.id');

    return this.mutateQuery(query, queryMutator);

  }

  getOne(id): Promise<Project> {
    return new Promise((resolve, reject) => {

      const queryMutator: QueryMutator = {
          filters: [
            [{ column: 'projects.id', op: '=', value: id }]
          ]
      };

      const query = this.knex('projects')
        .select({
          'id': 'projects.id',
          'name': 'projects.name',
          'authorizedUsers': 'kanbans_authorized_users_view.authorized_users'
        })
        .innerJoin('projects_authorized_users', 'projects_authorized_users.project_id', 'projects.id');

      this.mutateQuery(query, queryMutator).then(queryResponse => {
        const kanbanResponse: Project  = queryResponse[0];
        resolve(kanbanResponse);

        // if (kanbanResponse.authorizedUsers.find(ele => ele === userId)) resolve(kanbanResponse);
        // else {
        //   this.error.log(`Unauthorized user! User: ${userId} trying to access kanban: ${id}`);
        //   resolve();
        // }
      });
    });
  }

  create(newProject: ProjectInputBody): Promise<Project> {
    return new Promise((resolve, reject) => {
      let project: Project;

      this.knex.insert({label: newProject.name}).into('projects').returning('*').then(res => {
        project = res[0];


        resolve(this.getOne(project.id));

      }).catch(this.error.log);

    });
  }

}
