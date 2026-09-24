import type { PageLoad } from './$types';

export const ssr = false;

export const load: PageLoad = async ({ url }) => {
    const keyPair = await window.crypto.subtle.generateKey(
        {
            name: 'RSA-OAEP',
            modulusLength: 4096,
            publicExponent: new Uint8Array([1, 0, 1]),
            hash: 'SHA-256'
        },
        false,
        ['encrypt', 'decrypt']
    );
    return { url, ...(keyPair as CryptoKeyPair) };
};
