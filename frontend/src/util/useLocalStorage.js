import React from "react"

function useLocalState (defaultValue, key) {
    const [value, setValue] = React.useState(() => {
        const localStorageValue = localStorage.getItem(key);

        return localStorageValue !== null ? JSON.parse(localStorageValue) : defaultValue;
    });

    React.useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
}

export {useLocalState}