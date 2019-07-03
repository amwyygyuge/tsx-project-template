export type Result = React.ReactElement[]
export type router = {
	name: string
	icon: string
	to: string
	path: string
	Component: React.ComponentClass
	Layout?: React.ComponentClass
	children?: router[]
}
