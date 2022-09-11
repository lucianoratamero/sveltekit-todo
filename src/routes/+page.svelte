<script>
	import { enhance } from '$app/forms';
	import Todo from './Todo.svelte';

	/** @type {import('./$types').PageData} */
	export let data;

	let isLoading = false;

	const onSubmit = () => {
		isLoading = true;
		return async ({ result }) => {
			if (result.type === 'success' && result.data) {
				// @ts-expect-error
				data.todos = [...data.todos, result.data];
			}
			isLoading = false;
		};
	};
</script>

<h1 class='title'>SvelteKit Todo App</h1>

<form
	class='card'
	method='post'
	action='?/create'
	use:enhance={onSubmit}
>
	<label>
		Title
		<input name='title' type='text' required />
	</label>
	<label>
		Description
		<input name='description' type='text' required />
	</label>
	<label>
		<input name='done' type='checkbox' />
		Done
	</label>
	<button disabled={isLoading} type='submit'>Save</button>
</form>

<div class='grid'>
	{#each data.todos as todo}
		<Todo bind:todo />
	{/each}
</div>
