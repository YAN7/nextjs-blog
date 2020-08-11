import { createContext, useState } from 'react';
import { StylesProvider, jssPreset } from '@material-ui/styles';
import { withStyles, createMuiTheme, MuiThemeProvider, ThemeProvider } from '@material-ui/core/styles';
import lightTheme from './lighttheme';
import darkTheme from './darktheme';
import applicationTheme from './applicationtheme'


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

	return (
		<ThemeProvider theme={theme}>
			<AppContext.Provider value={changeMode}>
				{children}
			</AppContext.Provider>
		</ThemeProvider>
	)
}

export default ThemeWrapper
