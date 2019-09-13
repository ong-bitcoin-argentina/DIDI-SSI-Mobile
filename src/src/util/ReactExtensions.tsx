import { ReactNode } from "react";

export type AddChildren<T> = T & Readonly<{ children?: ReactNode }>;
