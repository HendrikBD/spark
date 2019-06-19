export interface User {
  id: number;
  name: {
    first: string;
    middle?: string[];
    last: string;
  };
  email?: string;
}
