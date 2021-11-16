export default interface IPackage {
	countryFrom: string,
	countryTo: string,
	packages: {
		width: number | null,
		weight: number | null,
		length: number | null,
		height: number | null
	}[]
}