import { useState, useEffect, createContext } from 'react';
import { AppProps } from 'next/app'
import useDarkMode from 'use-dark-mode';
import { observer } from 'mobx-react'
import ThemeWrapper, { ThemeContext, AppContext } from '../themes/themeWrapper';
import  darkTheme from '../themes/darkTheme';
import lightTheme from '../themes/lightTheme';
import AppStore from '../store/app'
import '../styles/global.scss';
import { StylesProvider } from '@material-ui/styles';

const Toggle = ({ checked, onChange }) => (
  <span className="toggle-control">
    <input
      className="dmCheck"
      type="checkbox"
      checked={checked}
      onChange={onChange}
      id="dmCheck"
    />
    <label htmlFor="dmCheck" />
  </span>
);

const App = ({ Component, pageProps }: AppProps) => {
	const [isMounted, setIsMounted] = useState(false);
	const darkMode = useDarkMode(false)
	const theme = darkMode.value ? darkTheme : lightTheme;
	const themeMode = darkMode.value ? 'dark' : 'light'
	useEffect(() => {
		[].slice.call(document.querySelectorAll('table')).forEach(function(el){
			var wrapper = document.createElement('div');
			wrapper.className = 'table-area';
			el.parentNode.insertBefore(wrapper, el);
			el.parentNode.removeChild(el);
			wrapper.appendChild(el);
		})
		AppStore.toggleTheme(themeMode)
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
		AppStore.toggleTheme()
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

export default observer(App);
