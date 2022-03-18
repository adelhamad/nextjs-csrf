import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import csrf from '../src/csrf'
import axios from 'axios'

export default function Home({ csrfToken }) {
	const dummyCall = (withHeader = true) => {
		axios
			.post('http://localhost:3000/api/hello', {}, { headers: !withHeader ? undefined : { 'CSRF-Token': csrfToken } })
			.then((res) => alert(`Hi ${res.data.name}`))
			.catch(() => alert('Not protected'))
	}

	return (
		<div className={styles.container}>
			<Head>
				<title>CSRF Protection in Next.js</title>
				<meta name="description" content="CSRF Protection in Next.js" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<h1 className={styles.title}>CSRF Protection in Next.js</h1>

			<button onClick={dummyCall} type="button">
				Dummy Call With CSRF Header
			</button>
			<button onClick={() => dummyCall(false)} type="button">
				Dummy Call Without CSRF Header
			</button>
		</div>
	)
}

export async function getServerSideProps(context) {
	const { req, res } = context
	await csrf(req, res)
	return {
		props: { csrfToken: req.csrfToken() },
	}
}
