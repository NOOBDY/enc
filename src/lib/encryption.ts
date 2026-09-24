export const encrypt = async (data: string, publicKey: CryptoKey) => {
    const encoded = new TextEncoder().encode(data);

    const encrypted = await window.crypto.subtle.encrypt({ name: 'RSA-OAEP' }, publicKey, encoded);
    const bytes = new Uint8Array(encrypted);

    return bytes.toBase64({ alphabet: 'base64url' });
};

export const decrypt = async (ciphertext: string, privateKey: CryptoKey) => {
    const encrypted = Uint8Array.fromBase64(ciphertext, { alphabet: 'base64url' });

    const decrypted = await window.crypto.subtle.decrypt({ name: 'RSA-OAEP' }, privateKey, encrypted);

    return new TextDecoder().decode(decrypted);
};
