import * as BasicAuth from 'basic-auth';
import type { RequestHandler } from 'express';

import { getUser } from '../../infra/auth/auth';

// Resolves permissions and populates req.user object, in case an api key is used
// in the password field of a basic authentication header. Also works with JWTs.
export const basicApiKeyAuthenticate: RequestHandler = async (
	req,
	res,
	next,
) => {
	const creds = BasicAuth.parse(req.headers['authorization']!);
	if (creds) {
		req.params.subject = creds.name;
		req.params.apikey = creds.pass;
	}
	try {
		await getUser(req, undefined, false);
		if (req.creds) {
			next();
		} else {
			res.status(401).end();
		}
	} catch (err) {
		next(err);
	}
};
