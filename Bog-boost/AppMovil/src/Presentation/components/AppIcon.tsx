import React from "react";
import { FontAwesome6 } from "@expo/vector-icons";
import { C } from "../theme/AppTheme";

// Nombre de ícono válido de Font Awesome 6 (la misma librería que usa la web, así los íconos coinciden).
export type IconName = React.ComponentProps<typeof FontAwesome6>['name'];

interface Props {
    name: IconName;
    size?: number;
    color?: string;
    // true para íconos de marcas (youtube, facebook, instagram, tiktok).
    brand?: boolean;
}

// Reemplazo de los emojis: dibuja un ícono de Font Awesome.
export const AppIcon = ({ name, size = 18, color = C.black, brand = false }: Props) => (
    <FontAwesome6 name={name} size={size} color={color} brand={brand} />
);
