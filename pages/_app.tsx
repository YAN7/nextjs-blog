import { useState, useEffect, createContext } from 'react';
import { AppProps } from 'next/app'
import useDarkMode from 'use-dark-mode';
import ThemeWrapper, { ThemeContext, AppContext } from '../themes/themewrapper';
import  darkTheme from '../themes/darktheme';
import lightTheme from '../themes/lighttheme';
import '../styles/global.scss';
import { StylesProvider } from '@material-ui/styles';

const Toggle = ({ checked, onChange }) => (
  <span className="toggle-control">
    <input
      className="dmcheck"
      type="checkbox"
      checked={checked}
      onChange={onChange}
      id="dmcheck"
    />
    <label htmlFor="dmcheck" />
  </span>
);

const App = ({ Component, pageProps }: AppProps) => {
	const [isMounted, setIsMounted] = useState(false);
	const darkMode = useDarkMode(true)
	const theme = darkMode.value ? darkTheme : lightTheme;

	useEffect(() => {
		setIsMounted(true)
	}, [])

	const handleDarkMode = async (mode, changeMode) => {
		switch (mode) {
			case 'light': {
				await darkMode.disable();
				break;
			}
			case 'dark': {
				await darkMode.enable();
				break;
			}
			case 'toggle': {
				await darkMode.toggle();
				break;
			}
			default: {
				darkMode.toggle();
			}
		}
		changeMode(!darkMode.value ? 'dark' : 'light');
	}
	
	return (
		<ThemeWrapper>
			<AppContext.Consumer>
				{(changeMode) => (
					<ThemeContext.Provider value={{ theme: {...theme} }}>
						<ThemeContext.Consumer>
							{(theme) => (
								<>
									<div className="dark-mode-toggle">
										<button type="button" onClick={() => handleDarkMode('light', changeMode)}>
											☀
										</button>
										<Toggle checked={darkMode.value} onChange={() => handleDarkMode('toggle', changeMode)} />
										<button type="button" onClick={() => handleDarkMode('dark', changeMode)}>
											☾
										</button>
									</div>
									{isMounted && <Component theme={theme} {...pageProps} />}
								</>
							)}
						</ThemeContext.Consumer>
					</ThemeContext.Provider>
				)}
			</AppContext.Consumer>
			
		</ThemeWrapper>
	)
}

export default App;
