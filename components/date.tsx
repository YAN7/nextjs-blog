import { parseISO, format } from 'date-fns';

interface PropDto {
	dateString: string;
	className?: any;
}

export default function Date({ dateString, className }: PropDto) {
	const date = parseISO(dateString)
	return (
		<>
			<time className={`${className} time`} dateTime={dateString}>{format(date, 'LLLL d, yyyy')}</time>
			<style>{`
				.time {
					display: block;
				}
			`}</style>
		</>
	)
}
