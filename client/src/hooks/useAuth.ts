import { useQuery, useMutation } from '@tanstack/react-query';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { useState, useEffect } from 'react';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const { data, isLoading } = useQuery({
    queryKey: ['/api/auth/check'],
    queryFn: getQueryFn => {
      return fetch('/api/auth/check', {
        credentials: 'include'
      }).then(res => {
        if (res.ok) {
          setIsAuthenticated(true);
          return res.json();
        }
        
        setIsAuthenticated(false);
        return null;
      }).catch(() => {
        setIsAuthenticated(false);
        return null;
      });
    },
    retry: false
  });

  const { mutate: logoutMutation } = useMutation({
    mutationFn: async () => {
      const response = await apiRequest('POST', '/api/auth/logout', {});
      return response.json();
    },
    onSuccess: () => {
      setIsAuthenticated(false);
      queryClient.invalidateQueries({ queryKey: ['/api/auth/check'] });
    }
  });

  useEffect(() => {
    if (!isLoading) {
      setLoading(false);
    }
  }, [isLoading]);

  const logout = async () => {
    logoutMutation();
  };

  return {
    isAuthenticated,
    loading,
    user: data,
    logout
  };
};

export default useAuth;
