import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const  InlineCode = ({ classes, children }) => (
	<code >{children}</code>
)

const Link  = ({ classes, children, href }) => (
	<a href={href} target="_blank" rel="noopener noreferrer">{children}</a>
)

const ListItem = ({ children }) => (
	<>
		<li>{children}</li>
	</>
)

export {
	InlineCode,
	Link,
	ListItem,
}
