# ⚙️ TechnoPharms — AI Powered, Device Solutions

### 📸Screenshots: [https://github.com/patelurvish0706/TechnoPharms/blob/main/screenshot.md]

**TechnoPharms** is a hybrid web solution designed to help users diagnose and resolve issues related to **mobiles, laptops, and PCs** through a combination of **AI-driven chat**, **YouTube video suggestions**, and **direct technician (shopkeeper) support**.

## 💡 Key Features

### 🧠 AI & Video-Based Diagnosis
- Users submit their device issue or symptoms.
- The system responds with:
  - AI chatbot assistance for real-time support.
  - Curated YouTube videos relevant to the user's problem.

### 🛠️ Shopkeeper Network
- If the user is not satisfied with the AI/video help, they can:
  - **Contact local shopkeepers directly** via phone.
  - **Visit nearby service shops** listed based on their city.

### 👨‍🔧 Shopkeeper Dashboard
- Shopkeepers can:
  - Register and manage their profiles.
  - Display shop details publicly.
  - Receive phone calls directly from users.

## 📍 Real-World Flow

1. **User enters a device issue** (e.g., “Phone won’t charge”).
2. AI + YouTube suggestions are presented.
3. If unresolved, the system shows nearby **tech repair shops**.
4. User can **call shopkeepers directly** for offline help.

## 🧱 Tech Stack

| Layer        | Tech Used        |
|--------------|------------------|
| Frontend     | HTML, CSS, JS    |
| Backend      | PHP              |
| Database     | MySQL            |
| AI Chat      | OpenRouter (API integrated) |
| Video Feed   | YouTube API search integration |
| Hosting      | Apache / XAMPP   |

## 🧾 Database Overview

- **shopkeepers**: login, contact, and authentication info.
- **techshops**: linked with shopkeepers, holds public shop data.
- **issues/diagnosis** *(planned)*: optional for tracking common issues.

## 🚀 How to Run

1. **Clone the repo**
   ```bash
   git clone https://github.com/patelurvish0706/TechnoPharms.git
   cd technopharms
   ```

2. **Import the SQL file**

   * Create a DB named `technopharms`
   * Import `database/technopharms.sql`

3. **Set up your DB credentials in `/script/db_connection.php`**

   ```php
   $conn = new mysqli("localhost", "root", "", "technopharms");
   ```

4. **API keys in `/script/solution.js`**
   ```
   🔑 Get YouTube API Key ▶️

   1. Go to [Google Cloud Console]:https://console.cloud.google.com/
   2. Click Select Project → New Project → Name it → Create.
   3. Go to APIs & Services > Library.
   4. Search for YouTube Data API v3 → Click → Enable.
   5. Go to  APIs & Services > Credentials.
   6. Click Create Credentials → Choose API Key.
   7. Copy the API key shown.

   🧠 Get OpenRouter API Key 🤖

   1. Go to [OpenRouter.ai]: https://openrouter.ai/
   2. Sign in using Google or GitHub.
   3. Go to your profile → Click API Keys tab.
   4. Click Create Key, name it → Copy the key.
   ```

5. **Launch on browser**

   ```
   http://localhost/technopharms/
   ```

## 📞 Shop Contact Feature

All listed shops include:

* Shop name & description
* City and address
* Direct **click-to-call phone number** for easy offline support

## 📷 Screenshots

> Coming soon...



## 📌 Sample Shopkeeper Credentials

| Email                                     | Password |
| ----------------------------------------- | -------- |
| shopkeeper1@example.com | passhash1 |


## 🧠 Future Ideas

* 🔍 Search by device model
* ⭐ Shop ratings/reviews
* 📅 Appointment booking


## 🤝 Contribution

PRs and suggestions welcome!

* Fork this repo
* Create a new branch (`feature/xyz`)
* Commit & open a PR

---

## 📬 Contact

Created by **Urvish Patel**
📧 Email: [patelurvish0706@gmail.com](mailto:patelurvish0706@gmail.com)
📌 GitHub: [@patelurvish0706](https://github.com/patelurvish0706)
