"use client";

import { useEffect } from 'react';
import { useAuth } from '@clerk/nextjs';
import { useTaskStore } from '@/store/useTaskStore';

export function AuthSync() {
  const { userId, isLoaded } = useAuth();
  const setUserId = useTaskStore(state => state.setUserId);
  const fetchTasks = useTaskStore(state => state.fetchTasks);

  useEffect(() => {
    if (isLoaded) {
      setUserId(userId);
      if (userId) {
        fetchTasks();
      } else {
        useTaskStore.setState({ tasks: [] });
      }
    }
  }, [userId, isLoaded, setUserId, fetchTasks]);

  return null;
}
