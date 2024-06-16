# Sử dụng image Node.js chính thức
FROM node:20

# Thiết lập thư mục làm việc
WORKDIR /app

# Sao chép package.json và package-lock.json
COPY package*.json ./


# Cài đặt dependencies
RUN npm install

# Sao chép toàn bộ mã nguồn vào container
COPY . .



# Lệnh để chạy ứng dụng
CMD ["node", "app.js"]
