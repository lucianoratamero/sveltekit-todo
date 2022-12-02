import db from '../../prisma/db';
import Filter from 'bad-words';

const filter = new Filter();

const cleanData = (validatedData) => {
	validatedData.title = filter.clean(validatedData.title);
	if (validatedData.description) {
		validatedData.description = filter.clean(validatedData.description || "");
	}
	return validatedData;
}
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
		// @ts-expect-error
		data.done = data.done === 'on';
		// @ts-expect-error
		return await db.todo.create({ data: cleanData(data) });
	},
	update: async ({ request }) => {
		/** @type {TodoFormData} */
		let data = Object.fromEntries(await request.formData());
		const { id } = data;
		delete data.id;

		// @ts-expect-error
		data.done = data.done === 'on';

		return await db.todo.update({
			where: { id: parseInt(id || '') },
			data: cleanData(data)
		});
	}
};
