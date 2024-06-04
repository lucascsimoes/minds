import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  id: string,
}

const getFromToken = {
  id: (): string | null => {
    const token = sessionStorage.getItem('token');
    if (!token) return null;
    
    try {
      const { id } = jwtDecode<DecodedToken>(token);
      return id;
    } catch (error) {
      console.error('Failed to decode token', error);
      return null
    }
  }
}

export default getFromToken