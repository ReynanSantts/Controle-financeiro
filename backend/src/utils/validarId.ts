
export function validarId(id: unknown): number | null {
    try {
        if (typeof id !== "string" && typeof id !== "number") {
            return null;
        }

        const idConvertido = Number(id);

        if (
            !Number.isSafeInteger(idConvertido) ||
            idConvertido <= 0 ||
            String(id).trim() === ""
        ) {
            return null;
        }

        return idConvertido;
    } catch (erro) {
        console.error("Erro ao validar ID:", erro);
        return null;
    }
}
