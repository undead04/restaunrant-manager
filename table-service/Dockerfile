# Sử dụng Node.js 18
FROM node:18

# Đặt thư mục làm việc trong container
WORKDIR /app

# Copy package.json vào container
COPY package.json package-lock.json ./

# Cài đặt dependencies
RUN npm install --include=dev

# Copy toàn bộ mã nguồn vào container
COPY . .
# Mở cổng 4003
EXPOSE 4003

# Chạy ứng dụng
CMD ["npm", "run", "start"]
