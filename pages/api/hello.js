import csrf from '../../src/csrf'
export default async function handler(req, res) {
	try {
		await csrf(req, res)
	} catch (e) {
		res.status(401).json({ name: 'Fuck off' })
	}
	res.status(200).json({ name: 'John Doe' })
}
