import express, { type Request, type Response } from "express";
import { conectar } from "./config/database";
import cors from "cors";
import "dotenv/config";

const app = express();

const PORT: number = Number(process.env.PORT) || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    mensagem: "API do Controle Financeiro funcionando",
  });
});

async function iniciarServidor(): Promise<void> {
    try{
        await conectar()

        app.listen(PORT,() => {
            console.log(`Servidor rodando na porta ${PORT}`)
        })
    }
        catch(erro){
            console.error("Não foi possível iniciar o servidor")
            process.exit(1)
    }
}

iniciarServidor()