import inquirer from 'inquirer'
import { PromptType } from './prompt.types'

export class PromptService {
	private static instance: PromptService

	private constructor() {}

	public async input<T>(message: string, type: PromptType) {
		const { result } = await inquirer.prompt<{ result: T }>([
			{
				type,
				name: 'result',
				message,
			},
		])
		return result
	}

	static create() {
		if (!PromptService.instance) {
			PromptService.instance = new PromptService()
		}
		return PromptService.instance
	}
}
