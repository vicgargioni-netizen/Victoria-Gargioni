
import { GoogleGenAI } from "@google/genai";

export async function getScoutMasterAdvice(context: string, lastAction: string): Promise<string> {
  // Always initialize with the named parameter apiKey
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Você é o Instrutor de Campo de um treinamento de escoteiros de elite.
                 O jogador está imerso em uma floresta 3D.
                 Contexto atual: ${context}. 
                 Ação realizada: ${lastAction}.

                 Sua tarefa: Forneça um feedback imersivo de UM parágrafo curto. 
                 REGRAS:
                 1. Use descrições sensoriais (sons de galhos, cheiro de musgo, vento no rosto).
                 2. Mantenha o tom de um veterano de trilhas que ama a natureza.
                 3. Se a ação foi correta, encoraje com sabedoria. Se foi errada, advirta sobre os perigos da mata de forma realista.
                 4. Use no máximo 45 palavras.`,
      config: {
        temperature: 0.9,
        // Removed maxOutputTokens to follow guidelines: avoid setting it if not required to prevent responses from being blocked.
      }
    });
    // Extract text from the property .text (not a method call)
    return response.text || "O silêncio da floresta guarda segredos. Mantenha os olhos atentos a cada sinal de pista.";
  } catch (error) {
    console.error("Gemini error:", error);
    return "Sinta o vento, Recruta. Ele te dirá para onde ir.";
  }
}
