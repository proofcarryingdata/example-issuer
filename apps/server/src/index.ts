import { init as initEdDSAPCD, prove, serialize } from "@pcd/eddsa-pcd"
import { ArgumentTypeName } from "@pcd/pcd-types"
import cors from "cors"
import dotenv from "dotenv"
import express, { Express, Request, Response } from "express"

dotenv.config({ path: `${process.cwd()}/../../.env` })

if (!process.env.PRIVATE_KEY) {
    console.error(`[ERROR] The private key hasn't been set in the environment variables!`)

    process.exit(1)
}

// The PCD package must be initialized before using its methods.
await initEdDSAPCD()

const app: Express = express()
const port = process.env.SERVER_PORT || 3000

// Middlewares.
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.get("/", (_req: Request, res: Response) => {
    res.send("Express + TypeScript Server")
})

// It signs a message with the issuer EdDSA private key and returns a serialized PCD.
app.post("/sign-message", async (req: Request, res: Response) => {
    try {
        if (!req.body.color) {
            console.error(`[ERROR] No color specified!`)

            res.status(400).send()
        } else {
            console.debug(`[OKAY] color ${process.env.COLOR} has been successfully sent`)

            const pcd = await prove({
                id: {
                    argumentType: ArgumentTypeName.String
                },
                message: {
                    argumentType: ArgumentTypeName.StringArray,
                    value: [req.body.color]
                },
                privateKey: {
                    argumentType: ArgumentTypeName.String,
                    value: process.env.PRIVATE_KEY
                }
            })

            const serializedPCD = await serialize(pcd)

            res.json({ serializedPCD }).status(200)
        }
    } catch (error: any) {
        console.error(`[ERROR] ${error}`)
        res.send(500)
    }
})

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
})
