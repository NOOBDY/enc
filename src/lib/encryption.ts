export const encrypt = async (data: string, publicKey: CryptoKey) => {
    const encoded = new TextEncoder().encode(data);

    const encrypted = await window.crypto.subtle.encrypt({ name: 'RSA-OAEP' }, publicKey, encoded);

    return window.btoa(String.fromCharCode(...new Uint8Array(encrypted)));
};

export const decrypt = async (ciphertext: string, privateKey: CryptoKey) => {
    const binary = window.atob(ciphertext);
    const encrypted = Uint8Array.from(binary, (c) => c.charCodeAt(0));

    const decrypted = await window.crypto.subtle.decrypt({ name: 'RSA-OAEP' }, privateKey, encrypted);

    return new TextDecoder().decode(decrypted);
};
