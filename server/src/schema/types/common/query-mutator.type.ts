export class QueryMutator {
  filters: (QueryMutatorFilter | QueryMutatorRawFilter)[][];
}

export class QueryMutatorFilter {
  column: string;
  op: string;
  value: string | number | boolean;
}

export class QueryMutatorRawFilter {
  raw: string;
}
