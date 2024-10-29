async function loadDictionary() {
    const response = await fetch('dict.txt');
    const text = await response.text();
    const lines = text.trim().split('\n');
    const dictionary = {};

    lines.forEach(line => {
        const parts = line.split(';');
        if (parts.length === 4) {
            const word = parts[0];
            const antonyms = parts[1].split(', ');
            const synonyms = parts[2].split(', ');
            const definition = parts[3];
            dictionary[word] = {
                antonyms: antonyms,
                synonyms: synonyms,
                definition: definition
            };
        }
    });
    
    return dictionary;
}

async function searchWord() {
    const wordInput = document.getElementById('wordInput').value.trim();
    const resultDiv = document.getElementById('result');

    if (!wordInput) {
        resultDiv.innerHTML = '<p>Please enter a word.</p>';
        return;
    }

    const dictionary = await loadDictionary();
    const entry = dictionary[wordInput];

    if (entry) {
        resultDiv.innerHTML = `
            <h3>${wordInput}</h3>
            <p><strong>Definition:</strong> ${entry.definition}</p>
            <p><strong>Synonyms:</strong> ${entry.synonyms.join(', ')}</p>
            <p><strong>Antonyms:</strong> ${entry.antonyms.join(', ')}</p>
        `;
    } else {
        resultDiv.innerHTML = `<p>Sorry, the word '${wordInput}' is not in the dictionary.</p>`;
    }
}
