import { base64ToPublicKey } from '$lib/base64';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const ssr = false;

export const load: PageLoad = async ({ url }) => {
	const base64 = url.searchParams.get('publicKey');

	if (!base64) {
		throw error(400, 'No public key provided');
	}

	try {
		const publicKey = await base64ToPublicKey(base64);

		return { publicKey };
	} catch (err) {
		console.error(err);
		throw error(400, 'Invalid public key format');
	}
};
