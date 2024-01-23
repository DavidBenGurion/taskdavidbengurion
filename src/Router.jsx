import { Navigate,createBrowserRouter } from "react-router-dom";
import Master from "./views/Auth/Master";
import Main from "./views/Main/main";
import MainDetil from "./views/Detail/MainDetil";
import MainTag from "./views/Tag/MainTag";
import FirstPage from "./views/FirstPage/FirstPage";
const router =createBrowserRouter([
  {
    path:'/',
    element:<Master/>,
    children:[
      {
        path:'/',
        element:<FirstPage/>
      },
      {
          path:'/gallery',
          element:<Main/>
      },
      {
        path:'/detil/:photoId/:secret',
        element:<MainDetil/>
      },
      {
        path:'/tag/:tagSearch',
        element:<MainTag/>
      }
    ]
  }
])
export default router;