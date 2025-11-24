import { Facebook, Instagram, Linkedin } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="px-4 py-8 border-t">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 md:max-w-[1200px]">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Left side */}
          <div className="flex flex-col items-center md:items-start">
            <p className="text-xl font-bold text-orange-400 mb-4">CV KING</p>
            <div className="flex space-x-4">
              <Link href="#" target="_blank" rel="noopener noreferrer">
                <Facebook className="w-6 h-6 bg-black rounded text-white hover:bg-orange-400 transition" />
              </Link>
              <Link href="#" target="_blank" rel="noopener noreferrer">
                <Instagram className="w-6 h-6 hover:text-orange-400 transition" />
              </Link>
              <Link href="#" target="_blank" rel="noopener noreferrer">
                <Linkedin className="w-6 h-6 hover:text-orange-400 transition" />
              </Link>
            </div>
          </div>

          <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-3  gap-6">
            <div className="flex flex-col">
              <h3 className="text-lg font-bold mb-2">Về chúng tôi</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="hover:text-orange-400 transition">
                    Giới thiệu
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-orange-400 transition">
                    Liên hệ
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-orange-400 transition">
                    Điều khoản bảo mật
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-orange-400 transition">
                    Điều khoản sử dụng
                  </Link>
                </li>
              </ul>
            </div>

            <div className="flex flex-col">
              <h3 className="text-lg font-bold mb-2">Hỗ trợ</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="hover:text-orange-400 transition">
                    Câu hỏi thường gặp
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-orange-400 transition">
                    Hướng dẫn sử dụng
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-orange-400 transition">
                    Trung tâm trợ giúp
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-orange-400 transition">
                    Góp ý
                  </Link>
                </li>
              </ul>
            </div>

            <div className="flex flex-col">
              <h3 className="text-lg font-bold mb-2">Chính sách</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="hover:text-orange-400 transition">
                    Bảo mật thông tin
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-orange-400 transition">
                    Chính sách hoàn tiền
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-orange-400 transition">
                    Chính sách thanh toán
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-orange-400 transition">
                    Quy định chung
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="text-center mt-10">
          <p className="text-gray-600 text-sm">© 2014-2025 CVKing Vietnam JSC. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
