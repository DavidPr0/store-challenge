# Loja Fake - CRUD de Produtos

Este projeto demonstra um CRUD de produtos utilizando a [Fake Store API](https://fakestoreapi.com).  
Foi desenvolvido em **Next.js (v13+)** com **TypeScript**, **Tailwind CSS**, **Axios**, **React Hook Form**, **Yup** (validação) e **Jest** (testes) — seguindo princípios **SOLID**.  
O usuário pode **listar**, **filtrar**, **ordenar**, **criar**, **editar** (sem alterar categoria) e **excluir** produtos (com confirmação).

---

## Dando Início

Primeiros passos para rodar o projeto:

```bash
npm install
# or
yarn install
```

Para rodar o projeto:

```bash
npm run dev
# or
yarn dev
```

Abra http://localhost:3000 com seu navegador para ver o resultado.

Você pode começar a editar as páginas modificando arquivos em aplicativos/produtos. A página é atualizada automaticamente conforme você edita o arquivo.

Este projeto usa next/font para otimizar e carregar automaticamente fontes personalizadas em seu aplicativo Next.js. Ele também integra Tailwind CSS para estilização.

## Principais recursos

```bash
	•	Listagem de Produtos:
	•	Paginação e destaque para rate > 4.5.
	•	Filtro por categorias (obtidas via Fake Store API).
	•	Ordenação asc/desc por preço.
	•	Título truncado em 30 caracteres.
	•	Visualização Individual:
	•	Página /products/[id] exibe detalhes do produto selecionado.
	•	Criação de Produto:
	•	Formulário em /products/create, validado por Yup e gerenciado com React Hook Form.
	•	Edição de Produto:
	•	Em /products/[id]/edit, não é possível alterar a categoria.
	•	Demais campos (title, price, description, image) são validados.
	•	Exclusão:
	•	Só ocorre após confirmação (ex.: window.confirm ou modal).
	•	Testes Unitários:
	•	Jest + React Testing Library com cobertura mínima de 30%.
```

## Estrutura do Projeto

```bash
src/
├─ app/
│   ├─ products/
│   │   ├─ page.tsx
│   │   ├─ create/page.tsx
│   │   ├─ [id]/page.tsx
│   │   └─ [id]/edit/page.tsx
│   ├─ layout.tsx
│   └─ ...
├─ components/
│   ├─ ProductCard.tsx
│   ├─ CreateProductForm.tsx
│   └─ EditProductForm.tsx
├─ hooks/
│   ├─ useProducts.ts
│   └─ useProductDetail.ts
├─ services/
│   └─ productService.ts
├─ validations/
│   └─ productValidation.ts
tests/
│ ├─ components/
│ │   └─ ProductCard.test.tsx
│ └─ services/
│       └─ productService.test.ts
├─ utils/
│   └─ cn.ts
└─ ...

```

## Tecnologias utilizadas

    •	TypeScript
    •	Tailwind CSS
    •	Axios
    •	React Hook Form + Yup (formulários e validação)
    •	Jest + React Testing Library (testes unitários)
    •	SOLID design principles

## Rodar Storybook

```bash
npm run storybook
```

## Rodar Testes

```bash
npm run test
```

## Rodar Testes com Coverage

```bash
npm run test:coverage
```
