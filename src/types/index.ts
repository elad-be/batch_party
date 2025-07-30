export interface Question {
  id: number;
  question: string;
  answered: boolean;
  answered_text?: string;
  answered_audio_path?: string;
}

export interface ApiResponse {
  questions: Question[];
  status?: string;
  error?: string;
}
