# Library Management System - Layered Architecture

## 📋 Project Information
- **Student Name:** [นายณัฐวิโรจน์ สุทธิธารมงคล]
- **Student ID:** [67543210026-0]
- **Course:** ENGSE207 Software Architecture

## 🏗️ Architecture Style
Layered Architecture (3-tier)

## 📂 Project Structure
```text
src/
├── presentation/
│   ├── controllers/
│   │   └── bookController.js
│   ├── routes/
│   │   └── bookRoutes.js
│   └── middlewares/
│       └── errorHandler.js
│
├── business/
│   ├── services/
│   │   └── bookService.js
│   └── validators/
│       └── bookValidator.js
│
├── data/
│   ├── repositories/
│   │   └── bookRepository.js
│   └── database/
│       └── connection.js
│
├── app.js
└── server.js
```
## 🎯 Refactoring Summary

### ปัญหาของ Monolithic (เดิม):
-   1.Code ยุ่งเหยิง - โค้ดทั้งหมดอยู่ในไฟล์เดียว (server.js) มากกว่า 400 บรรทัด
    2.ยากต่อการบำรุงรักษา - แก้โค้ดส่วนหนึ่ง ต้องระวังไม่ให้กระทบส่วนอื่น
    3.ทำงานร่วมกันยาก - Developer หลายคนแก้ไฟล์เดียวกัน เกิด conflict บ่อย
    4.ไม่มี Separation of Concerns - Business logic ปนกับ Data access ปนกับ HTTP handling


### วิธีแก้ไขด้วย Layered Architecture:
-   แยก Controller ออกจาก business logic
    ย้ายกฎทางธุรกิจไปไว้ใน Service
    ตรวจสอบข้อมูลด้วย Validator
    แยกการติดต่อฐานข้อมูลไว้ที่ Repository
    ใช้ Error Middleware จัดการ error แบบศูนย์กลาง

### ประโยชน์ที่ได้รับ:
-   โค้ดอ่านง่าย เป็นระเบียบ
    แก้ไขแต่ละ layer ได้โดยไม่กระทบส่วนอื่น
    รองรับการขยายระบบในอนาคต
    Debug และ maintenance ง่ายขึ้น
    ตรงตามหลัก Clean Architecture & SOLID

## 🚀 How to Run

\`\`\`bash
# 1. Clone repository
git clone [git@github.com:Nutthavirot/midterm-2568-675432100260.git]

# 2. Install dependencies
npm install

# 3. Run server
npm start

# 4. Test API
# Open browser: http://localhost:3000
\`\`\`

## 📝 API Endpoints
[ระบุ API endpoints ทั้งหมด]