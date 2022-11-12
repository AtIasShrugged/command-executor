import { ChildProcessWithoutNullStreams, spawn } from 'child_process'
import { FfmpegBuilder } from '../../commands/ffmpeg/ffmpeg.builder'
import { FileService } from '../files/file.service'
import { IStreamLogger } from '../handlers/stream-logger.interface'
import { StreamHandler } from '../handlers/stream.handler'
import { PromptService } from '../prompt/prompt.service'
import { CommandExecutor } from './command.executor'
import { ICommandExecFfmpeg, IFfmpegInput } from './ffmpeg.types'

export class FfmpegExecutor extends CommandExecutor<IFfmpegInput> {
	private fileService = FileService.create()
	private promptService = PromptService.create()

	protected override async prompt(): Promise<IFfmpegInput> {
		const width = await this.promptService.input<number>('Width:', 'number')
		const height = await this.promptService.input<number>('Height:', 'number')
		const path = await this.promptService.input<string>('File path:', 'input')
		const name = await this.promptService.input<string>('File name:', 'input')

		return { width, height, path, name }
	}

	protected override build(input: IFfmpegInput): ICommandExecFfmpeg {
		const { width, height, path, name } = input
		const output = this.fileService.getFilePath({ path, name, ext: 'mp4' })
		const args = new FfmpegBuilder().input(path).setVideoSize(width, height).output(output)
		return { command: 'ffmpeg', args, output }
	}

	protected override spawn({
		command,
		output,
		args,
	}: ICommandExecFfmpeg): ChildProcessWithoutNullStreams {
		this.fileService.deleteFileIfExists(output)
		return spawn(command, args)
	}

	protected override processStream(
		stream: ChildProcessWithoutNullStreams,
		logger: IStreamLogger
	): void {
		const handler = new StreamHandler(logger)
		handler.processOutput(stream)
	}
}
