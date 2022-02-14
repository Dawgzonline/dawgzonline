import React from "react";

const collection = [
  {
    heading: "DOG",
    image: "/dog.jpg",
    content: [
      {
        id: 1,
        title: "Food",
        nested: true,
        links: [{ title: "Wet food" }, { title: "Dry food" }],
      },
      {
        id: 2,
        title: "Treats",
        nested: true,
        links: [{ title: "Veg treats" }, { title: "Non-veg treats" }],
      },
      {
        id: 3,
        title: "Grooming",
        nested: true,
        links: [
          { title: "Shampoo" },
          { title: "Conditioner" },
          { title: "Grooming tools" },
        ],
      },
      { id: 4, title: "Toys", nested: false },
      { id: 5, title: "Accessories", nested: false },
      { id: 6, title: "Utilities", nested: false },
    ],
  },
  {
    heading: "CAT",
    image: "/cat.jpg",
    content: [
      {
        id: 1,
        title: "Food",
        nested: true,
        links: [{ title: "Wet food" }, { title: "Dry food" }],
      },
      {
        id: 2,
        title: "Treats",
        nested: true,
        links: [{ title: "Veg treats" }, { title: "Non-veg treats" }],
      },
      {
        id: 3,
        title: "Grooming",
        nested: true,
        links: [
          { title: "Shampoo" },
          { title: "Conditioner" },
          { title: "Grooming tools" },
        ],
      },
      { id: 4, title: "Toys", nested: false },
      { id: 5, title: "Accessories", nested: false },
      { id: 6, title: "Utilities", nested: false },
    ],
  },
];

const filter = [
  {
    name: "pet_type",
    title: "Pet Type",
    options: {
      list: [
        { title: "Dog", value: "dog" },
        { title: "Cat", value: "cat" },
      ], // <-- predefined values
    },
  },
  {
    name: "pet_age",
    title: "Pet Age",
    options: {
      list: [
        { title: "Puppy", value: "puppy" },
        { title: "Kitten", value: "kitten" },
        { title: "Adult", value: "Adult" },
      ], // <-- predefined values
    },
  },
  {
    name: "pet_size",
    title: "Pet Size",
    options: {
      list: [
        { title: "All breeds", value: "all_breeds" },
        { title: "Large breeds", value: "large_breeds" },
        { title: "Medium breeds", value: "medium_breeds" },
        { title: "Small breeds", value: "small_breeds" },
      ], // <-- predefined values
    },
  },
  {
    name: "food",
    title: "Food",
    options: {
      list: [
        { title: "Wet Food", value: "wet_food" },
        { title: "Dry Food", value: "dry_food" },
        { title: "Vegetarian", value: "vegetarian" },
        { title: "Non-vegetarian", value: "non_vegetarian" },
        { title: "Hypoallergenic", value: "hypoallergenic" },
        { title: "Weight Management", value: "weight_management" },
        { title: "Chicken Free", value: "chicken_free" },
      ], // <-- predefined values
    },
  },
  {
    name: "treats",
    title: "Treats",
    options: {
      list: [
        { title: "Vegetarian", value: "vegetarian" },
        { title: "Non-vegetarian", value: "non_vegetarian" },
        { title: "Jerky", value: "jerky" },
        { title: "Biscuits", value: "biscuits" },
        { title: "Dental", value: "dental" },
        { title: "Natural", value: "natural" },
        { title: "Grain free", value: "grain_free" },
      ], // <-- predefined values
    },
  },
  {
    name: "grooming",
    title: "Grooming",
    options: {
      list: [
        { title: "Shampoos", value: "shampoos" },
        { title: "Conditioners", value: "conditioners" },
        { title: "Grooming Tools", value: "grooming_tools" },
        {
          title: "Perfumes/Deodorants",
          value: "perfumes/deodorants",
        },
        { title: "Paw Care", value: "paw_care" },
        { title: "Tick/Flea Control", value: "tick/flea_control" },
        { title: "Detanging Products", value: "detanging_products" },
        { title: "Wipes/Towels", value: "wipes/towels" },
        { title: "Oral Care", value: "oral_care" },
        { title: "Odour Control", value: "odour_control" },
        { title: "Stain Control", value: "stain_control" },
        { title: "Skin/Coat Care", value: "skin/coat_care" },
        {
          title: "Medicines/Suppliments",
          value: "medicines/suppliments",
        },
      ], // <-- predefined values
    },
  },
  {
    name: "toys",
    title: "Toys",
    options: {
      list: [
        { title: "Chewers", value: "chewers" },
        { title: "Squeakers", value: "squeakers" },
        { title: "Interact and play", value: "interact_and_play" },
        { title: "Fetch toys", value: "fetch_toys" },
        { title: "Rope toys", value: "rope_toys" },
        { title: "Tug toys", value: "tug_toys" },
      ], // <-- predefined values
    },
  },
  {
    name: "accessories",
    title: "Accessories",
    options: {
      list: [
        { title: "Collars", value: "collars" },
        { title: "Leashes", value: "leashes" },
        { title: "Harnesses", value: "harnesses" },
        { title: "Collar & leash sets", value: "collar&leash_sets" },
        { title: "Bow ties", value: "bow_ties" },
        { title: "Bandanas", value: "bandanas" },
        { title: "Paw shoes & socks", value: "paw_shoes&socks" },
        { title: "Name tags", value: "name_tags" },
        { title: "Collar inserts", value: "collar_inserts" },
        { title: "Clothing", value: "clothing" },
        { title: "Raincoats", value: "raincoats" },
        { title: "Party accessories", value: "party_accessories" },
      ], // <-- predefined values
    },
  },
  {
    name: "utilities",
    title: "Utilities",
    options: {
      list: [
        {
          title: "Bowls, Diners & Food Mats",
          value: "bowls,diners&food_mats",
        },
        { title: "Crates & Carriers", value: "crates&carriers" },
        { title: "Travel gear", value: "travel_gear" },
        { title: "Pens & Barries", value: "pens&barries" },
        { title: "Ramp/Steps", value: "ramp/steps" },
        { title: "Bedding", value: "bedding" },
        { title: "Waste disposal", value: "waste_disposal" },
        {
          title: "Training Pads & diapers",
          value: "training_pads&diapers",
        },
        { title: "Agility training", value: "agility_training" },
        { title: "Sanitisers", value: "sanitisers" },
      ], // <-- predefined values
    },
  },
];

export const AppStateContext = React.createContext({ collection, filter });

export default function AppstateProvider({ children }) {
  const value = {
    collection,
    filter
  };

  return (
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  );
}
