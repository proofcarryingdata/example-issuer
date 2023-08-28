import { EdDSAPCDPackage } from "@pcd/eddsa-pcd"
import { constructPassportPcdProveAndAddRequestUrl, openPassportPopup } from "@pcd/passport-interface"
import { ArgumentTypeName } from "@pcd/pcd-types"
import { useCallback, useState } from "react"

export default function App() {
    const [color, setColor] = useState("white")

    const addEdDSAPCD = useCallback(() => {
        const url = constructPassportPcdProveAndAddRequestUrl<typeof EdDSAPCDPackage>(
            process.env.PCDPASS_URL,
            window.location.origin + "/popup",
            EdDSAPCDPackage.name,
            {
                id: {
                    argumentType: ArgumentTypeName.String,
                    value: undefined
                },
                privateKey: {
                    argumentType: ArgumentTypeName.String,
                    value: undefined,
                    userProvided: true
                },
                message: {
                    argumentType: ArgumentTypeName.StringArray,
                    value: [color]
                }
            },
            {
                title: "EdDSA Signature"
            }
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
