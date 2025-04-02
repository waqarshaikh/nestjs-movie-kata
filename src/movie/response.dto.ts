export class ResponseDto {
  title: string;
  releaseDate: string;
  oldness: string;

  constructor(title: string, releaseDate: string, oldness: string) {
    this.title = title;
    this.releaseDate = releaseDate;
    this.oldness = oldness;
  }
}
