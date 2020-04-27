import React, { useState } from 'react';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx';
import html from 'react-syntax-highlighter/dist/esm/languages/prism/http';
import css from 'react-syntax-highlighter/dist/esm/languages/prism/css';
import lightStyle from 'react-syntax-highlighter/dist/esm/styles/prism/solarizedlight';
import darkStyle from 'react-syntax-highlighter/dist/esm/styles/prism/xonokai';

import Button from '@material-ui/core/Button';

const CodeReader = (props) => {
	const [open, setOpen] = useState(true);
	const [loading, setLoading] = useState(false);
	const { classes, value, language } = props;
	SyntaxHighlighter.registerLanguage('jsx', jsx);
	SyntaxHighlighter.registerLanguage('css', css);
	SyntaxHighlighter.registerLanguage('html', html);
	return (
		<>
			<div>
				
			</div>
		</>
	)
}

