import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { ThemeContext } from '../themes/themewrapper';

const  InlineCode = ({ classes, children }) => (
	<code >{children}</code>
)

const Link  = ({ classes, children, href }) => (
	<ThemeContext.Consumer>
		{({theme}) => (
			<>
				<a href={href} className="link" target="_blank" rel="noopener noreferrer">{children}</a>
				<style jsx>{`
						.link {
							color: ${theme.text.link};
							position: relative;
							display: inline-block;
							overflow: hidden;
							text-decoration: none;
							vertical-align: top;
							outline: 0;
						}
						.link:hover {
							text-decoration: underline;
						};
						.link:before' {
							position: absolute;
							top: auto;
							bottom: 1px;
							left: 0px;
							width: 100%;
							height: 1px;
							content: 123;
							display: block;
							background-color: ${theme.text.link};
							transition: all 0.2s;
							transform: scaleX(0);
							backface-visibility: hidden;
						};
						.link:hover:before' {
							transform: scaleX(1);
						};
					`}</style>
			</>
		)}
	</ThemeContext.Consumer>
)

const ListItem = ({ children }) => (
	<ThemeContext.Consumer>
		{({theme}) => (
			(
				<>
					<li>{children}</li>
				</>
			)
		)}
	</ThemeContext.Consumer>
)

export {
	InlineCode,
	Link,
	ListItem,
}
