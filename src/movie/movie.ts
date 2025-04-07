export class Movie {
  constructor(
    public name: string,
    public date: string,
    public budget: number,
    public made: number,
    public rating: number = 8,
  ) {}
}
