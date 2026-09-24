export const publicKeyToBase64 = async (publicKey: CryptoKey) => {
    const spki = await window.crypto.subtle.exportKey('spki', publicKey);
    const bytes = new Uint8Array(spki);

    return bytes.toBase64({ alphabet: 'base64url' });
};

export const base64ToPublicKey = async (base64: string) => {
    const bytes = Uint8Array.fromBase64(base64, { alphabet: 'base64url' });

    return window.crypto.subtle.importKey(
        'spki',
        bytes,
        { name: 'RSA-OAEP', hash: 'SHA-256' },
        true,
        ['encrypt']
    );
};
