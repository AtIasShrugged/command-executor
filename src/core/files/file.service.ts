import { dirname, isAbsolute, join } from 'path'
import { promises } from 'fs'
import { FilePathDTO } from './file.types'

export class FileService {
	private static instance: FileService

	private constructor() {}

	private async isExist(path: string) {
		try {
			await promises.stat(path)
			return true
		} catch {
			return false
		}
	}

	public getFilePath(filePathDTO: FilePathDTO) {
		let { path, name, ext } = filePathDTO

		if (!isAbsolute(path)) {
			path = join(__dirname + '/' + path)
		}

		return join(dirname(path) + '/' + name + '.' + ext)
	}

	async deleteFileIfExists(path: string) {
		if (await this.isExist(path)) {
			promises.unlink(path)
		}
	}

	static create() {
		if (!FileService.instance) {
			FileService.instance = new FileService()
		}
		return FileService.instance
	}
}
