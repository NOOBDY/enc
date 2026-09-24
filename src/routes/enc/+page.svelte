<script lang="ts">
	import { encrypt } from '$lib/encryption';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	let message = $state('');

	const encrypted = $derived(await encrypt(message, data.publicKey));

	const handleCopy = async () => {
		await navigator.clipboard.writeText(encrypted);
	};
</script>

<div class="flex flex-col gap-8">
	<div class="flex flex-col gap-1">
		Input your message ({message.length}/400):
		<textarea bind:value={message} class="h-32 border px-1" maxlength="400"></textarea>
	</div>

	{#if message}
		<div class="flex flex-col gap-1">
			Encrypted message: <br />
			<code class="break-all">
				{encrypted}
			</code>

			<div class="flex w-full items-center justify-center">
				<button onclick={handleCopy} class="cursor-pointer border px-4 py-1 hover:outline">
					Copy
				</button>
			</div>
		</div>
	{/if}
</div>
