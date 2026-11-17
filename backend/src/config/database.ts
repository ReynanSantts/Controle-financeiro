import mysql from "mysql2/promise"
import "dotenv/config"

export const pool = mysql.createPool({

    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT) || 3306,
    waitForConnections: true,
    connectionLimit: 10
})

export async function conectar(): Promise<void> {
    try{
        const conexao = await pool.getConnection()
        console.log("Conectado ao MYSQL")
        conexao.release()
    }
    catch(erro){
        console.error("Erro ao conectar ao Mysql", erro)
        throw erro
    }
}