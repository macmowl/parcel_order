export default interface IPackage {
	countryFrom: string,
	countryTo: string,
	packages: {
		width: number,
		weight: number,
		length: number,
		height: number
	}[]
}