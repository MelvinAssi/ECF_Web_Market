import { useEffect, useState } from 'react';

export const useSidebarState = () => {
  const [reduce, setReduce] = useState(() => {
    const stored = localStorage.getItem('admin-sidebar-reduce');
    return stored === 'true';
  });

  useEffect(() => {
    localStorage.setItem('admin-sidebar-reduce', String(reduce));
  }, [reduce]);

  return [reduce, setReduce] as const;
};
