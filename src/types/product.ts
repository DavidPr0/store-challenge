/**
 * Interface que representa um produto.
 *
 * @property {number} id - Identificador único do produto.
 * @property {string} title - Título do produto.
 * @property {number} price - Preço do produto.
 * @property {string} description - Descrição detalhada do produto.
 * @property {string} category - Categoria à qual o produto pertence.
 * @property {string} image - URL da imagem do produto.
 * @property {{ rate: number; count: number }} rating - Objeto com informações da avaliação, contendo a média (`rate`) e a quantidade de avaliações (`count`).
 */

export interface Product {
  id?: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}
