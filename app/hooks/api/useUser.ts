import { useMutation, useQuery } from '@tanstack/react-query';
import { useUserStore } from '~/store';
import type { UserRole } from '~/store/types';
import {
  fetchUser,
  saveInfo,
  switchRole,
  fetchProjects,
  fetchTeams,
  fetchNews,
  fetchEnterprise,
  fetchAuthList,
} from '~/api/user';

export function useSaveInfo() {
  return useMutation({
    mutationFn: saveInfo,
    onSuccess: async () => {
      const full = await fetchUser();
      useUserStore.getState().setUser(full);
    },
  });
}

export function useSwitchRole() {
  return useMutation({
    mutationFn: (role: UserRole) => switchRole(role),
    onSuccess: (res, role) => {
      useUserStore.getState().setRole(role, res.permissions);
      useUserStore.getState().setToken(res.token);
    },
  });
}

export function useProjectsQuery() {
  return useQuery({ queryKey: ['user-projects'], queryFn: fetchProjects });
}

export function useTeamsQuery() {
  return useQuery({ queryKey: ['user-teams'], queryFn: fetchTeams });
}

export function useNewsQuery() {
  return useQuery({ queryKey: ['user-news'], queryFn: fetchNews });
}

export function useEnterpriseQuery() {
  return useQuery({ queryKey: ['user-verified-enterprise'], queryFn: fetchEnterprise });
}

export function useAuthListQuery() {
  return useQuery({ queryKey: ['user-verified-authList'], queryFn: fetchAuthList });
}
