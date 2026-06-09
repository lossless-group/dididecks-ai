export interface ApiTodo {
  implemented: false;
  owner: 'dididecks-backend';
  note: string;
}

export interface ApiEnvelope<T> {
  data: T;
  meta?: Record<string, unknown>;
  todo?: ApiTodo | null;
}
