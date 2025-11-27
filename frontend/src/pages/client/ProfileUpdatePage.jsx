// src/pages/ProfileUpdatePage.jsx (ví dụ)

import React, { useState, useEffect } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Camera,
  Save,
} from "lucide-react";
import { updateAccount } from "../../services/AccountAPI";

const DEFAULT_AVATAR = "https://via.placeholder.com/150";

export default function ProfileUpdatePage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    birthDate: "",
    address: "",
    gender: "other",
  });

  const [avatar, setAvatar] = useState(DEFAULT_AVATAR);
  const [isLoading, setIsLoading] = useState(false);

  // 🔹 Lấy dữ liệu user từ localStorage để fill form
  useEffect(() => {
    try {
      const rawUser = localStorage.getItem("user");
      if (!rawUser) return;

      const user = JSON.parse(rawUser);

      setFormData({
        fullName: user.profile?.fullname || "",
        email: user.email || "",
        phone: user.profile?.phone || "",
        birthDate: user.profile?.birthDate || "",
        address: user.profile?.address || "",
        gender: user.profile?.gender || "other",
      });

      setAvatar(user.profile?.image || DEFAULT_AVATAR);
    } catch (err) {
      console.error("Error parsing user from localStorage:", err);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatar(reader.result); // base64
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);

      const rawUser = localStorage.getItem("user");
      if (!rawUser) {
        alert("Không tìm thấy thông tin người dùng. Vui lòng đăng nhập lại.");
        return;
      }

      const user = JSON.parse(rawUser);
      const userId = user.id;
      if (!userId) {
        alert("Không lấy được ID người dùng.");
        return;
      }

      // 👉 Payload gửi lên BE – chỉnh cho khớp DTO backend của bạn
      const payload = {
        ...user, // giữ nguyên toàn bộ cấu trúc BE đang dùng
        email: formData.email, // override nếu cần
        // nếu BE dùng username riêng thì có thể giữ nguyên user.username

        profile: {
          ...(user.profile || {}),
          fullname: formData.fullName,
          address: formData.address,
          image: avatar,
          // nếu BE có thêm phone, gender, birthDate trong profile:
          phone: formData.phone,
          gender: formData.gender,
          birthDate: formData.birthDate,
        },
      };

      const res = await updateAccount(userId, payload);
      console.log(res);
      alert("Cập nhật thông tin thành công!");

      // 🔹 Nếu BE trả về user mới, update lại localStorage
      if (res?.data) {
        localStorage.setItem("user", JSON.stringify(res.data));
      }
    } catch (error) {
      console.error("Update account error:", error);
      alert("Có lỗi xảy ra khi cập nhật thông tin. Vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Thông Tin Cá Nhân
          </h1>
          <p className="text-gray-600">Cập nhật thông tin của bạn</p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Avatar Section */}
          <div className="bg-gray-100 p-8 text-center border-b border-gray-200">
            <div className="relative inline-block">
              <img
                src={avatar}
                alt="Avatar"
                className="w-32 h-32 rounded-full border-4 border-gray-300 shadow-lg object-cover"
              />
              <label
                htmlFor="avatar-upload"
                className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg cursor-pointer hover:bg-gray-50 transition-colors border border-gray-200"
              >
                <Camera className="w-5 h-5 text-gray-600" />
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarChange}
                />
              </label>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mt-4">
              {formData.fullName || "Chưa có tên"}
            </h2>
            <p className="text-gray-600">{formData.email}</p>
          </div>

          {/* Form Content */}
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Họ và tên
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Nhập họ và tên"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Nhập email"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Số điện thoại
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Nhập số điện thoại"
                  />
                </div>
              </div>

              {/* Birth Date */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Ngày sinh
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="date"
                    name="birthDate"
                    value={formData.birthDate}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Gender */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Giới tính
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="male">Nam</option>
                  <option value="female">Nữ</option>
                  <option value="other">Khác</option>
                </select>
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Địa chỉ
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Nhập địa chỉ"
                  />
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="flex-1 bg-gray-800 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-900 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Save className="w-5 h-5" />
                {isLoading ? "Đang lưu..." : "Lưu thay đổi"}
              </button>
              <button
                onClick={() => window.history.back()}
                className="flex-1 bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-300 transition-all"
              >
                Hủy bỏ
              </button>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-6 text-center text-gray-500 text-sm">
          <p>Thông tin của bạn được bảo mật và an toàn</p>
        </div>
      </div>
    </div>
  );
}
