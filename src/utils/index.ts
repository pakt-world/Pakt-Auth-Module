/* -------------------------------------------------------------------------- */
/*                             External Dependency                            */
/* -------------------------------------------------------------------------- */

import { twMerge } from "tailwind-merge";
import { type ClassValue, clsx } from "clsx";

/* -------------------------------------------------------------------------- */
/*                             Internal Dependency                            */
/* -------------------------------------------------------------------------- */

import { ITheme } from "../types";

const isProductionEnvironment = true;

function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

const flattenTheme = (obj: any, prefix = ''): Record<string, string> => {
  const flattened: Record<string, string> = {};
  
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      const newKey = prefix ? `${prefix}-${key}` : key;
      
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        Object.assign(flattened, flattenTheme(value, newKey));
      } else if (typeof value === 'string') {
        flattened[newKey] = value;
      }
    }
  }
  
  return flattened;
};

const applyTheme = (theme: ITheme) => {
  const root = document.documentElement;

  // Convert camelCase to kebab-case for CSS variables
  const toKebabCase = (str: string) => {
    return str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
  };

  // Apply flat tokens (including legacy tokens)
  Object.keys(theme).forEach((key) => {
    const value = theme[key as keyof typeof theme];
    if (typeof value === 'string') {
      const cssVariableName = toKebabCase(key);
      const cssProperty = `--pkas-${cssVariableName}`;
      root.style.setProperty(cssProperty, value);
    }
  });

  // Apply nested structure tokens (only if they exist)
  const nestedStructures = ['text', 'input', 'states', 'button'];
  const hasNestedStructures = nestedStructures.some(key => theme[key as keyof typeof theme]);
  
  if (hasNestedStructures) {
    const flattenedColors = flattenTheme(theme);
    
    Object.keys(flattenedColors).forEach((key) => {
      const value = flattenedColors[key];
      const cssProperty = `--pkas-${key}`;
      root.style.setProperty(cssProperty, value);
    });
  }
};

const sleep = (milliseconds: number) => {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
};

export {
  cn,
  isProductionEnvironment,
  applyTheme,
  flattenTheme,
  sleep,
}
