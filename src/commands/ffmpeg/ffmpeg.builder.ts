export class FfmpegBuilder {
	private inputPath: string = './'
	private options: Map<string, string> = new Map()

	constructor() {
		this.options.set('-c:v', 'libx264')
	}

	input(inputPath: string) {
		if (inputPath) this.inputPath = inputPath
		return this
	}

	setVideoSize(width: number, height: number) {
		if (width && height) this.options.set('-s', `${width}x${height}`)
		return this
	}

	output(outputPath: string) {
		if (!this.inputPath) throw new Error('The input parameter is not set!')

		const args: string[] = ['-i', this.inputPath]

		this.options.forEach((val, key) => {
			if (!val) throw new Error(`The ${key} parameter is not set!`)

			args.push(key)
			args.push(val)
		})

		args.push(outputPath)
		return args
	}
}
