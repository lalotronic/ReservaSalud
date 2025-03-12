import { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (rut, password) => {
    try {
      const response = await fetch('https://reservasalud.onrender.com/auth/login', { // Asegúrate de que la URL sea correcta
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rut, password }),
      });
      const data = await response.json();
      if (response.ok) {
        setUser({
          token: data.token,
          rut: data.user.rut,
          name: data.user.nombre,
          email: data.user.email,
          role: data.user.rol,
        });
        return true;
      } else {
        throw new Error(data.error || 'Invalid rut or password');
      }
    } catch (error) {
      console.error('Error during login:', error);
      return false;
    }
  };

  const register = async (rut, nombre, email, password) => {
    // Aquí debería ir tu lógica de registro
    // ...
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
export const useAuth = () => useContext(AuthContext);