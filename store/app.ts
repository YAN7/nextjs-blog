import { types } from 'mobx-state-tree'

const AppStore = types
	.model({
		theme: 'light'
	})
	.actions(self => ({
		toggleTheme(themeMode?: string) {
			const { theme } = self
			if (themeMode) {
				self.theme = themeMode
				return
			}
			self.theme = theme === 'light' ? 'dark' : 'light'
		}
	}))
	.create()

export default AppStore