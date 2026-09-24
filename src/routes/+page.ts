import type { PageLoad } from './$types';

export const ssr = false;

export const load: PageLoad = async () => {
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
    return keyPair as CryptoKeyPair;
};
