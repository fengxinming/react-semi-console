import type { ReactNode } from "react";
import type { ProjectItem } from "~/api/types";

export interface ProjectCardProps extends ProjectItem {
  loading?: boolean;
}

export interface UserText {
  loading: boolean;
  children: ReactNode;
}
