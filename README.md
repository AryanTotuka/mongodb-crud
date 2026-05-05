# MongoDB CRUD — One-to-Many & Many-to-Many

A full-stack MongoDB CRUD application with one-to-many and many-to-many relationships, containerized with Docker for easy deployment.

## 🚀 Features

- **Backend**: Node.js/Express API with MongoDB
- **Frontend**: React application
- **Database**: MongoDB with Mongoose ODM
- **Containerization**: Docker & Docker Compose
- **Relationships**: Authors ↔ Books (one-to-many), Books ↔ Genres (many-to-many)

## ── DOCKER SETUP (Recommended) ──────────────────────────────

### Prerequisites
- Docker Desktop installed and running
- Docker Compose (comes with Docker Desktop)

### Quick Start with Docker
```bash
# 1. Clone the repository
git clone <your-github-repo-url>
cd mongodb-crud

# 2. Start all services (MongoDB, Backend API, Frontend)
docker-compose up --build

# 3. Open the application
# Frontend: http://localhost:3000
# Backend API: http://localhost:5000
```

### Docker Commands
```bash
# Start services in background
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs -f

# Rebuild after code changes
docker-compose up --build

# Clean up (removes containers, networks, volumes)
docker-compose down -v
```

### Services
- **MongoDB**: Database on port 27017
- **Backend**: Node.js/Express API on port 5000
- **Frontend**: React app served by Nginx on port 3000

## 📚 API Documentation

### Authors
- `GET /api/authors` - Get all authors with their books
- `POST /api/authors` - Create new author
- `GET /api/authors/:id` - Get author by ID with books
- `PUT /api/authors/:id` - Update author
- `DELETE /api/authors/:id` - Delete author (cascades to books)

### Genres
- `GET /api/genres` - Get all genres with tagged books
- `POST /api/genres` - Create new genre
- `DELETE /api/genres/:id` - Delete genre (removes from all books)

### Books
- `GET /api/books` - Get all books with populated author and genres
- `POST /api/books` - Create new book
- `GET /api/books/:id` - Get book by ID
- `PUT /api/books/:id` - Update book
- `DELETE /api/books/:id` - Delete book
- `GET /api/books/aggregate/stats` - Get aggregated statistics

---

## ── MANUAL SETUP (Alternative) ──────────────────────────────

## ── MANUAL SETUP (Alternative) ──────────────────────────────

## ── MANUAL SETUP (Alternative) ──────────────────────────────

### Windows
1. Download from https://www.mongodb.com/try/download/community
2. Run the installer (choose "Complete")
3. MongoDB runs as a Windows service automatically

### macOS
  brew tap mongodb/brew
  brew install mongodb-community
  brew services start mongodb-community

### Ubuntu/Debian
  sudo apt-get install -y mongodb
  sudo systemctl start mongod
  sudo systemctl enable mongod

Verify it's running:
  mongosh          # should open a MongoDB shell


## ── STEP 2: Install Node.js ──────────────────────────────────

Download from https://nodejs.org  (choose LTS version)
Verify: node --version && npm --version


## ── STEP 3: Set up this project ─────────────────────────────

  # 1. Go into the project folder
  cd mongodb-crud

  # 2. Install dependencies
  npm install

  # 3. Start the server
  node server.js

  # OR for auto-restart on file changes:
  npm run dev


## ── STEP 4: Open the app ─────────────────────────────────────

  http://localhost:5000


## ── API Reference ────────────────────────────────────────────

Test with curl or Postman:

### Authors (one-to-many PARENT)
  GET    /api/authors
  POST   /api/authors          { "name": "Tolkien", "country": "UK" }
  GET    /api/authors/:id      (returns author + their books)
  PUT    /api/authors/:id      { "country": "England" }
  DELETE /api/authors/:id      (cascades: deletes their books too)

### Genres (many-to-many)
  GET    /api/genres
  POST   /api/genres           { "name": "Fantasy" }
  GET    /api/genres/:id       (returns genre + all books tagged with it)
  DELETE /api/genres/:id       ($pull from all books' genres array)

### Books (many-side + many-to-many)
  GET    /api/books            (populated: author name + genre names)
  POST   /api/books            { "title": "Dune", "year": 1965, "author": "<id>", "genres": ["<id>", "<id>"] }
  GET    /api/books/:id
  PUT    /api/books/:id
  DELETE /api/books/:id
  GET    /api/books/aggregate/stats   (raw $lookup aggregation pipeline)


## ── Key concepts in this project ────────────────────────────

ONE-TO-MANY (Author → Books):
  Each Book stores a single author field with an ObjectId reference.
  Query: Book.find({ author: authorId })
  Delete cascade: Book.deleteMany({ author: authorId })

MANY-TO-MANY (Books ↔ Genres):
  Each Book stores a genres array of ObjectId references.
  No junction table needed (unlike SQL).
  Query: Book.find({ genres: genreId })
  Cleanup: Book.updateMany({}, { $pull: { genres: genreId } })

POPULATE (like SQL JOIN):
  Book.find().populate('author').populate('genres')
  Replaces ObjectId references with actual documents.

AGGREGATE (raw pipeline):
  GET /api/books/aggregate/stats shows $lookup which is the
  underlying operation that .populate() uses.
