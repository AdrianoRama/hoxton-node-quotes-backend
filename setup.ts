import Database from 'better-sqlite3'

const db = new Database('./data.db', {
    verbose: console.log
})

type Quotes = {
    id: number
    author: string
    quote: string
    image: string
    age: string
}

const createQuotes = db.prepare(`
CREATE TABLE IF NOT EXISTS quotes (
    id INTEGER,
    author TEXT,
    quote TEXT,
    image INTEGER,
    age TEXT,
    PRIMARY KEY (id)
    );
    `)

createQuotes.run()

const createQuote = db.prepare(`
INSERT INTO quotes (author, quote, image, age) VALUES (?, ?, ?, ?);
`)


const deleteAllQuotes = db.prepare(`
DELETE FROM quotes;
`)

deleteAllQuotes.run()

let quotes: Quotes[] = [
    {
        id: 1,
        author: "Betty White",
        quote: `My mother always used to say: The older you get, the better you get, unless you’re a banana.`,
        image: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/gettyimages-71599564-1547664650.jpg",
        age: "99 years old"
    },
    {
        id: 2,
        author: "Will Ferrell",
        quote: `Before you marry a person, you should first make them use a computer with slow Internet to see who they really are.`,
        image: "https://www.rollingstone.com/wp-content/uploads/2018/06/rs-20215-ferrell-1800-1403272081.jpg",
        age: "54 years old"
    },
    {
        id: 3,
        author: "Anonymous",
        quote: `I walk around like everything’s fine, but deep down, inside my shoe, my sock is sliding off.`,
        image: "https://t3.ftcdn.net/jpg/03/12/97/58/360_F_312975893_Ai1aMm0vuZu65xJ1PaaDwOmnrPqXTfLT.jpg",
        age: "Unknown"
    },
    {
        id: 4,
        author: "Jimmy Kimmel",
        quote: `I never feel more alone than when I’m trying to put sunscreen on my back.`,
        image: "https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTQxNTQwMDQ4MDkxNzUyMTg3/jimmy_kimmel_photo_by_jason_kempinp_getty_images_161035657jpg.jpg",
        age: "54 years old"
    },
    {
        id: 5,
        author: "Anonymous",
        quote: `Common sense is like deodorant. The people who need it most never use it.`,
        image: "https://t3.ftcdn.net/jpg/03/12/97/58/360_F_312975893_Ai1aMm0vuZu65xJ1PaaDwOmnrPqXTfLT.jpg",
        age: "Unknown"
    },
    {
        id: 6,
        author: "Vince Vaughn",
        quote: `Never do anything out of hunger. Not even eating.`,
        image: "https://www.hollywoodreporter.com/wp-content/uploads/2018/09/gettyimages-1026482098-h_2018.jpg",
        age: "51 years old"
    },
    {
        id: 7,
        author: "Ellen DeGeneres",
        quote: `Accept who you are. Unless you’re a serial killer.`,
        image: "https://parade.com/wp-content/uploads/2020/07/ellen-degeneres-removebg.png",
        age: "64 years old"
    },
    {
        id: 8,
        author: "Bob Hope",
        quote: `I grew up with six brothers. That’s how I learned to dance: waiting for the bathroom.`,
        image: "https://pagesix.com/wp-content/uploads/sites/3/2021/04/bob-hope.jpg",
        age: "100 years old"
    },
    {
        id: 9,
        author: "Grumpy Cat",
        quote: `Woke up today. It was terrible.`,
        image: "https://i.pinimg.com/originals/32/58/3e/32583ee329691781a40faee1a6426906.jpg",
        age: "7 years old"
    }
]

for (const quote of quotes) {
    createQuote.run(quote.author, quote.quote, quote.image, quote.age)
}