import { rest } from "msw"
import { setupServer } from "msw/node"

const handlers = [
	rest.get(`${process.env.REACT_APP_DOWNLOAD_API}`, (req, res, ctx) => {
		return res(
			ctx.status(200),
			ctx.json([
				{
					data: [
						[100, 2],
						[5, 3],
						[4, 7],
					],
				},
			]),
		)
	}),
]

// This configures a request mocking server with the given request handlers.
const server = setupServer(...handlers)

export { server, rest }
