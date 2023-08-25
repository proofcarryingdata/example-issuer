import { EdDSAPCDPackage } from "@pcd/eddsa-pcd"
import { constructPassportPcdProveAndAddRequestUrl, openPassportPopup } from "@pcd/passport-interface"
import { ArgumentTypeName } from "@pcd/pcd-types"

export default function App() {
    async function addEdDSASignature() {
        const url = constructPassportPcdProveAndAddRequestUrl<typeof EdDSAPCDPackage>(
            process.env.PCDPASS_URL,
            window.location.origin + "/popup",
            EdDSAPCDPackage.name,
            {
                id: {
                    argumentType: ArgumentTypeName.String,
                    value: undefined,
                    userProvided: true
                },
                privateKey: {
                    argumentType: ArgumentTypeName.String,
                    value: undefined,
                    userProvided: true
                },
                message: {
                    argumentType: ArgumentTypeName.StringArray,
                    value: ["0x10"]
                }
            },
            {
                title: "EdDSA Signature"
            }
        )

        openPassportPopup("/popup", url)
    }

    return <button onClick={addEdDSASignature}>Sign a message and add it to PCD pass</button>
}
