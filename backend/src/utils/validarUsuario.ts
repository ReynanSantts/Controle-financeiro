import {z} from "zod"

export const validarCadastro = z.object({
nome: z
.string()
.trim()
.min(3, "O nome deve ter pélo menos 3 caracteres")
.max(100, "O nome deve ter no máximo 100 caracteres"),

email: z
.email("Informe um e-mail válido")
.trim()
.toLowerCase()
.max(150,"O e-mail deve ter no máximo 150 caracteres"),

senha: z
.string()
.min(8, "A senha deve ter pelo menos 8 caracteres")
.max(72, "A senha deve ter no máximo 72 caracteres"),

confirmarSenha: z
.string()
})
.refine(
    (dados) => dados.senha === dados.confirmarSenha,
    {
        message: "As senhas não coincidem",
        path: ["confirmarSenha"]
    }
)

export const validarLogin = z.object ({

    email: z
    .email("Informe um e-mail válido")
    .trim()
    .toLowerCase(),

    senha: z
    .string()
    .min(1,"Informe sua senha")
})

export type DadosCadastro = z.infer<typeof validarCadastro>
export type DadosLogin = z.infer<typeof validarLogin>