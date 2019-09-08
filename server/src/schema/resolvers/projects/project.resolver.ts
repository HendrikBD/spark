import { ObjectType, Query, Mutation, Arg, Int, Resolver, Ctx } from 'type-graphql';

import PaginatedResponse from '../../types/common/paginated-response.type';

import { QueryMutator } from '../../types/common/query-mutator.type';
import { Context } from '../../types/common/context.type';
import { Project, ProjectInputBody } from '../../types/projects/project.type';
import ProjectService from '../../../services/pg/project/project.service';

@ObjectType()
class ProjectResponse extends PaginatedResponse(Project) {}

@Resolver(of => Project)
export default class ProjectResolver {

  constructor(
    private readonly projectService: ProjectService
  ) {}

  @Query(returns => ProjectResponse, { name: 'projects' })
  async getProjects(
    @Arg('first', type => Int, { nullable: true, defaultValue: 10 }) first: number
  ): Promise<ProjectResponse> {
    console.log('get projects');

    const projects = await this.projectService.getAll();
    console.log('projects');
    console.log(projects);
    const total = projects.length;

    return {
      data: projects,
      hasMore: total > first,
      total
    };
  }

  @Mutation(returns => Project, { name: 'addProject' })
  async addProject(
    @Arg('projectInputBody') newProject: ProjectInputBody,
    @Ctx() ctx: Context
  ): Promise<Project> {
    const project = await this.projectService.create(newProject);

    return project;
  }
}
