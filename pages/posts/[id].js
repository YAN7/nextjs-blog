import Head from 'next/head';
import Layout from '../../components/layout';
import Date from '../../components/date';
import { getAllPostIds, getPostDataById } from '../../lib/post';
import utilStyle from '../../styles/utils.module.css'

export default function Post({ postData }) {
	const { title, id, date, contentHtml } = postData;
	return (
		<Layout>
			<Head>
				<title>{title}</title>
			</Head>
			<article>
				<h1 className={utilStyle.headingXl}>{title}</h1>
				<div className={utilStyle.lightText}>
					<Date dateString={date} />
				</div>
				<div dangerouslySetInnerHTML={{ __html: contentHtml }} />
			</article>
		</Layout>
	)
}

export async function getStaticPaths() {
	const paths = getAllPostIds();
	return {
		paths,
		fallback: false,
	}
}

export async function getStaticProps({ params }) {
	const postData = await getPostDataById(params.id);
	return {
		props: {
			postData,
		}
	}
}

