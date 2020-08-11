import React from 'react';
import ReactMarkdown from 'react-markdown';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { ListItem, InlineCode, Link } from './markdownrenderers';
import Quote from './quote';
import CodeReader from './codereader';

const useStyles = makeStyles((theme) => ({
	title: {
		color: theme.palette.primary.main,
		position: 'relative',
		'&::after': {
			content: '" "',
			background: 'linear-gradient(to right,rgba(239, 187, 53, 0.6),rgba(236, 198, 48, 0.1))',
			height: '3px',
			position: 'relative',
			top: 0,
			left: 0,
			bottom: 0,
			right: 0,
			width: 'auto',
			flexGrow: 1,
			borderRadius: 2,
			display: 'block',
		}
	}
}))

const renderers = {
	heading: ({ level, ...props }) => {
		let variant;
		let paragraph;
		switch (level) {
			case 1:
				variant = 'h4';
				break;
			case 2:
				variant = 'subtitle1';
				break;
			case 3:
				variant = 'h5';
				break;
			case 4:
				variant = 'h6';
				paragraph = true;
				break;
			default: variant = '';
			break;
		}
		const classes = useStyles();
		return <Typography className={classes.title} {...props}gutterBottom variant={variant} paragraph={paragraph} />
	},
	listItem: ({ tight, ordered, children, ...props }) => (
		<ListItem>
			<Typography component="span">{children}</Typography>
		</ListItem>
	),
	paragraph: props => <Typography style={{ lineHeight: 2 }} {...props} paragraph />,
	inlineCode: InlineCode,
  blockquote: Quote,
	link: Link,
	code: CodeReader,
};

export default function Markdown(props) {
	const classes = useStyles();
	return <ReactMarkdown renderers={renderers} {...props} />;
}
