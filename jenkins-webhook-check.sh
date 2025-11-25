#!/bin/bash

echo "🔍 Kiểm tra cấu hình webhook GitHub cho Jenkins auto-build"
echo "======================================================"

# Get GitHub repository info from remote URL
REMOTE_URL=$(git config --get remote.origin.url)
echo "📦 Repository: $REMOTE_URL"

# Extract username/repo from URL
if [[ $REMOTE_URL =~ github\.com[\/:]([^\/]+)\/(.+)\.git$ ]]; then
    GITHUB_USER="${BASH_REMATCH[1]}"
    GITHUB_REPO="${BASH_REMATCH[2]}"
    echo "👤 User: $GITHUB_USER"
    echo "📁 Repo: $GITHUB_REPO"
else
    echo "❌ Không thể parse thông tin repository từ URL: $REMOTE_URL"
    exit 1
fi

echo ""
echo "🌐 Hướng dẫn cấu hình webhook trên GitHub:"
echo "1. Truy cập: https://github.com/$GITHUB_USER/$GITHUB_REPO/settings/hooks"
echo "2. Click 'Add webhook'"
echo "3. Cấu hình:"
echo "   - Payload URL: http://your-jenkins-server/github-webhook/"
echo "   - Content type: application/json"
echo "   - Events: Chọn 'Just the push event' hoặc 'Send me everything'"
echo "   - Chọn 'Active'"
echo "4. Lưu lại"

echo ""
echo "⚙️ Kiểm tra cấu hình Jenkins:"
echo "1. Vào Jenkins pipeline (cv-king hoặc tên job của bạn)"
echo "2. Vào 'Configure'"
echo "3. Kiểm tra phần 'Build Triggers':"
echo "   - 'GitHub hook trigger for GITScm polling' ✓"
echo "   - 'Poll SCM' ✓ với schedule 'H/2 * * * *'"

echo ""
echo "🧪 Test Jenkins auto-build:"
echo "1. Commit và push thay đổi code lên GitHub"
echo "2. Kiểm tra Jenkins - pipeline sẽ auto trigger"
echo "3. Hoặc manually trigger: http://your-jenkins-server/job/your-job-name/build?token=YOUR_TOKEN"

echo ""
echo "✅ Sau khi thiết lập, Jenkins sẽ tự động build khi:"
echo "- Có push lên branch main"
echo "- Hoặc mỗi 2 phút (poll SCM backup)"

echo ""
echo "🔗 Cần thay đổi URL Jenkins server và token trong hướng dẫn trên!"
