🛒 Tech Store Website

Website bán đồ công nghệ gồm 3 phần: Frontend (React + Vite), Backend (Spring Boot) và Database (MySQL).

📂 Cấu trúc dự án
project-root/
│── frontend/    # React + Vite
│── backend/     # Spring Boot
└── database/    # File database.sql

🚀 Hướng dẫn cài đặt & chạy dự án
1️⃣ Clone dự án về máy
git clone <URL-repository-của-bạn>
cd project-root

2️⃣ Cài Ollama & tải model AI

Dự án sử dụng Ollama để hỗ trợ người dùng tìm kiếm sản phẩm.

➤ Cài Ollama

Tải tại: https://ollama.com/

➤ Mở terminal và tải model phi3:mini
ollama pull phi3:mini

3️⃣ Setup MySQL Database
➤ Import database

Mở MySQL Workbench

Chọn Server → Data Import

Import file:

database/database.sql

➤ Chạy MySQL trên cổng 80

Đảm bảo MySQL đang chạy local và lắng nghe ở port 80.

4️⃣ Chạy Backend (Spring Boot)
➤ Mở folder backend bằng IntelliJ IDEA (khuyến nghị)
cd backend

➤ Cài dependencies từ pom.xml

IntelliJ sẽ tự động tải về, hoặc thủ công:

mvn clean install

➤ Cấu hình lại file application.properties.uat

Sửa thông tin kết nối MySQL theo môi trường local, ví dụ:

spring.datasource.url=jdbc:mysql://localhost:80/your_database_name
spring.datasource.username=root
spring.datasource.password=your_password

➤ Chạy ứng dụng

Chạy file:

src/main/java/.../ProjectApplication.java

5️⃣ Chạy Frontend (ReactJS + Vite)
➤ Vào thư mục frontend
cd ../frontend

➤ Cài dependencies
npm install

➤ Chạy dự án
npm run dev



➡️ http://localhost:5173
 (mặc định của Vite)
