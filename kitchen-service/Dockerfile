# Sử dụng Node.js 18
FROM node:18

# Đặt thư mục làm việc trong container
WORKDIR /app

# Copy package.json vào container
COPY package.json package-lock.json ./

# Cài đặt dependencies
RUN npm install

# Copy toàn bộ mã nguồn vào container
COPY . .
# Build TypeScript trước khi start
RUN npm run build
# Mở cổng 4005
EXPOSE 4005

# Chạy ứng dụng
CMD ["npm", "run", "start"]
