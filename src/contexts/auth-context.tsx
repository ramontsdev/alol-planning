import { createContext, ReactNode, useContext, useState } from "react";

type AuthContextProps = {
  currentUser: UserAttributes;
  handleAuthenticate: (userData: UserAttributes) => void
}
const AuthContext = createContext({} as AuthContextProps)

export type UserAttributes = {
  id: string;
  name: string;
  username: string;
  email: string
}

type Props = {
  children: ReactNode;
}
export function AuthProvider({ children }: Props) {
  const [currentUser, setCurrentUser] = useState<UserAttributes>({} as UserAttributes)

  function handleAuthenticate(userData: UserAttributes) {
    setCurrentUser(userData)
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        handleAuthenticate
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => useContext(AuthContext);
