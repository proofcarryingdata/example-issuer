import { createRoot } from "react-dom/client"
import App from "./App"
import Popup from "./Popup"
import { createBrowserRouter, RouterProvider } from "react-router-dom"

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />
    },
    {
        path: "/popup",
        element: <Popup />
    }
])

const root = createRoot(document.getElementById("app"))

root.render(<RouterProvider router={router} />)
