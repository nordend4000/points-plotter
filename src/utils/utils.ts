// HELPER FUNCTION TO UPDATE STORE AT A PARTICULAR INDEX WITH A NEW ARRAY type : number[][]
export const updateStore = (
	store: number[][][],
	newArray: number[][],
	id: number,
) => {
	const shallowCopyStore = [...store]
	shallowCopyStore.splice(id, 1, newArray)
	return shallowCopyStore
}
