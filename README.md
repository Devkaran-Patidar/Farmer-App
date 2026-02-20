# Web Application for Direct Market Access for Farmers

A full-stack Web application designed to empower farmers by providing **direct access to consumers and retailers**, eliminating middlemen, and ensuring fair prices for their produce.

---

## 🔹 Background

Farmers often face challenges in reaching markets directly. Middlemen reduce the farmer’s profits, limiting their income potential. This project addresses this problem by building a **platform that connects farmers directly with buyers**, enabling better pricing and streamlined transactions.

---

## 🔹 Description

The Web application enables:

* **Product Listing:** Farmers can add details about their produce, including images, quantity, and price.
* **Direct Communication:** Farmers and buyers can negotiate prices and confirm orders.
* **Order Management:** Track orders, delivery status, and manage transactions.
* **User-Friendly Interface:** Easy-to-use mobile app for both farmers and buyers.
* **Role-Based Access:** Farmers and buyers have dedicated dashboards.

---

## 🔹 Features

### Farmer

* Add, update, and delete products
* Upload product images
* View buyer requests and orders
* Track sales and earnings

### Buyer

* Browse products from multiple farmers
* Place orders and negotiate prices
* Track deliveries

### Admin (Optional)

* Manage users and transactions
* Approve listings if required
* Analytics on sales and popular products

---

## 🔹 Technology Stack

* **Frontend:** React Native | HTML | CSS | JAVASCRIPT
* **Backend:** Django REST Framework | PYTHON
* **Database:** SQLite | MYSQL
* **Authentication:** JWT or session-based login
* **Media:** Image upload for products using Django `ImageField`

---

## 🔹 Project Setup

### Backend (Django)

1. **Clone the repository**

```bash
git clone <repo_url>
cd backend
```

2. **Create virtual environment & install dependencies**

```bash
python -m venv .venv
# Windows
.venv\Scripts\activate
# Mac/Linux
source .venv/bin/activate
pip install -r requirements.txt
```

3. **Apply migrations**

```bash
python manage.py makemigrations
python manage.py migrate
```

4. **Run development server**

```bash
python manage.py runserver
```

---

### Frontend (React Native / Expo)

1. **Navigate to mobile app folder**

```bash
cd mobile-app
```

2. **Install dependencies**

```bash
npm install
```

3. **Run app**

```bash
expo start
```

* Scan the QR code with your mobile device or use an emulator.

---

## 🔹 API Endpoints

| Endpoint                  | Method | Description                           |
| ------------------------- | ------ | ------------------------------------- |
| `/api/user/register/`     | POST   | Register a new user (farmer or buyer) |
| `/api/user/login/`        | POST   | Login user                            |
| `/api/user/profile/<id>/` | GET    | Fetch user profile                    |
| `/api/productview/`       | GET    | List all products                     |
| `/api/productview/`       | POST   | Add new product with image            |

---

## 🔹 Media & Images

* All product and profile images are stored on the server and accessible via `/media/`.
* Ensure `MEDIA_URL` and `MEDIA_ROOT` are configured in Django `settings.py`.

Frontend should fetch images using full URLs:

```js
<img src={`http://127.0.0.1:8000${product.product_img}`} />
```

---

## 🔹 Future Improvements

* Add **real-time chat** between farmers and buyers.
* Implement **ratings and reviews** for farmers.
* Add **order notifications and reminders**.
* Integrate **payment gateway** for direct transactions.

---

## 🔹 Author

**Devkaran Patidar**
Full-Stack Developer

---