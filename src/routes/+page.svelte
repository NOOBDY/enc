<script lang="ts">
	import { base64ToPublicKey, publicKeyToBase64 } from '$lib/base64';
	import { decrypt, encrypt } from '$lib/encryption';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const publicKeyB64 = $derived(await publicKeyToBase64(data.publicKey));

	let message = $state('');

	const publicKey = $derived(await base64ToPublicKey(publicKeyB64));
	const encrypted = $derived(await encrypt(message, publicKey));

	const decrypted = $derived(await decrypt(encrypted, data.privateKey));
</script>

<input bind:value={message} class="border" />

<p class="w-3xl">
	public key base64:<br />
	<code class="break-all">
		{publicKeyB64}
	</code>
</p>

<p class="w-3xl">
	encrypted message: <br />
	<code class="break-all">
		{encrypted}
	</code>
</p>

<p>
	decrypted message: {decrypted}
</p>
