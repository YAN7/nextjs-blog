import { createContext, useState, useEffect } from 'react';
import { withStyles, createMuiTheme, MuiThemeProvider, ThemeProvider } from '@material-ui/core/styles';
import lightTheme from './lightTheme';
import darkTheme from './darkTheme';
import applicationTheme from './applicationTheme'


export const ThemeContext = createContext({
	theme: lightTheme,
});

export const AppContext = createContext();

const test = applicationTheme('blueCyanTheme', 'light', 'rtl');

const theme = createMuiTheme(test)

const ThemeWrapper = (props) => {
	const { children } = props;
	const [mode, setMode] = useState('light');
	const [theme, setTheme] = useState(createMuiTheme(applicationTheme('yellowCyanTheme', mode, 'rtl')));

	const changeMode = async (mode) => {
		await setMode(mode);
		await setTheme(createMuiTheme(applicationTheme('yellowCyanTheme', mode, 'rtl')));
	};

	useEffect(() => {
		const themeMode = localStorage.getItem('darkMode') ? 'dark' : 'light'
		changeMode(themeMode)
	}, [])

	return (
		<ThemeProvider theme={theme}>
			<AppContext.Provider value={changeMode}>
				{children}
			</AppContext.Provider>
		</ThemeProvider>
	)
}

export default ThemeWrapper
