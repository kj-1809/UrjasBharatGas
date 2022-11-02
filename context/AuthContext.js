import { createContext , useState } from "react";

export const AuthContext = createContext();


const LoginProvider = (props) => {

  const [isAuthPending , setIsAuthPending] = useState(false)
  
  return (
    <AuthContext.Provider value = {{isAuthPending,setIsAuthPending}}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default LoginProvider;


