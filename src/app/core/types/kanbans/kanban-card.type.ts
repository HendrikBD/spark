export interface KanbanCard {
  id: number;
  label: string;
  description?: string;
}

export interface KanbanCardQuery {
  items: KanbanCard[];
  hasMore: boolean;
  total: number;
}
