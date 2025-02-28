import * as yup from "yup";

export const productCreateSchema = yup.object({
  title: yup
    .string()
    .required("O nome do produto é obrigatório")
    .max(30, "O nome não pode exceder 30 caracteres"),
  price: yup
    .number()
    .typeError("Preço deve ser um número")
    .positive("Preço deve ser positivo")
    .required("O preço é obrigatório"),
  description: yup
    .string()
    .required("A descrição é obrigatória")
    .max(300, "Descrição não pode exceder 300 caracteres"),
  category: yup.string().required("A categoria é obrigatória"),
  image: yup.string().required("A URL da imagem é obrigatória"),
});

export type ProductCreateSchemaType = yup.InferType<typeof productCreateSchema>;
