@echo off
echo.
echo =======================================================
echo =     HUONG DAN SUA LOI SSH KEY CHO JENKINS CI/CD     =
echo =======================================================
echo.
echo 🔑 Trong Windows, ban can thuc hien theo cac buoc sau:
echo.
echo ------------------------------------------------------------------
echo BƯỚC 1: Lấy Private Key từ Jenkins
echo ------------------------------------------------------------------
echo.
echo 1. Vào Jenkins Dashboard
echo 2. Credentials → System → Global credentials
echo 3. Tim credential ID: 'server-ssh-key'
echo 4. Click vao ten credential → chon 'Update' hoac copy noi dung private key
echo.
echo IMPORTANT: Luu y copy ca dau "-----BEGIN OPENSSH PRIVATE KEY-----"
echo den "-----END OPENSSH PRIVATE KEY-----"
echo.
echo ------------------------------------------------------------------
echo BƯỚC 2: Tao file private key tam thoi
echo ------------------------------------------------------------------
echo.
echo # Tao file private key (paste noi dung vua copy vao file server_private_key)
echo # Co the su dung Notepad++ hoac editor bat ky
echo notepade server_private_key
echo.
echo # Sau do paste noi dung private key tu Jenkins vao file
echo.
echo ------------------------------------------------------------------
echo BƯỚC 3: Cai dat OpenSSH (neu chua co)
echo ------------------------------------------------------------------
echo.
echo # Vao Settings → Apps → Optional features
echo # Tim "OpenSSH Client" va cai dat neu chua co
echo.
echo Hoac cai dat bang chocolatey (neu co):
echo choco install openssh
echo.
echo ------------------------------------------------------------------
echo BƯỚC 4: Trich xuat public key
echo ------------------------------------------------------------------
echo.
echo # Chay lenh sau de lay public key (sau khi cai dat OpenSSH):
echo ssh-keygen -y -f server_private_key
echo.
echo # Copy output cua lenh tren (do la public key cua ban)
echo.
echo ------------------------------------------------------------------
echo BƯỚC 5: Them public key len server
echo ------------------------------------------------------------------
echo.
echo BANG CAC CACH:
echo.
echo 1. NEU BAN CO THE SSH VAO SERVER BANG PASSWORD:
echo ===============================================
echo.
echo # SSH vao server bang mat khau
echo ssh ubuntu@206.189.88.56
echo.
echo # Tao thu muc .ssh neu chua co
echo mkdir -p ~/.ssh
echo.
echo # Them public key vao authorized_keys (thay YOUR_PUBLIC_KEY_HERE bang output tu buoc 4)
echo echo "YOUR_PUBLIC_KEY_HERE" ^>^> ~/.ssh/authorized_keys
echo.
echo # Chinh sua quyen
echo chmod 700 ~/.ssh
echo chmod 600 ~/.ssh/authorized_keys
echo.
echo 2. NEU KHONG CO PASSWORD ACCESS:
echo ================================
echo.
echo a) Su dung VPS Console (DigitalOcean, Vultr, etc.):
echo    - Truy cap VPS console qua web
echo    - Login ubuntu user
echo    - Chay cac lenh nhu o phia tren
echo.
echo b) Su dung root access neu co the
echo    - SSH root@206.189.88.56
echo    - su - ubuntu
echo    - Them key nhu huong dan
echo.
echo c) Mount disk va chinh sua truc tiep
echo    - Tinh nang phuc tap, thuong dung trong tinh huong khan cap
echo.
echo ------------------------------------------------------------------
echo BƯỚC 6: Kiem tra ket noi SSH
echo ------------------------------------------------------------------
echo.
echo # Test ket noi voi key moi:
echo ssh -o StrictHostKeyChecking=no -i server_private_key ubuntu@206.189.88.56 "echo SSH key authentication works!"
echo.
echo ------------------------------------------------------------------
echo BƯỚC 7: Don dep
echo ------------------------------------------------------------------
echo.
echo # Xoa file private key tam thoi sau khi hoan thanh:
echo del server_private_key
echo.
echo 📝 Luu y quan trong:
echo ===================
echo.
echo - KHONG commit file server_private_key len Git
echo - Chi su dung file script nay tren may tinh ca nhan
echo - Sau khi Jenkins pipeline chay thanh cong, co the xoa file script nay
echo.
echo 🎯 Ket qua mong muon: Jenkins CI/CD pipeline se co the SSH thanh cong!
echo.
pause
