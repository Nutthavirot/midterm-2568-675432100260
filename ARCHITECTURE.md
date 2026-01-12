# ARCHITECTURE.md
# Library Management System - Client-Server Architecture

## 📋 Project Information
- **Student Name:** Nattasith Manochai 
- **Student ID:** 67543210056-7
- **Course:** ENGSE207 Software Architecture 
- **Architecture Style:** Client-Server (REST API) + Internal Layered 

---

## 1) C1 - Context Diagram (High-level)
```
ระบบนี้ถูก Refactor จาก Layered (Full-stack เดียว) → Client-Server โดยแยก **Frontend (Client)** และ **Backend (Server)** เป็นคนละโปรเจกต์ และสื่อสารกันผ่าน HTTP/JSON

User (Browser)
        |
        v
Client (Frontend Web UI)
HTML / CSS / JavaScript
        |
        |  HTTP / JSON (REST)
        v
Server (Backend API on VM)
Node.js + Express + CORS
        |
        v
SQLite Database (library.db)
```


---

## 2) C2 - Container Diagram (Internal Structure)

### 2.1 Client (Frontend)
```
User
↓
Web Browser
↓
Frontend (HTML / CSS / JavaScript)
├── index.html
├── css/style.css
├── js/api.js → REST API client
├── js/app.js → UI logic + events
└── js/components/ → UI rendering
```

**Responsibility:**  
แสดง UI, รับ input, เรียก Backend ผ่าน REST API, อัปเดตหน้าจอ

---

### 2.2 Server (Backend) – Layered Architecture inside Server
```
Express Server (Node.js)
│
▼
Presentation Layer
├── Routes
├── Controllers
└── Middlewares (CORS, ErrorHandler)
│
▼
Business Layer
├── Services
└── Validators
│
▼
Data Layer
├── Repositories
└── Database Connection
│
▼
SQLite Database (library.db)
```

**Responsibility of each layer:**
```
| Layer | Responsibility |
|------|----------------|
| Presentation | รับ HTTP request, ส่ง JSON response |
| Business | กฎธุรกิจ (borrow, return, delete), validation |
| Data | SQL query, insert, update, delete |
```

---

## 3) Responsibilities (หน้าที่ของแต่ละส่วน)

### 3.1 Frontend (Client)
- แสดง UI และรับ input จากผู้ใช้ (Add/Edit/Borrow/Return/Delete)
- เรียก REST API ผ่าน `fetch()` (api.js)
- จัดการ state ของหน้าจอ (filter, loading, render list, stats)

### 3.2 Backend - Presentation Layer
- **Routes:** map URL → Controller method  
- **Controllers:** รับ request, ส่ง response, เรียก service  
- **CORS middleware:** เปิดให้ client ที่คนละ origin เรียก API ได้  
- **Error handler:** แปลง error เป็น HTTP status + JSON response ที่เหมาะสม

### 3.3 Backend - Business Layer
- **Services:** ประมวลผลกฎธุรกิจ
  - borrow: ยืมได้เฉพาะ status=available
  - return: คืนได้เฉพาะ status=borrowed
  - delete: ห้ามลบถ้า status=borrowed
- **Validators:** ตรวจสอบข้อมูลที่เข้ามา (required fields, id format, ISBN format)

### 3.4 Backend - Data Layer
- **Repository:** จัดการคำสั่ง SQL (findAll/findById/create/update/updateStatus/delete)
- **DB connection:** เชื่อมต่อ SQLite + create table

---

## 4) Data Flow (Request → Response)

### Example 1: GET /api/books?status=available
1) Client เรียก `GET http://<VM-IP>:3000/api/books?status=available`  
2) Server: `bookRoutes` → `bookController.getAllBooks()`  
3) Service: `bookService.getAllBooks(status)`  
4) Repository: `bookRepository.findAll(status)` → query SQLite  
5) Service คำนวณ statistics (available/borrowed/total)  
6) Controller ส่ง response format:
```json
{
  "success": true,
  "data": { "books": [...], "statistics": {...} },
  "timestamp": "..."
}