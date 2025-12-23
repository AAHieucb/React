# Dựng docker cho app react có live-reload

# Sử dụng node image
FROM node:18

# Thiết lập thư mục làm việc
WORKDIR /app

# Sao chép package.json và package-lock.json
COPY package*.json ./

# Cài đặt các dependencies
RUN npm install

# Sao chép toàn bộ mã nguồn
COPY . .

# Export port 5173
EXPOSE 5173

# Chạy ứng dụng
CMD ["npm", "run", "dev", "--", "--host"]