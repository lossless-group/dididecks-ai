import { browser } from '$app/environment';
import { writable } from 'svelte/store';

export type Theme = 'dark' | 'light';

const STORAGE_KEY = 'dddecks-theme';

function getInitialTheme(): Theme {
  if (!browser) return 'dark';

  const savedTheme = localStorage.getItem(STORAGE_KEY);

  if (savedTheme === 'light' || savedTheme === 'dark') {
    return savedTheme;
  }

  return 'dark';
}

function applyTheme(value: Theme) {
  if (!browser) return;

  document.documentElement.dataset.theme = value;
  localStorage.setItem(STORAGE_KEY, value);
}

function createThemeStore() {
  const { subscribe, set, update } = writable<Theme>(getInitialTheme());

  return {
    subscribe,

    initialise() {
      const theme = getInitialTheme();
      applyTheme(theme);
      set(theme);
    },

    setTheme(value: Theme) {
      applyTheme(value);
      set(value);
    },

    toggleTheme() {
      update((current) => {
        const next = current === 'dark' ? 'light' : 'dark';
        applyTheme(next);
        return next;
      });
    }
  };
}

export const theme = createThemeStore();
