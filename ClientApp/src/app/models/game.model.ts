export interface GameCreate {
  name: string;
  genreId: number;
  price: number;
  releaseDate: string;
}
export interface GameUpdate {
  name: string;
  genreId: number;
  price: number;
  releaseDate: string;
}
export interface GameDetails {
  id: number;
  name: string;
  genre: string;
  price: number;
  releaseDate: string;
}
export interface GenreDetails {
  id: number;
  name: string;
}
