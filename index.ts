import express from "express";
import cors from "cors"

const app = express();
app.use(cors())
const PORT = 4000;

app.use(cors({
    origin: '*'
}))


type Quotes = {
    id: number
    author: string
    quote: string
}


const quotes: Quotes[] = [
    {
        id: 1,
        author: "—Rose (Betty White), The Golden Girls",
        quote: `My mother always used to say: The older you get, the better you get, unless you’re a banana.`
    },
    {
        id: 2,
        author: "—Will Ferrell",
        quote: `Before you marry a person, you should first make them use a computer with slow Internet to see who they really are.`
    },
    {
        id: 3,
        author: "—Anonymous",
        quote: `I walk around like everything’s fine, but deep down, inside my shoe, my sock is sliding off.`
    },
    {
        id: 4,
        author: "—Jimmy Kimmel",
        quote: `I never feel more alone than when I’m trying to put sunscreen on my back.`
    },
    {
        id: 5,
        author: "—Anonymous",
        quote: `Common sense is like deodorant. The people who need it most never use it.`
    },
    {
        id: 6,
        author: "—Frank Semyon (Vince Vaughn), True Detective",
        quote: `Never do anything out of hunger. Not even eating.`
    },
    {
        id: 7,
        author: "—Ellen DeGeneres",
        quote: `Accept who you are. Unless you’re a serial killer.`
    },
    {
        id: 8,
        author: "——Bob Hope",
        quote: `I grew up with six brothers. That’s how I learned to dance: waiting for the bathroom.`
    },
    {
        id: 9,
        author: "—Grumpy Cat",
        quote: `Woke up today. It was terrible.`
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