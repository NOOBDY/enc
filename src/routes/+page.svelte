<script lang="ts">
	import { publicKeyToBase64 } from '$lib/base64';
	import { decrypt } from '$lib/encryption';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const publicKeyB64 = $derived(await publicKeyToBase64(data.publicKey));

	let ciphertext = $state('');

	const shareLink = $derived(() => {
		const url = new URL('/enc', data.url);
		url.searchParams.set('publicKey', publicKeyB64);

		return url.toString();
	});

	const handleCopy = async () => {
		await navigator.clipboard.writeText(shareLink());
	};
</script>

<div class="flex flex-col gap-4">
	<div class="flex flex-col gap-1">
		Input your ciphertext:
		<textarea bind:value={ciphertext} class="h-32 border px-1 break-all"></textarea>
	</div>

	{#if ciphertext.length > 0}
		{#await decrypt(ciphertext, data.privateKey) then decrypted}
			<div class="flex flex-col gap-1">
				<p>
					Decrypted message: <br />
					{decrypted}
				</p>
			</div>
		{:catch}
			Invalid ciphertext
		{/await}
	{/if}

	<div class="flex flex-col gap-1">
		<div class="flex w-full flex-col items-center justify-center">
			<div>
				Share link: <br />
				<p class="break-all">
					{shareLink()}
				</p>
			</div>

			<button onclick={handleCopy} class="cursor-pointer border px-4 py-1 hover:outline">
				Copy
			</button>
		</div>
	</div>
</div>
