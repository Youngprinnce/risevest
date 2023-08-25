CREATE EXTENSION IF NOT EXISTS "uuid-ossp"; -- Enable uuid-ossp extension

-- Create Users Table
CREATE TABLE IF NOT EXISTS users (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  createdAt TIMESTAMP NOT NULL DEFAULT NOW(),
  updatedAt TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Create Posts Table
CREATE TABLE IF NOT EXISTS posts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  userId UUID REFERENCES users(id),
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  createdAt TIMESTAMP NOT NULL DEFAULT NOW(),
  updatedAt TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Create Comments Table
CREATE TABLE IF NOT EXISTS comments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  postId UUID REFERENCES posts(id),
  userId UUID REFERENCES users(id),
  content TEXT NOT NULL,
  createdAt TIMESTAMP NOT NULL DEFAULT NOW(),
  updatedAt TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Index on posts(userId) column
CREATE INDEX IF NOT EXISTS idx_posts_userId ON posts(userId);

-- Index on users(email) column
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- Index on comments(postId) column
CREATE INDEX IF NOT EXISTS idx_comments_postId ON comments(postId);

-- Index on comments(createdAt, postId) columns for the subquery condition
CREATE INDEX IF NOT EXISTS idx_comments_createdAt_postId ON comments(createdAt, postId);

