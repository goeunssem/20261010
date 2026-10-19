// Web Speech API text-to-speech for reading words and stories aloud

class SpeechHelper {
  private isSpeaking: boolean = false;

  public speak(text: string, onEnd?: () => void) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      if (onEnd) onEnd();
      return;
    }

    try {
      window.speechSynthesis.cancel(); // Stop ongoing speech

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ko-KR';
      utterance.rate = 0.95; // slightly slower, clear for 3-4th graders
      utterance.pitch = 1.05; // warm, friendly tone

      // Try to select a Korean voice if available
      const voices = window.speechSynthesis.getVoices();
      const koreanVoice = voices.find((v) => v.lang.startsWith('ko'));
      if (koreanVoice) {
        utterance.voice = koreanVoice;
      }

      utterance.onstart = () => {
        this.isSpeaking = true;
      };

      utterance.onend = () => {
        this.isSpeaking = false;
        if (onEnd) onEnd();
      };

      utterance.onerror = () => {
        this.isSpeaking = false;
        if (onEnd) onEnd();
      };

      window.speechSynthesis.speak(utterance);
    } catch {
      this.isSpeaking = false;
      if (onEnd) onEnd();
    }
  }

  public stop() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      this.isSpeaking = false;
    }
  }

  public getSpeaking(): boolean {
    return this.isSpeaking;
  }
}

export const speech = new SpeechHelper();
