import { useCallback, useState } from "react"
import { constructPassportPcdAddRequestUrl, openPassportPopup } from "@pcd/passport-interface"

/**
 * This component allows users to choose a color, which is then signed by
 * the issuer (server) and added to the user's PCDPass as an EdDSA PCD.
 */
export default function App() {
    const [color, setColor] = useState("0xffffff")

    const addEdDSAPCD = useCallback(async () => {
        // Send the color to the server which signs it and returns an EdDSA PCD.
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

        // The EdDSA is added to the user's PCDPass.
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
