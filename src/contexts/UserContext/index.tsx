import * as React from 'react';
import { useQuery } from 'react-query';

interface UserContextState {
  authenticated: boolean;
  refetch?: () => void;
}

const defaultValues: UserContextState = {
  authenticated: false,
};

export const UserContext = React.createContext<UserContextState>(defaultValues);

const UserProvider: React.FC = ({ children }) => {
  const [authenticated, setAuthenticated] = React.useState<boolean>(false);
  const getAuthStatus = async () => {
    const response = await fetch(`/api/auth/authStatus`);
    const data = await response.json();
    return data.authenticated;
  };
  const { data, refetch } = useQuery(`auth`, getAuthStatus);
  React.useEffect(() => {
    setAuthenticated(data);
  }, [data]);
  return (
    <UserContext.Provider value={{ authenticated, refetch }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
