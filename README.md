# PocketPay  
Welcome to **PocketPay**! 🚀 This project replicates essential digital wallet functionalities, enabling users to manage transactions, view their account details, and interact with other users seamlessly.

---

## ✨ Features  
- 🔒 Secure User Authentication & Authorization using JWT  
- 💰 Check Account Balance in Real-Time  
- 🔍 Search and Explore Other Users  
- 💸 Transfer Money Instantly to Other Users
- 🛡️ Secure Password Storage using bcrypt for encrypted password hashing

---

## 💻 Technology Stack  
- **Frontend**: React.js, Tailwind CSS  
- **Backend**: Node.js, Express.js  
- **Database**: MongoDB  

---

## 🚀 Getting Started  

To start working with **PocketPay**, follow these simple steps:  

### 1. Clone the Repository  
Clone the PocketPay repository to your local system:  

```bash  
git clone https://github.com/Ravendra1236/pocketpay.git
```
### 2. Set Environment Variables ⚙
Navigate to the frontend and backend directories and add necessary environment variables. You may need to create a .env file and configure it with the required variables:

- In the **backend/.env** file:
  
```bash  
MONGO_URL = your-mongo-url
PORT = 3000
JWT_SECRET = your-jwt-secret
```
### 3. Install Dependencies 📦
Install dependencies in both frontend and backend folders:

```bash  
cd frontend
npm install
cd ../backend
npm install
```

### 4. Start the Backend Server 🖥️
In the **backend** folder, start the development server:

```bash  
nodemon server.js
```
OR
```bash  
node server.js
```

### 5. Start the Frontend 🚀
In the **frontend** folder, start the frontend application:

```bash  
npm run dev
```

---


### Database Transactions 💾
PocketPay ensures data consistency and reliability by using MongoDB Transactions. The transactions follow the ACID properties to guarantee that they are either fully completed or fully reverted in case of any issues, preventing inconsistencies in the database.


---


### Contributions 📝
Contributions to PocketPay are welcome! If you find any issues or have suggestions for improvements, feel free to open an issue or submit a pull request.


---

Happy Coding! 🚀
