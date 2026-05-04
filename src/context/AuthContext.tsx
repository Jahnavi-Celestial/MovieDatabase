import { createContext, useState } from "react";

type AuthType = {
  sessionId: string | null;
  accountId: number | null;
  setSessionId: (v: string | null) => void;
  setAccountId: (v: number | null) => void;
};

export const AuthContext = createContext<AuthType>(null!);

export const AuthProvider = ({ children }: any) => {
  const [sessionId, setSessionId] = useState<string | null>(
    localStorage.getItem("session_id")
  );
  const [accountId, setAccountId] = useState<number | null>(
    Number(localStorage.getItem("account_id"))
  );

  return (
    <AuthContext.Provider
      value={{ sessionId, accountId, setSessionId, setAccountId }}
    >
      {children}
    </AuthContext.Provider>
  );
};