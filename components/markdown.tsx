import React from 'react';
import ReactMarkdown from 'react-markdown';
import Typography from '@material-ui/core/Typography';
import { ListItem, InlineCode, Link } from './markdownrenderers';
import Quote from './quote';
import CodeReader from './codereader';

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
		return <Typography {...props}gutterBottom variant={variant} paragraph={paragraph} />
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
	return <ReactMarkdown renderers={renderers} {...props} />;
}
