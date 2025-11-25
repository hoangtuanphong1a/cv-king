#!/bin/bash

# Script to extract public key from private key and help with SSH setup

echo "🔧 Script sửa lỗi SSH key cho Jenkins CI/CD"
echo "=============================================="

set -e

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo ""
echo "📋 Các bước để sửa lỗi SSH:"
echo ""
echo "${YELLOW}BƯỚC 1: Lấy Private Key từ Jenkins${NC}"
echo "1. Vào Jenkins Dashboard"
echo "2. Chọn: Credentials → System → Global credentials"
echo "3. Tìm credential ID: 'server-ssh-key'"
echo "4. Click vào tên credential → chọn 'Update' hoặc copy nội dung private key"
echo ""

echo "${YELLOW}BƯỚC 2: Tạo file private key tạm thời${NC}"
echo "Tạo file private key từ nội dung copy được:"
echo ""
echo "# Tạo file private key (thay YOUR_PRIVATE_KEY_HERE bằng nội dung copy từ Jenkins)"
echo "cat > server_private_key <<EOF"
echo "YOUR_PRIVATE_KEY_HERE"
echo "EOF"
echo ""

echo "${YELLOW}BƯỚC 3: Chỉnh sửa quyền cho private key${NC}"
echo "chmod 600 server_private_key"
echo ""

echo "${YELLOW}BƯỚC 4: Trích xuất public key${NC}"
echo "# Chạy lệnh sau để lấy public key:"
echo "${BLUE}ssh-keygen -y -f server_private_key${NC}"
echo ""

echo "${YELLOW}BƯỚC 5: Thêm public key lên server${NC}"
echo "Copy output của lệnh ssh-keygen ở bước 4, sau đó:"
echo ""

if ! command -v ssh &> /dev/null; then
    echo "${RED}❌ Không có SSH client${NC}"
    exit 1
fi

# Check if user already has access to server via password or other means
read -p "Bạn hiện tại có thể SSH vào server bằng password không? (y/n): " CAN_SSH

if [[ "$CAN_SSH" == "y" || "$CAN_SSH" == "Y" ]]; then
    echo ""
    echo "${GREEN}✅ Bạn có thể SSH bằng password${NC}"
    echo ""
    echo "Chạy các lệnh sau để thêm public key lên server:"
    echo ""
    echo "${BLUE}# SSH vào server bằng password"
    echo "ssh ubuntu@206.189.88.56${NC}"
    echo ""
    echo "${BLUE}# Tạo thư mục .ssh nếu chưa có"
    echo "mkdir -p ~/.ssh${NC}"
    echo ""
    echo "${BLUE}# Thêm public key vào authorized_keys (thay YOUR_PUBLIC_KEY_HERE bằng output từ bước 4)"
    echo 'echo "YOUR_PUBLIC_KEY_HERE" >> ~/.ssh/authorized_keys'${NC}
    echo ""
    echo "${BLUE}# Chỉnh sửa quyền cho thư mục và file"
    echo "chmod 700 ~/.ssh"${NC}
    echo "chmod 600 ~/.ssh/authorized_keys"${NC}
    echo ""
    echo "${BLUE}# Restart SSH service (nếu cần)"
    echo "sudo systemctl restart ssh"${NC}
else
    echo ""
    echo "${RED}❌ Bạn không thể SSH bằng password${NC}"
    echo ""
    echo "${YELLOW}🔧 Các cách khác để thêm public key:${NC}"
    echo ""
    echo "1. ${BLUE}Sử dụng VPS provider console (DigitalOcean, Linode, etc.)${NC}"
    echo "   - Truy cập vào VPS console qua web interface"
    echo "   - Login vào user ubuntu"
    echo "   - Thêm lệnh như trên"
    echo ""
    echo "2. ${BLUE}Mount disk và chỉnh sửa trực tiếp${NC}"
    echo "   - Shutdown server, mount disk trên máy khác"
    echo "   - Chỉnh sửa file /home/ubuntu/.ssh/authorized_keys"
    echo ""
    echo "3. ${BLUE}Sử dụng root access nếu có${NC}"
    echo "   - SSH bằng root user nếu được bật"
    echo "   - Sau đó su - ubuntu và thêm key"
    echo ""
    echo "4. ${BLUE}Reset server về trạng thái ban đầu${NC}"
    echo "   - Nếu còn snapshot hoặc backup"
fi

echo ""
echo "${YELLOW}BƯỚC 6: Kiểm tra kết nối SSH sau khi thêm key${NC}"
echo ""
echo "# Test kết nối với key mới:"
echo "${BLUE}ssh -o StrictHostKeyChecking=no -i server_private_key ubuntu@206.189.88.56 \"echo SSH key authentication works!\"${NC}"
echo ""

echo "${YELLOW}BƯỚC 7: Dọn dẹp${NC}"
echo ""
echo "# Xóa file private key tạm thời sau khi hoàn thành:"
echo "${RED}rm server_private_key${NC}"
echo ""

echo "${GREEN}🎯 Sau khi hoàn thành các bước trên, Jenkins pipeline sẽ có thể SSH thành công!${NC}"

# Cleanup function
cleanup() {
    echo ""
    echo "${RED}⚠️  Nhớ xóa file script này sau khi sử dụng xong!${NC}"
}

trap cleanup EXIT
