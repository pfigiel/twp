export const numberToPixels = (value: number) => `${value}px`;

export const createBemGenerator = (block: string) => (element?: string, modifier?: string) =>
    `${block}${element ? `__${element}` : ""}${modifier ? `--${modifier}` : ""}`;

export const mapObjectToQueryParameters = <T extends unknown>(object: T) => {
    let query = "";

    for (const property in object) {
        query += `&${property}=${object[property]}`;
    }

    if (query.length) {
        query = `?${query.substring(1, query.length)}`;
    }

    return query;
};
