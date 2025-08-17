const http = require('http');
const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const dotenv = require('dotenv');
const cors = require('cors');
const { hash } = require('@onesy/utils');
const jwt = require('jsonwebtoken');

const run = async () => {
  // 1) Postavka  
  // učitaj skrivene varijable iz .env fajla 
  dotenv.config({ quite: true });

  // config 
  const config = {
    port: process.env.PORT || 4000,
    private_key: process.env.PRIVATE_KEY,
    mongo_uri: process.env.MONGO_URI,
    mongo_database: process.env.MONGO_DATABASE
  };

  const app = express();

  app.use(cors({ origin: '*' }));

  app.use(express.json());

  // 2) MONGODB KONEKCIJA 
  const client = new MongoClient(config.mongo_uri);

  await client.connect();

  console.log('Mongo connected');

  const db = client.db('blog');

  const users = db.collection('users');
  const posts = db.collection('posts');

  // 3) DEFINIŠEMO RUTE 
  // Osnovna
  app.get('/', (req, res) => {
    return res.status(200).json({ message: 'Okay' });
  });

  // Registracija korisnika  
  app.post('/sign-up', async (req, res) => {
    const {
      name,
      email,
      password
    } = req.body;

    // Proveriti da li je user poslao sva obavezna polja
    if (!(name && email && password)) {
      // greška odgovor 
      return res.status(400).json({ message: 'Name, email and password are required' });
    }

    // Check if user already exists with this email  
    const exists = await users.findOne({
      email
    });

    if (exists) {
      // greška odgovor 
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    // Ubaci novog korisnika u users kolekciju (tabelu) 
    const user = await users.insertOne({
      name,
      email,
      // Note: NEVER STORE RAW PASSWORD IN THE DB
      // always hash it, so 
      password: hash(password)
    });

    // vrati sign in JWT string, sa kojom se korisnika smatra ulogovanim 
    return res.status(201).json({
      jwt: jwt.sign({ id: user._id.toString() }, config.private_key)
    });
  });

  // Login korisnika 
  app.post('/sign-in', async (req, res) => {
    const {
      email,
      password
    } = req.body;

    // Proveriti da li user postoji sa ovim email-om 
    // ako postoji, proveriti da li je password ispravan 
    const user = await users.findOne({
      email
    });

    if (
      !user ||
      user.password !== hash(password)
    ) {
      // greška odgovor 
      return res.status(400).json({ message: 'Email ili password su neispravni' });
    }

    // vratiti JWT login string, kojim se user vodi kao ulogovan 
    return res.status(200).json({
      jwt: jwt.sign({ id: user._id.toString() }, config.private_key)
    });
  });

  // Middleware 
  const protected = async (req, res) => {
    // Izvuci user-a is request-a
    const jwtString = req.headers.authorization;

    // Proveri da li je ispravan
    let data;

    try {
      data = jwt.verify(jwtString, config.private_key);
    }
    catch (error) {
      // greška odgovor 
      return res.status(400).json({ message: 'Probajte da se ulogujete ponovo' });
    }

    // Proveri da li user postoji u bazi
    const id = data.id;

    const user = await users.findOne({
      _id: new ObjectId(id)
    });

    if (!user) {
      return res.status(400).json({ message: 'Došlo je do greške, probajte da se ulogujete ponovo' });
    }

    // dodati usera u req objekat
    req.user = user;

    return next();
  };

  // kreiraj post 
  app.post('/posts', protected, async (req, res) => {
    const {
      name,
      description
    } = req.body;

    const user = req.user;

    const post = await posts.insertOne({
      name,
      description,

      // OBAVEZNO
      // moramo u svaki post da ubacimo ko ga je kreirao
      // da znam od koga je, da možemo tom user-u posle da vratimo samo njegove postove 
      user: user._id
    });

    return res.status(201).json({
      message: 'Post kreiran',
      response: {
        id: post._id
      }
    });
  });

  // vrati sve moje postove 
  app.get('/posts', protected, async (req, res) => {
    const user = req.user;

    const postovi = await posts.find({
      user: user._id
    }).toArray();

    return res.status(200).json({
      response: postovi
    });
  });

  // 4) START SERVERA (API-a)
  const server = http.createServer(app);

  server.listen(config.port, () => {
    console.log('API started on: http://localhost:4000');
  });
};

run(); 
