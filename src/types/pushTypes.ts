export interface PushData {
  title: string;
  body?: string;
  href?: string;
  icon?: string;
  image?: string;
  tag?: string;
  silent?: boolean;
}

export interface PushSettings {
  endpoint?: string;
  notifyAtNewRecipes: boolean;
}
