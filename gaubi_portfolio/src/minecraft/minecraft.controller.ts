import { Controller, Get } from '@nestjs/common';

@Controller('minecraft')
export class MinecraftController {
    @Get("/quizzes")
    allQuizzes(): string {
        return "All minecraft quizzes"
    }
}
