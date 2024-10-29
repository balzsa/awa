import os

def load_dictionary(file_path):
    dictionary = {}
    with open(file_path, 'r') as file:
        for line in file:
            parts = line.strip().split(';')
            if len(parts) == 4:
                word, antonyms, synonyms, definition = parts
                dictionary[word] = {
                    'antonyms': antonyms.split(', '),
                    'synonyms': synonyms.split(', '),
                    'definition': definition
                }
    return dictionary

def main():
    dict_file = 'dict.txt'
    
    if not os.path.exists(dict_file):
        print("Dictionary file not found. Please make sure 'dict.txt' exists.")
        return
    
    dictionary = load_dictionary(dict_file)
    
    print("Welcome to the Automated Word Assistant (AWA)!")
    print("Type 'exit' to quit.")
    
    while True:
        word = input("Enter a word: ").strip()
        if word.lower() == 'exit':
            print("Goodbye!")
            break
        
        entry = dictionary.get(word)
        if entry:
            print(f"Word: {word}")
            print(f"Definition: {entry['definition']}")
            print(f"Synonyms: {', '.join(entry['synonyms'])}")
            print(f"Antonyms: {', '.join(entry['antonyms'])}")
        else:
            print(f"Sorry, the word '{word}' is not in the dictionary.")

if __name__ == "__main__":
    main()
