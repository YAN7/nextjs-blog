import Head from 'next/head'
import Link from 'next/link'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { getSortedPostsData } from '../lib/post'
import Layout, { siteTitle } from '../components/layout'
import Date from '../components/date'
import utilStyles from '../styles/utils.module.css';

const styles = theme => ({
  lala: {
    color: 'red',
  }
})

function Home({ allPostsData, theme, classes, changeMode }) {
  return (
    <Layout style={{ maxWidth: '36rem' }} home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headMd}>
        <p className="about">hi, I'm YAN7, a pround front end engineer!</p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href="/posts/[id]" as={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
          </li>
          ))}
        </ul>
      </section>
      <style>{`
        .about {
          text-align: center;
        }
      `}</style>
    </Layout>
  )
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    }
  }
}

export default withStyles(styles)(Home);
