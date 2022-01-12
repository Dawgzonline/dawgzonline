import React from 'react';

const collection = [
    {
    heading: "DOG",
    content: [
        {
        id : 1,
        title: "Food",
        nested: true,
        links: [{ title: "Wet food" }, { title: "Dry food" }],
        },
        {
        id : 2,
        title: "Treats",
        nested: true,
        links: [{ title: "Veg treats" }, { title: "Non-veg treats" }],
        },
        {
        id : 3,
        title: "Grooming",
        nested: true,
        links: [
            { title: "Shampoo" },
            { title: "Conditioner" },
            { title: "Grooming tools" },
        ],
        },
        { id : 4, title: "Toys", nested: false },
        { id : 5, title: "Accessories", nested: false },
        { id : 6, title: "Utilities", nested: false },
    ],
    },
    {
    heading: "CAT",
    content: [
        {
        id : 1,
        title: "Food",
        nested: true,
        links: [{ title: "Wet food" }, { title: "Dry food" }],
        },
        {
        id : 2,
        title: "Treats",
        nested: true,
        links: [{ title: "Veg treats" }, { title: "Non-veg treats" }],
        },
        {
        id : 3,
        title: "Grooming",
        nested: true,
        links: [
            { title: "Shampoo" },
            { title: "Conditioner" },
            { title: "Grooming tools" },
        ],
        },
        { id : 4, title: "Toys", nested: false },
        { id : 5, title: "Accessories", nested: false },
        { id : 6, title: "Utilities", nested: false },
    ],
    },
];

export const AppStateContext = React.createContext({collection});

export default function AppstateProvider({children}) {

    const value = {
        collection,
    }

    return (
        <AppStateContext.Provider value={value}>
            {children}
        </AppStateContext.Provider>
    )
}
