# Deployment Guide: GitHub & Vercel

I am currently installing **Git**, the **GitHub CLI**, and the **Vercel CLI** in the background on your system. 
Because installing these modifies your system environment variables, you **must close your current VS Code terminal and open a new one** before proceeding, otherwise it won't recognize the commands.

Since logging in requires a web browser to securely enter your passwords, it is best that you run these commands in your own terminal. Just copy and paste the steps below in order.

---

### Step 1: Initialize Git & Commit Your Code
First, we need to track your code using Git. Open a **New Terminal** in VS Code (Terminal -> New Terminal) and run:

```powershell
# 1. Initialize the repository
git init

# 2. Add all your files to tracking
git add .

# 3. Save (commit) this version of the code
git commit -m "Initial commit for LSD Property Dealer"
```

### Step 2: Log into GitHub and Push
Now we will use the GitHub CLI to authenticate and push your code to the internet.

```powershell
# 1. Authenticate with GitHub
# (This will ask you questions. Choose "GitHub.com", "HTTPS", and "Login with a web browser")
gh auth login

# 2. Create a new public repository and push the code directly
gh repo create lsd-property-dealer --public --source=. --remote=origin --push
```
*Your code is now safely backed up on GitHub!*

---

### Step 3: Deploy Live to Vercel
Vercel is the creator of Next.js and is the absolute best place to host this demo.

```powershell
# 1. Log into Vercel
# (This will open a browser to authenticate you)
vercel login

# 2. Deploy your project
# (It will ask you a few setup questions. Just press ENTER for all of them to accept the defaults)
vercel
```

Vercel will output a live URL (e.g., `https://lsd-property-dealer.vercel.app`) that you can immediately send to your client!

---

> [!WARNING] Important Note About the Live Demo
> As we discussed, this website currently uses local JSON files (`src/data/properties.json`) as a makeshift database. 
> When you host this on Vercel, the website will work flawlessly for browsing, but **the Admin Dashboard will become read-only.** Vercel servers are temporary, meaning if you try to add a new property via the live Admin page, it cannot save it permanently. 
> 
> This is perfectly fine for your presentation demo, but for the final production version, we will need to connect a real database like Supabase or Firebase.
