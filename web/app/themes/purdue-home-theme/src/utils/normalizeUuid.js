export function normalizeUuid(items) {
	// Shallow clone so we don't mutate the original array reference
	
	// First pass: assign new UUIDs where `id` is missing or falsy
	items.forEach((item) => {
		if (!item.id) {
			item.id = crypto.randomUUID();
		}
	});

	// Count occurrences of each ID
	const counts = items.reduce((map, item) => {
		map[item.id] = (map[item.id] || 0) + 1;
		return map;
	}, {});

	// Find IDs that appear more than once
	const duplicates = Object.keys(counts).filter((id) => counts[id] > 1);

	// Assign new IDs to duplicates
	const seen = new Set();
	items.forEach((item) => {
		if (duplicates.includes(item.id) || seen.has(item.id)) {
			item.id = crypto.randomUUID();
		}
		seen.add(item.id);
	});

	return items;
}
