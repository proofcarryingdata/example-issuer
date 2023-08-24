"use client"

import { constructPassportPcdProveAndAddRequestUrl } from "@pcd/passport-interface"
import { ArgumentTypeName } from "@pcd/pcd-types"
import { RSAPCDPackage } from "@pcd/rsa-pcd"
import styles from "./page.module.css"

const PCDPASS_URL = "http://localhost:3000"

async function addRSASignature() {
    const proofUrl = constructPassportPcdProveAndAddRequestUrl<typeof RSAPCDPackage>(
        PCDPASS_URL,
        window.location.origin + "/popup",
        RSAPCDPackage.name,
        {
            id: {
                argumentType: ArgumentTypeName.String,
                value: "1"
            },
            privateKey: {
                argumentType: ArgumentTypeName.String,
                value: `-----BEGIN RSA PRIVATE KEY-----
MIIBOwIBAAJBAIZLtJ39LZByCV94+oNoAcSvJrhmOYnmQ5l/rs/12QeWtJ61d2nY
b8teIgWKM+zklynLWmkjO/fZ3XQrvsn5cDkCAwEAAQJASMDaqHxwIsCks0Qm8ul1
i8gXge5fXYWROaciXSci3CjIqre4FoLCYXppcRMd1akrZh1m1I9K8fWKti6JIZ5v
wQIhAPJerqmX8D+c9nVl8ZheCrQVV+sYfN2TEO0Y7CMPAqk3AiEAjdkdvel6o/q+
Wg2Q4sqtHewf0MlHp9+lxp/TSIylqg8CIQDR6/YGCAZbYp0Iw7pESTemEFJs2nHU
C/v+D7b/CpI4cwIgSAQYJog4XLJ8HApRKeOOeueby4u1VpSkfLA+O9I0dZ8CIQDf
ez8o4mpJ4x2mr5GQxiPnFKoCigZ62VBg7WUX/DQzvA==
-----END RSA PRIVATE KEY-----`,
                userProvided: true
            },
            signedMessage: {
                argumentType: ArgumentTypeName.String,
                value: "white"
            }
        },
        {
            title: "RSA Signature"
        }
    )

    // Popup window will redirect to the passport to request a proof.
    // Open the popup window under the current domain, let it redirect there.
    const popupUrl = `/popup?proofUrl=${encodeURIComponent(proofUrl)}`

    console.log()

    window.open(popupUrl, "_blank", "width=360,height=480,top=100,popup")
}

export default function Home() {
    return (
        <main className={styles.main}>
            <button onClick={addRSASignature}>Sign a message and add it to PCD pass</button>
        </main>
    )
}
