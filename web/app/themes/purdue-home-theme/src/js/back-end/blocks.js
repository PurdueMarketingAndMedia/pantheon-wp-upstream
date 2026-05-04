import { select } from '@wordpress/data';

export function isBlockIdReserved(blockId, clientId) {
	const blocksClientIds = select('core/block-editor').getClientIdsWithDescendants();
	return blocksClientIds.some((_clientId) => {
		const { blockId: _blockId } = select('core/block-editor').getBlockAttributes(_clientId);
		return clientId !== _clientId && blockId === _blockId;
	});
};