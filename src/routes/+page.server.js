import db from '../../prisma/db';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	return { todos: await db.todo.findMany() };
}

/**
 * @typedef {{id?: string}} FormData
 */

/**
 * @typedef {Partial<import('@prisma/client').Todo> & FormData} TodoFormData
 */

/** @type {import('./$types').Actions} */
export const actions = {
	create: async ({ request }) => {
		/** @type {TodoFormData} */
		let data = Object.fromEntries(await request.formData());

		// @ts-ignore
		data.done = data.done === 'on';
		return await db.todo.create({ data });
	},
	update: async ({ request }) => {
		/** @type {TodoFormData} */
		let data = Object.fromEntries(await request.formData());
		const { id } = data;
		delete data.id;

		// @ts-ignore
		data.done = data.done === 'on';

		return await db.todo.update({
			where: { id: parseInt(id || '') },
			data
		});
	}
};
