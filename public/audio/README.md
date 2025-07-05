# Audio Files for Audio Guide

This directory contains audio files for the Nuanu Creative City audio guide system.

## File Structure

- `bamboo-pavilion-en.mp3` - English audio guide for Bamboo Pavilion
- `bamboo-pavilion-ru.mp3` - Russian audio guide for Bamboo Pavilion  
- `ceramic-garden-en.mp3` - English audio guide for Ceramic Sculpture Garden
- `ceramic-garden-ru.mp3` - Russian audio guide for Ceramic Sculpture Garden

## Audio Requirements

- **Format**: MP3 (recommended) or WAV
- **Quality**: 128kbps or higher
- **Duration**: 2-5 minutes per guide
- **Language**: Clear pronunciation with natural pauses
- **Content**: Should match the transcript data in `/lib/audio-guide-data.ts`

## Adding New Audio Files

1. Record or generate audio using TTS services like:
   - Google Cloud Text-to-Speech
   - Amazon Polly
   - Azure Cognitive Services Speech
   - ElevenLabs (for natural voices)

2. Name files using the pattern: `{object-slug}-{language-code}.mp3`

3. Update the audio URL in the corresponding data file

4. Ensure transcript timing matches the actual audio duration

## TTS Generation Example

For quick testing, you can use online TTS services:
- Google Translate TTS
- Natural Reader
- Speechify

## Production Notes

- For production, use professional voice actors or high-quality TTS
- Ensure audio files are optimized for web delivery
- Consider providing multiple language options
- Include proper metadata (title, description, language) 