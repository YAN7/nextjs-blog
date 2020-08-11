import React, { useState, useEffect, useCallback } from 'react';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import jsx from 'react-syntax-highlighter/dist/cjs/languages/prism/jsx';
import html from 'react-syntax-highlighter/dist/cjs/languages/prism/http';
import css from 'react-syntax-highlighter/dist/cjs/languages/prism/css';
import lightStyle from 'react-syntax-highlighter/dist/cjs/styles/prism/solarizedlight';
import darkStyle from 'react-syntax-highlighter/dist/esm/styles/prism/xonokai';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Collapse from '@material-ui/core/Collapse';

import Button from '@material-ui/core/Button';
import Code from '@material-ui/icons/Code';
import Close from '@material-ui/icons/Close';
import { ThemeContext } from '../themes/themewrapper';

const CodeReader = (props) => {
	const [open, setOpen] = useState(true);
	const { value, language } = props;
	const [mode, setMode] = useState('light');
	SyntaxHighlighter.registerLanguage('jsx', jsx);
	SyntaxHighlighter.registerLanguage('css', css);
	SyntaxHighlighter.registerLanguage('html', html);

	const darkMode = window.localStorage.getItem('darkMode');

	return (
		<ThemeContext.Consumer>
			{({ theme }) => (
				<>
					<div>
						<div className="src">
							<Tooltip title={open ? 'close code' : 'open code'} placement="top">
								<Button onClick={() => setOpen(!open)} color="secondary" size="small">
									{ open ? (
										<Close onClick={() => setOpen(!open)} fontSize="small"/>
									) : (
										<Code onClick={() => setOpen(!open)} fontSize="small"/>
									)}
								</Button>
							</Tooltip>
						</div>
						<Collapse in={open} className="source">
							<SyntaxHighlighter
								language={language}
								style={darkMode === 'true' ? darkStyle : lightStyle}
								showLineNumbers="true"
							>
								{value}
							</SyntaxHighlighter>
						</Collapse>
					</div>
					<style jsx>{`
						.src {
							text-align: left;
							padding: 10px;
							padding-bottom: 0;
							z-index: 1;
							font-family: monospace;
							width: 100%;
							display: flex;
							align-items: center;
						};
						.src span {
							font-size: 14px;
						};
						.src p {
							color: grey;
						};
						.src p span {
							margin-right: 5px;
							top: 3px;
							position: relative;
						};
						div :global(.toggleContainer button) {
							height: 26px;
						};
						.iconSmall: {
							font-size: 20px;
						};
						.source :global(pre) {
							margin: 0 0 1em 30px !important;
							border-radius: 4px !important;
							border: 1px solid rgb(225, 225, 232) !important;
							padding: 15px !important;
							font-size: 1em !important;
							font-family: Menlo, Monaco, monospace !important;
						};
						.source :global(code) {
							tab-size: 2 !important;
							font-size: 1em !important;
							font-family: Menlo, Monaco, monospace !important;
						};
						.open {
							height: auto;
							min-height: 20px;
						};
					`}</style>
				</>
			)}
		</ThemeContext.Consumer>
	)
}

export default CodeReader

