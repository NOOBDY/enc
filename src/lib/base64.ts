export const publicKeyToBase64 = async (publicKey: CryptoKey) => {
    const spki = await window.crypto.subtle.exportKey('spki', publicKey);
    const bytes = new Uint8Array(spki);

    let binary = '';
    for (const byte of bytes) {
        binary += String.fromCharCode(byte);
    }

    return window.btoa(binary);
};

export const base64ToPublicKey = async (base64: string) => {
    const binary = window.atob(base64);
    const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));

    return window.crypto.subtle.importKey(
        'spki',
        bytes,
        { name: 'RSA-OAEP', hash: 'SHA-256' },
        true,
        ['encrypt']
    );
};
