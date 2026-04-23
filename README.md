# Bare Beauty 🌿✨

Welcome to the **Bare Beauty** Full-Stack Repository! This is a gorgeous, modern eCommerce experience featuring AI Skin Advising, robust Cart memory, and database-driven product searching built organically on an Express/MongoDB foundation.

> **Note to Teammates & Graders:** This repository is now a "Monorepo", meaning it contains *both* the Frontend UI and the Backend API Server! You only need to clone this one link.

## 🚀 How to Run the Project Locally

Follow these 3 exact steps to spin up the entire application stack:

### Step 1: Start the Local Database (via Docker)
We use Docker to easily spin up a secure local MongoDB instance.
1. Open the **Docker Desktop** application on your computer so the daemon is running.
2. Open your terminal and run this exact command to create a fresh MongoDB database in the background:
   ```bash
   docker run -d -p 27017:27017 --name bare-beauty-db mongo
   ```

### Step 2: Start the Backend API Server
Once Docker has locked port `27017`, you need to turn the Node.js API on! This is what parses the data and secures passwords.
1. Open a new terminal window inside the main `Bare-Beauty` folder.
2. Navigate into the backend directory:
   ```bash
   cd backend
   ```
3. Install the required Node packages (you only need to do this once):
   ```bash
   npm install
   ```
4. Start the Active Database Engine Server:
   ```bash
   npm run dev
   ```
*(Once your terminal flashes `Connected to MongoDB`, the backend is officially alive!)*

### Step 3: Start the Frontend UI
Run this from `Bare-Beauty/bare-beauty-frontend`:
```bash
npm run dev
```
Then open the exact `127.0.0.1` URL it prints. In my check it correctly skipped the bad `5500` process and started on `http://127.0.0.1:5501`. If you still have that old Python server open on `5500`, stop that terminal with `Ctrl+C` so it doesn’t keep hijacking `localhost`. I didn’t change the backend; if login/cart/checkout still fail after this, make sure `Desktop/Bare-Beauty/bare-beauty-frontend/backend` is running on port `5001`.

1. Open a new terminal inside `bare-beauty-frontend`.
2. Start the frontend server:
   ```bash
   npm run dev
   ```
3. Open the URL printed in the terminal. The server will try `http://127.0.0.1:5500` first and will automatically use the next free port if `5500` is already busy.
4. The UI will automatically connect to your running backend on `http://localhost:5001`.

From there, all features including the **AI Advisor**, secure Login portals, Live Search bar, and Cart Checkout will function natively!
