// This file holds the mock data for the app
var appData = {
    users: [
        {
            id: 1,
            fullName: "Alice Meeney",
            userName: "Alice",
            email: "alice@meeney.com",
            imageId: 6
        },
        {
            id: 2,
            fullName: "Bob Swah",
            userName: "Bob",
            email: "bob@swah.me",
            imageId: 9
        },
        {
            id: 3,
            fullName: "Carol Meeney",
            userName: "Carol",
            email: "carol@meeney.com",
            imageId: 15
        },
        {
            id: 4,
            fullName: "Sam Jaal",
            userName: "Sam",
            email: "sam@jaal.com",
            imageId: 44
        },
        {
            id: 5,
            fullName: "David Zohl",
            userName: "David",
            email: "david@mzohl.com",
            imageId: 156
        },
    ],
    activeUser: 4,
    lists: [
        {
            id: 1,
            title: "Groceries",
            description: "Items that need to be bought from the local super markets.",
            collaborators: [ 1, 2, 4 ],
            items: [
                {
                    id: 1,
                    text: "Milk",
                    bought: false,
                    assignee: 2,
                    comments: []
                },
                {
                    id: 2,
                    text: "Bread",
                    bought: true,
                    assignee: 2,
                    comments: []
                },
                {
                    id: 3,
                    text: "Tomatoes",
                    bought: false,
                    assignee: 2,
                    comments: []
                }
            ],
        },
        {
            id: 2,
            title: "Hardware",
            description: "Items that need to be bought from a hardware store.",
            collaborators: [ 4, 5, 3 ],
            items: [
                {
                    id: 1,
                    text: "9\" nails",
                    bought: false,
                    assignee: null,
                    comments: []
                },
                {
                    id: 2,
                    text: "Kid hammer",
                    bought: true,
                    assignee: 2,
                    comments: []
                }
            ],
        },
        {
            id: 3,
            title: "Pharmacy",
            description: "Items that need to be bought from a pharmacy.",
            collaborators: [ 5, 3 ],
            items: [
                {
                    id: 1,
                    text: "Pain killers",
                    bought: false,
                    assignee: null,
                    comments: []
                },
                {
                    id: 2,
                    text: "Vitamin D",
                    bought: false,
                    assignee: 4,
                    comments: []
                },
                {
                    id: 3,
                    text: "Body lotion",
                    bought: false,
                    assignee: 1,
                    comments: []
                },
                {
                    id: 4,
                    text: "Citrid acid",
                    bought: false,
                    assignee: 1,
                    comments: []
                }
            ],
        },
        {
            id: 4,
            title: "Clothing store",
            description: "Clothes",
            collaborators: [ 4 ],
            items: [
                {
                    id: 1,
                    text: "Mens underpants, size M",
                    bought: false,
                    assignee: 2,
                    comments: []
                },
                {
                    id: 2,
                    text: "Hat for the holiday",
                    bought: true,
                    assignee: 1,
                    comments: []
                }
            ],
        },
        {
            id: 5,
            title: "Liquir store",
            description: "Items that need to be bought from a liquir store.",
            collaborators: [ 4, 3 ],
            items: [
                {
                    id: 1,
                    text: "Red wine for pasta",
                    bought: false,
                    assignee: 4,
                    comments: []
                },
                {
                    id: 2,
                    text: "White wine for party",
                    bought: true,
                    assignee: 2,
                    comments: []
                }
            ],
        },
    ],
    images: [
        { id: 6,  name: "alice.jpg" },
        { id: 9,  name: "bob.jpg" },
        { id: 15,  name: "carol.jpg" },
        { id: 44,  name: "sam.jpg" },
        { id: 156,  name: "david.jpg" },
    ]
}