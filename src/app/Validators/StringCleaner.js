class StringCleaner {
    RemoveEspecialCharacters(texto) {
        return texto
        .replace('&', 'e')
        .replace('º', '')
        .replace('ª', '')
        .replace('�', '')
        .replace('ç', 'c');
    }
}

module.exports = new StringCleaner();