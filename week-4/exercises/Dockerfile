# Sử dụng Node.js image
FROM node:20

# Thiết lập thư mục làm việc trong container
WORKDIR /app

# Sao chép package.json và package-lock.json
COPY ./package*.json ./

# Cài đặt các dependencies
RUN npm install

# Sao chép mã nguồn ứng dụng
COPY . .

# Mở cổng ứng dụng
EXPOSE 3001

# Chạy ứng dụng
CMD ["node", "app.js"]
