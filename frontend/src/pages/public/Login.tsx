import React from 'react';
import { useSearchParams } from 'react-router-dom';
import AuthSectionOne from '../../components/ui/auth-section-1';

export const Login: React.FC = () => {
  const [searchParams] = useSearchParams();
  const roleParam = searchParams.get('role');
  const defaultRole = roleParam === 'supplier' ? 'supplier' : 'vendor';

  return <AuthSectionOne initialMode="login" defaultRole={defaultRole} />;
};
