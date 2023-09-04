import { useCallback, useState } from "react"
import { constructPassportPcdAddRequestUrl, openPassportPopup } from "@pcd/passport-interface"

/**
 * This page allows users to choose a color, which is then signed by
 * the issuer (server) and added to the user's PCDPass as an EdDSA PCD.
 */
export default function App() {
    const [color, setColor] = useState("0xffffff")

    // Send the color to the server which signs it and returns an EdDSA PCD.
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

        if (!response.ok) {
            alert("Some error occurred")
            return
        }

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
                <option value="0xCF6969">Red</option>
                <option value="0xDDD57E">Yellow</option>
                <option value="0xBABABA">Gray</option>
            </select>
            <button onClick={addEdDSAPCD}>Add a PCD signature with your color</button>
        </>
    )
}
