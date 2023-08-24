"use client"

import { usePassportPopupSetup } from "@pcd/passport-interface"

/**  This popup sends requests and receives PCDs from the passport. */
export default function Popup() {
    const error = usePassportPopupSetup()
    return <div>{error}</div>
}
