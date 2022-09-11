<script>
	import { enhance } from '$app/forms';

	/** @typedef {import('@prisma/client').Todo} Todo */

	/** @type Todo */
	export let todo;

	/** @type HTMLFormElement */
	let form;
	let isLoading = false;

	const onSubmit = () => {
		isLoading = true;
		return async ({ result }) => {
			if (result.type === 'success' && result.data) {
				// @ts-expect-error
				todo = result.data;
			}
			isLoading = false;
		};
	};
</script>

<form
	class='card'
	bind:this={form}
	method='post'
	action='?/update'
	use:enhance={onSubmit}
>
	<label>
		<input
			type='checkbox'
			name='done'
			checked={todo.done}
			on:change={() => form.dispatchEvent(new Event('submit', { cancelable: true }))}
		/>
		Done
	</label>
	<label>
		Title
		<input
			name='title'
			type='text'
			value={todo.title}
			on:blur={() => form.dispatchEvent(new Event('submit', { cancelable: true }))}
			required
		/>
	</label>
	<label>
		Description
		<input
			name={'description'}
			type={'text'}
			value={todo.description || ''}
			on:blur={() => form.dispatchEvent(new Event('submit', { cancelable: true }))}
			required
		/>
	</label>
	<input type='hidden' name='id' value={todo.id} />
	{#if isLoading}
		<div class='loading-overlay' />
	{/if}
</form>
