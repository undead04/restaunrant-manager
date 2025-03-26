# Sử dụng Node.js 18
FROM node:18

# Đặt thư mục làm việc trong container
WORKDIR /app

# Copy package.json vào container
COPY package.json package-lock.json ./
# Bật chế độ development để cài devDependencies
ENV NODE_ENV=development

# Cài đặt dependencies
RUN npm install

# Copy toàn bộ mã nguồn vào container
COPY . .
# Mở cổng 4001
EXPOSE 4001

# Chạy ứng dụng
CMD ["npm", "run", "start"]
