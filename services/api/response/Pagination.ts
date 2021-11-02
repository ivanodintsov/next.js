export class PaginationResponseDTO<T> {
  count: number;
  next: string;
  previous: string;
  results: T[];
}
