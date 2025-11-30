class TrieNode {
    constructor() {
        this.children = {};
        this.isEndOfWord = false;
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode();
    }

    insert(word) {
        let node = this.root;
        for (let char of word) {
            if (!node.children[char]) {
                node.children[char] = new TrieNode();
            }
            node = node.children[char];
        }
        node.isEndOfWord = true;
    }

    searchPrefix(prefix) {
        let node = this.root;
        for (let char of prefix) {
            if (!node.children[char]) {
                return null;
            }
            node = node.children[char];
        }
        return node;
    }

    autoComplete(prefix) {
        let node = this.searchPrefix(prefix);
        if (!node) return [];
        let results = [];
        this.collectAllWords(node, prefix, results);
        return results;
    }

    collectAllWords(node, prefix, results) {
        if (node.isEndOfWord) {
            results.push(prefix);
        }
        for (let char in node.children) {
            this.collectAllWords(node.children[char], prefix + char, results);
        }
    }
}

const trie = new Trie();
const words = [
    "the", "be", "to", "of", "and", "a", "in", "that", "have", "it",
    "you", "he", "at", "or", "by", "this", "but", "not", "all", "she",
    "they", "we", "say", "his", "from", "what", "there", "out", "up",
    "if", "about", "who", "get", "which", "go", "when", "make", "can",
    "like", "time", "no", "just", "him", "know", "take", "people",
    "into", "year", "your", "good", "some", "could", "them", "see",
    "other", "than", "then", "now", "look", "only", "come", "its",
    "over", "think", "also", "back", "after", "use", "two", "how",
    "our", "work", "first", "well", "way", "even", "new", "want",
    "because", "any", "these", "give", "day", "most", "us", "such",
    "here", "between", "own", "both", "an", "would", "still", "few",
    "same", "while", "those", "through", "life", "may", "where",
    "down", "little", "each", "man", "my", "great", "old", "tell",
    "why", "hand", "house", "high", "thing", "end", "different",
    "begin", "next", "part", "try", "place", "might", "long", "real",
    "should", "ask", "last", "point", "seem", "much", "keep", "home",
    "need", "talk", "leave", "call", "problem", "against", "under",
    "right", "find", "turn", "better", "start", "city", "school",
    "night", "side", "family", "face", "road", "word", "move", "ever",
    "big", "bring", "group", "very", "head", "again", "read", "number",
    "speak", "live", "eat", "stop", "stay", "left", "every", "become",
    "important", "run", "never", "together", "three", "put", "feel",
    "most", "many", "way", "young", "eye", "woman", "child", "world",
    "state", "student", "group", "country", "problem", "hand", "part",
    "place", "case", "week", "company", "system", "program", "question",
    "work", "government", "number", "night", "point", "home", "water",
    "room", "mother", "area", "money", "story", "fact", "month", "lot",
    "right", "study", "book", "eye", "job", "word", "business", "issue",
    "side", "kind", "head", "house", "service", "friend", "father",
    "power", "hour", "game", "line", "end", "member", "law", "car",
    "city", "community", "name", "president", "team", "minute", "idea",
    "kid", "body", "information", "back", "parent", "face", "others",
    "level", "office", "door", "health", "person", "art", "war",
    "history", "party", "result", "change", "morning", "reason",
    "research", "girl", "guy", "moment", "air", "teacher", "force",
    "education"
];
words.forEach(word => trie.insert(word));

function showSuggestions() {
    const inputField = document.getElementById('search-input');
    const input = inputField.value;
    const suggestionsBox = document.getElementById('suggestions');
    suggestionsBox.innerHTML = '';  

    const words = input.trim().split(/\s+/); 
    const currentWord = words[words.length - 1].toLowerCase(); 

    if (currentWord.length === 0) return; 

    const suggestions = trie.autoComplete(currentWord);

    suggestions.forEach(suggestion => {
        const li = document.createElement('li');
        li.textContent = suggestion;
        li.addEventListener('click', () => {
            words[words.length - 1] = suggestion;
            inputField.value = words.join(' ') + ' ';
            inputField.focus();
            inputField.setSelectionRange(inputField.value.length, inputField.value.length);
            suggestionsBox.innerHTML = '';
        });
        
        suggestionsBox.appendChild(li);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('search-input').addEventListener('input', showSuggestions);
});
