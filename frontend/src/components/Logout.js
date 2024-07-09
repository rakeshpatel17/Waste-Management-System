import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from './Loading';

export default function Logout({ setIsLoggedIn }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setIsLoggedIn(false);

    const timer = setTimeout(() => {
      setLoading(false);
      navigate('/login');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate, setIsLoggedIn]);

  if (loading) {
    return <Loading />;
  }

  return null;
}
