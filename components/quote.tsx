import blueGrey from '@material-ui/core/colors/blueGrey';
import Typography from '@material-ui/core/Typography';
import { ThemeContext } from '../themes/themeWrapper';

const Quote = ({ children, footnote }) => (
	<ThemeContext.Consumer>
		{({ theme }) => (
			<>
				<div>
					<div className="quoteWrap quoteLeft">
						<Typography variant="subtitle1" className="quoteBody" gutterBottom>
							{children}
						</Typography>
						<Typography variant="caption">
							{footnote}
						</Typography>
					</div>
				</div>
				<style jsx>{`
					.quoteWrap {
						background-color: ${theme.bg.input};
						color: #9e9e9e;
						padding: 1rem;
						border-left: 4px solid #9e9e9e;
						font-style: italic;
					};
					.quoteBody {
						margin-bottom: 20px;
					}
				`}</style>
			</>

		)}
	</ThemeContext.Consumer>
)

export default Quote;
