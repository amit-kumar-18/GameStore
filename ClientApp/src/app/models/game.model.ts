export interface GameCreate {
  name: string;
  genreId: number;
  price: number;
  releaseDate: string;
  description?: string;
  publisher?: string;
  image?: File;
}
export interface GameUpdate {
  name: string;
  genreId: number;
  price: number;
  releaseDate: string;
  description?: string;
  publisher?: string;
  image?: File;
}
export interface GameDetails {
  id: number;
  name: string;
  genre: string;
  price: number;
  releaseDate: string;
  imageUrl: string;
  description: string;
  publisher: string;
  createdAt: string;
  updatedAt?: string;
}
export interface GameDetail {
  id: number;
  name: string;
  genreId: number;
  price: number;
  releaseDate: string;
  imageUrl: string;
  description: string;
  publisher: string;
  createdAt: string;
  updatedAt?: string;
}
export interface GenreDetails {
  id: number;
  name: string;
}
