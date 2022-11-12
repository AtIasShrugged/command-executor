import { FfmpegExecutor } from './core/executor/ffmpeg.executor'
import { ConsoleLogger } from './out/console-logger/console-logger'

export class App {
	async run() {
		new FfmpegExecutor(ConsoleLogger.create()).execute()
	}
}

const app = new App()
app.run()
