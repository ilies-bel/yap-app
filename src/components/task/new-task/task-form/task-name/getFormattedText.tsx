// Create an HTML string with underlined words
export function getFormattedText(text: string, wordsToUnderline: string[]): string {
    if (!text) return '';
    if (wordsToUnderline.length === 0) return text;

    // Create regex pattern for word matches
    const pattern = wordsToUnderline
        .map(word => word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
        .join('|');
    const regex = new RegExp(`\\b(${pattern})\\b`, 'gi');

    // Replace matches with underlined spans
    let lastIndex = 0;
    let result = '';
    let match: RegExpExecArray | null;

    // Reset regex lastIndex
    regex.lastIndex = 0;

    // Find all matches and build HTML
    while ((match = regex.exec(text)) !== null) {
        // Add text before match
        result += text.substring(lastIndex, match.index);

        // Add match with underline
        result += `<span style="text-decoration: underline; text-decoration-color: blue; text-decoration-thickness: 2px;">${match[0]}</span>`;

        lastIndex = regex.lastIndex;
    }

    // Add remaining text
    if (lastIndex < text.length) {
        result += text.substring(lastIndex);
    }

    return result;
}