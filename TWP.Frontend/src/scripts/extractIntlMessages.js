const fs = require("fs");
const path = require("path");

const baseSearchDirectoryPath = path.join(__dirname, "..", "features");
const intlDirectoryPath = path.join(__dirname, "..", "intl");
const translationsDirectoryName = "translations";
const locales = ["pl", "en"];

const getTranslationFiles = (directoryPath) => {
    let translationFilePaths = [];

    if (directoryPath.includes(translationsDirectoryName)) {
        translationFilePaths.push(path.join(directoryPath, "index.ts"));
    } else {
        fs.readdirSync(directoryPath)
            .filter((element) => fs.lstatSync(path.join(directoryPath, element)).isDirectory())
            .map(
                (directory) =>
                    (translationFilePaths = translationFilePaths.concat(
                        getTranslationFiles(path.join(directoryPath, directory))
                    ))
            );
    }

    return translationFilePaths;
};

const getTranslationIdsFromFile = (filePath) => {
    const file = fs.readFileSync(filePath, { encoding: "utf8" }).replace(/[ \r\n\t]+/g, "");
    const idMatches = [...file.matchAll(/[a-zA-Z0-9_-]+:"([^,.]+)"/g)];
    const ids = idMatches.map((match) => match[1]).filter((id) => !!id);

    return ids;
};

const getExistingMessages = (locale) => {
    const file = fs.readFileSync(path.join(intlDirectoryPath, `${locale}.json`), { encoding: "utf8" });
    const idMatches = [...file.matchAll(/"([a-zA-Z_0-9-]+)": "(.*)"/g)];
    const ids = idMatches.map((match) => ({ id: match[1], message: match[2] }));

    return ids;
};

const translationFilePaths = getTranslationFiles(baseSearchDirectoryPath);
const translationIds = [].concat(...translationFilePaths.map((path) => getTranslationIdsFromFile(path)));

for (const locale of locales) {
    const existingMessages = getExistingMessages(locale);
    const existingMessageIds = existingMessages.map((message) => message.id);
    const addedIds = [];
    const removedIds = [];

    for (const translationId of existingMessageIds) {
        if (!translationIds.includes(translationId)) {
            const indexOfMessageToRemove = existingMessages.indexOf(
                existingMessages.find((message) => message.id === translationId)
            );

            if (indexOfMessageToRemove >= 0) {
                existingMessages.splice(indexOfMessageToRemove, 1);
                removedIds.push(translationId);
            }
        }
    }

    for (const translationId of translationIds) {
        if (!existingMessages.map((message) => message.id).includes(translationId)) {
            existingMessages.push({ id: translationId, message: "" });
            addedIds.push(translationId);
        }
    }

    if (addedIds.length || removedIds.length) {
        console.log(`\n${locale}`);

        if (removedIds.length) {
            console.log(`  Removed ${removedIds.length} translations:`);
            removedIds.map((id) => console.log(`    ${id}`));
        }

        if (addedIds.length) {
            console.log(`  Added ${addedIds.length} empty translations:`);
            addedIds.map((id) => console.log(`    ${id}`));
        }
    }

    fs.writeFileSync(
        path.join(intlDirectoryPath, `${locale}.json`),
        `{\n${existingMessages
            .sort((a, b) => (a.id > b.id ? 1 : -1))
            .map((message) => `    "${message.id}": "${message.message}"`)
            .join(",\n")}\n}`
    );
}
