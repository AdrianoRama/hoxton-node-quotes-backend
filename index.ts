import express from "express";
import cors from "cors"

const app = express();
app.use(cors())
const PORT = 4000;

app.use(express.json())

app.use(cors({
    origin: '*'
}))


type Quotes = {
    id: number
    author: string
    quote: string
    image: string
    age: string
}

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

app.get('/', (req, res) => {
    res.send("Some quotes for you");
});


app.get('/quotes', (req, res) => {
    res.send(quotes);
});

app.get('/quotes/:id', function (req, res) {
    const id = Number(req.params.id)

    const match = quotes.find(person => person.id === id)
    if (match) {
        res.send(match)
    } else res.status(404).send({ error: 'Not found' })
})

app.listen(PORT, () => {
    console.log(`Server running on: http://localhost:${PORT}`);
});

app.post('/quotes', (req, res) => {
    const author = req.body.author
    const quote = req.body.quote
    const image = req.body.image
    const age = req.body.age

    const errors = []

    if (typeof quote !== 'string') errors.push("Quote missing or not a string")
    if (typeof author !== 'string') errors.push("Author missing or not a string")
    if (typeof image !== 'string') errors.push("Image missing or not a string")
    if (typeof age !== 'string') errors.push("Age missing or not a string")

    if (errors.length === 0) {
        const newQuote: Quotes = {
            id: Math.random(),
            author: author,
            quote: quote,
            age: age,
            image: image
        }

        quotes.push(newQuote)
        res.send(newQuote)
    } else res.status(400).send({ errors: errors })
})

app.delete('/quotes/:id', (req, res) => {

    const id = Number(req.params.id);

    const match = quotes.find((quote) => quote.id === id);

    if (match) {
        quotes = quotes.filter((quote) => quote.id !== id);
        res.send({ message: 'Quote deleted successfully.' });
    } else {
        res.status(404).send({ error: 'Quote not found.' });
    }
})

app.patch('/quotes/:id', (req, res) => {
    const id = Number(req.params.id)
    const editQuote = quotes.find(quote => quote.id === id)

    if (editQuote) {

        if (typeof req.body.author === 'string') {
            editQuote.author = req.body.firstName
        }

        if (typeof req.body.quote === 'string') {
            editQuote.quote = req.body.text
        }

        if (typeof req.body.age === 'number') {
            editQuote.age = req.body.age
        }

        if (typeof req.body.image === 'string') {
            editQuote.image = req.body.image
        }
        res.send(editQuote)
    }


    else {
        res.status(404).send({ error: 'Quote not found' })
    }

})