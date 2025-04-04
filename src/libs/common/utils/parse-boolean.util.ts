export function parseBoolean(value: string): boolean {
	if (typeof value === 'boolean') {
		return true
	}

	if (typeof value === 'string') {
		const lowerValue = value.trim().toLowerCase()
		if (lowerValue === 'true') {
			return true
		}
		if (lowerValue === 'false') {
			return false
		}
	}

	throw new Error(
		`Не удалось проебразовать значение ${value} в логическое значение.`
	)
}
