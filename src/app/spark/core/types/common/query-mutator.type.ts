export interface QueryMutator {
  filter?: FilterGroup | Filter;
  order?: any[];
  pagination?: any[];
  options?: QueryOptions;
}

interface Filter {
  property: string;
  op: string;
  value: any;
}

interface FilterGroup {
  op: string;
  filters: Filter[];
}

interface QueryOptions {
  singleton: boolean;
}
