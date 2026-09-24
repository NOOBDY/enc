<script lang="ts">
	import { base64ToPublicKey, publicKeyToBase64 } from '$lib/base64';
	import { decrypt, encrypt } from '$lib/encryption';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const publicKeyB64 = $derived(await publicKeyToBase64(data.publicKey));

	const message = 'test';

	const publicKey = $derived(await base64ToPublicKey(publicKeyB64));
	const encrypted = $derived(await encrypt(message, publicKey));

	const decrypted = $derived(await decrypt(encrypted, data.privateKey));
</script>

<p>
	public key base64:<br />
	<code>
		{publicKeyB64}
	</code>
</p>

<p>
	encrypted message: <br />
	<code>
		{encrypted}
	</code>
</p>

<p>
	decrypted message: {decrypted}
</p>
