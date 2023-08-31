import { useCallback, useState } from "react"
import { constructPassportPcdAddRequestUrl, openPassportPopup } from "@pcd/passport-interface"

export default function App() {
    const [color, setColor] = useState("0xffffff")

    const addEdDSAPCD = useCallback(async () => {
        const response = await fetch(`http://localhost:${process.env.SERVER_PORT}/sign-message`, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                color: color
            })
        })

        const { serializedPCD } = await response.json()

        const url = constructPassportPcdAddRequestUrl(
            process.env.PCDPASS_URL as string,
            window.location.origin + "/popup",
            serializedPCD
        )

        openPassportPopup("/popup", url)
    }, [color])

    return (
        <>
            <select name="colors" value={color} onChange={(event: any) => setColor(event.target.value)}>
                <option value="0xffffff">White</option>
                <option value="0xA27A7A">Red</option>
                <option value="0xA2A08B">Yellow</option>
                <option value="0xB8B8B8">Gray</option>
            </select>
            <button onClick={addEdDSAPCD}>Add PCD signature</button>
        </>
    )
}
