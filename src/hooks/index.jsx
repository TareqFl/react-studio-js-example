import { useContext } from 'react';
import ThemeSettings from '../context/settingsContext';

const useThemeSettings = () => useContext(ThemeSettings);

export { useThemeSettings };
