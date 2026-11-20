import type { ReactNode } from 'react';

export interface UserSettingForm {
  nickname: string;
  email: string;
  bio: string;
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface BasicInfoForm {
  email?: string;
  nickName?: string;
  rangeArea?: string;
  location?: string[];
  address?: string;
  profile?: string;
}

export interface InfoTextProps {
  loading: boolean;
  children: ReactNode;
}
